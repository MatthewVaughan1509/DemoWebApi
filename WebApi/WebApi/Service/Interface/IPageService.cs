using DataModel.Domain;

namespace Service.Interface
{
    public interface IPageService
    {
        public List<PagesDto> GetAllPages();
    }
}
