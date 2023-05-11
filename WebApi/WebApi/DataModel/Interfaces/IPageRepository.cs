using DataModel.Domain;
using DocBook.DataModel.Interfaces;

namespace DataModel.Interfaces
{
    public interface IPageRepository : IRepository<Page>
    {
        public List<PagesDto> GetAllPages();
    }
}
