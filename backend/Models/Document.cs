namespace backend.Models
{
    public class Document
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Owner { get; set; } 
    public DateTime ExpiryDate { get; set; }
    public string Mobile { get; set; }
    public int Reminder { get; set; }
}

}
