using System.Data;

namespace PPM.Insights.DataModel
{
    public interface IConnections
    {
        IDbConnection Connection { get; }
    }
}
