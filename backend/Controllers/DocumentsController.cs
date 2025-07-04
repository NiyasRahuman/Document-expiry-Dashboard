using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentsController : ControllerBase
    {
        public static List<Document> documents = new()
        {
            new Document
            {
                Id = 999,
                Name = "Test Passport",
                ExpiryDate = DateTime.UtcNow.AddDays(1),
                Mobile = "+918220229994"
            }
        };

        private static int nextId = 1000;

        [HttpGet]
        public ActionResult<IEnumerable<Document>> Get()
        {
            return Ok(documents);
        }

        [HttpPost]
        public ActionResult<Document> Post(Document doc)
        {
            doc.Id = nextId++;
            documents.Add(doc);
            return CreatedAtAction(nameof(Get), new { id = doc.Id }, doc);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var doc = documents.FirstOrDefault(d => d.Id == id);
            if (doc == null)
            {
                return NotFound();
            }

            documents.Remove(doc);
            return NoContent();
        }
    }
}
