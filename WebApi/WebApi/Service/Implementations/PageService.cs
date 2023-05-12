using DataModel.Domain;
using DataModel.Interfaces;
using Service.Interface;

namespace Service.Implementations
{
    public class PageService : IPageService
    {
        IPageRepository _pageRepository;

        public PageService(IPageRepository pageRepository)
        {
            _pageRepository = pageRepository;
        }

        public List<PagesDto> GetAllPages()
        {
            return _pageRepository.GetAllPages();
        }

        public Page GetById(int id)
        {
            return _pageRepository.GetById(id);
        }

        public void UpdatePage(Page page)
        {
            _pageRepository.Update(page);
        }
    }
}
