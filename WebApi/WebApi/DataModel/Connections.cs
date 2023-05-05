using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace PPM.Insights.DataModel
{
    public class Connections : IConnections
    {
        private readonly string? _plantDataCoreConnection;

        public Connections(IConfiguration config)
        {
            _plantDataCoreConnection = config["ConnectionStrings:PlantDataCoreConnection"];
        }
        public IDbConnection PlantDataCoreConnection
        {
            get
            {
                var conn = new SqlConnection(_plantDataCoreConnection);
                return conn;
            }
        }
    }
}
