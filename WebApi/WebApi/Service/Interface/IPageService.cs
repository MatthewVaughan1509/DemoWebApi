using DataModel.Domain;

namespace Service.Interface
{
    public interface IPageService
    {
        public List<PagesDto> GetAllPages();
        public Page GetById(int id);
        public void UpdatePage(Page page);
    }
}
