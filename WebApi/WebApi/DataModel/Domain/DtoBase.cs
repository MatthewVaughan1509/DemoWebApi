namespace DataModel.Domain
{
    public class DtoBase
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }

    }
}
