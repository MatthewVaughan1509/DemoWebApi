namespace DataModel.Domain
{
    public class Page
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? HtmlText { get; set; }
        public string? InsertedBy { get; set; }
        public DateTime InsertedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
