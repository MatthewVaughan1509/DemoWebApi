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
            throw new NotImplementedException();
        }
    }
}
