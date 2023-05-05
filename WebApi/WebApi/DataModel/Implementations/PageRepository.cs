using Dapper;
using DataModel.Domain;
using DataModel.Interfaces;
using PPM.Insights.DataModel;

namespace DataModel.Implementations
{
    public class PageRepository : IPageRepository
    {
        private readonly IConnections _connections;

        public PageRepository(IConnections connections)
        {
            _connections = connections;
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<PagesDto> GetAllPages()
        {
            var query = @"SELECT P.Id
                                ,P.Name
                                ,P.ModifiedBy
                                ,P.ModifiedOn
                                ,STUFF((SELECT ', ' + TAG.Name FROM [Help].[PageTag] AS PT INNER JOIN [Help].[Tag] AS TAG ON TAG.Id = PT.TagId WHERE PT.PageId = P.Id FOR XML PATH('')), 1, 1, '') AS Tags
                                ,STUFF((SELECT ', ' + M.Name FROM [Help].[Manual] AS M INNER JOIN [Help].[ManualContents] AS MC ON MC.ManualId = M.Id AND MC.PageId = P.Id FOR XML PATH('')), 1, 1, '') AS ReferencedManuals
                          FROM [Help].[Page] P
                          ORDER BY P.Name";

            using (var db = _connections.PlantDataCoreConnection)
            {
                return db.Query<PagesDto>(query).ToList();
            }

        }

        public PagesDto GetById(int id)
        {
            throw new NotImplementedException();
        }

        public PagesDto Insert(PagesDto entity)
        {
            throw new NotImplementedException();
        }

        public List<PagesDto> List()
        {
            throw new NotImplementedException();
        }

        public void Update(PagesDto entity)
        {
            throw new NotImplementedException();
        }
    }
}
