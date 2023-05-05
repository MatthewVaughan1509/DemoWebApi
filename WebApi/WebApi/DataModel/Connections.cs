using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace PPM.Insights.DataModel
{
    public class Connections : IConnections
    {
        private readonly string? _connection;

        public Connections(IConfiguration config)
        {
            _connection = config["ConnectionStrings:Connection"];
        }
        public IDbConnection Connection
        {
            get
            {
                var conn = new SqlConnection(_connection);
                return conn;
            }
        }
    }
}
