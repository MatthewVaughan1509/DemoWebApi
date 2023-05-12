using Dapper;
using DataModel.Domain;
using DataModel.Interfaces;
using PPM.Insights.DataModel;

namespace DataModel.Implementations
{
    /// <summary>
    /// This is an instance of the page repository.
    /// Normally we would use stored procedures but for the purpose of example I am just runnning embeded SQL.
    /// </summary>
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

        /// <summary>
        /// Get all pages for the grid view.
        /// </summary>
        /// <returns></returns>
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

            using (var db = _connections.Connection)
            {
                return db.Query<PagesDto>(query).ToList();
            }

        }

        /// <summary>
        /// Get a page by Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Page GetById(int id)
        {
            var query = @"SELECT P.Id
                                ,P.Name
                                ,Html AS HtmlText
                                ,P.InsertedBy
                                ,P.InsertedOn
                                ,P.ModifiedBy
                                ,P.ModifiedOn
                          FROM [Help].[Page] P
                          WHERE Id = @Id";

            using (var db = _connections.Connection)
            {
                return db.Query<Page>(query, new { id }).FirstOrDefault();
            }
        }

        public Page Insert(Page entity)
        {
            throw new NotImplementedException();
        }

        public List<Page> List()
        {
            throw new NotImplementedException();
        }

        public void Update(Page entity)
        {
            // Put the update here.
        }
    }
}
