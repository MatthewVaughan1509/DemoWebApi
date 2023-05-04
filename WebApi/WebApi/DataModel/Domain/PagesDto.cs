namespace DataModel.Domain
{
    public class PagesDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string? Tags { get; set; }
        public string? ReferencedManuals { get; set; }
    }
}
