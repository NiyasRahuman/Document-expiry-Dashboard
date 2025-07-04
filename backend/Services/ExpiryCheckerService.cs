using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using backend.Models;
using backend.Controllers; 
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace backend.Services
{
    public class ExpiryCheckerService : BackgroundService
    {
        private readonly ILogger<ExpiryCheckerService> _logger;

        // TODO: Replace with your actual Twilio credentials
        string twilioSid = Environment.GetEnvironmentVariable("TwilioSid");
string twilioToken = Environment.GetEnvironmentVariable("TwilioToken");

        private const string FromWhatsAppNumber = "whatsapp:+14155238886";

        public ExpiryCheckerService(ILogger<ExpiryCheckerService> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("✅ ExpiryCheckerService is running...");

            TwilioClient.Init(TwilioSid, TwilioToken);

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var today = DateTime.UtcNow.Date;

                    var notifyDocs = DocumentsController.documents
                        .Where(doc =>
                            (doc.ExpiryDate.Date - today).TotalDays is 30 or 7 or 1)
                        .ToList();

                    foreach (var doc in notifyDocs)
                    {
                        string toNumber = "whatsapp:" + doc.Mobile;
                        string body = $"📌 Reminder: Your document '{doc.Name}' will expire on {doc.ExpiryDate:dd-MM-yyyy}.";

                        try
                        {
                            var message = await MessageResource.CreateAsync(
    to: new PhoneNumber("whatsapp:" + doc.Mobile),
    from: new PhoneNumber(FromWhatsAppNumber),
    body: $"Reminder: {doc.Name} is expiring on {doc.ExpiryDate:yyyy-MM-dd}."
);

                            _logger.LogInformation($"📲 WhatsApp sent to {doc.Mobile}: {message.Sid}");
                        }
                        catch (Exception sendEx)
                        {
                            _logger.LogError(sendEx, $"❌ Failed to send WhatsApp to {doc.Mobile}");
                        }
                    }

                    await Task.Delay(TimeSpan.FromHours(1), stoppingToken); // Wait for next day
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "❌ Error in expiry checker loop");
                }
            }
        }
    }
}
