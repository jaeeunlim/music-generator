using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;

namespace DataAccess
{
    public class DataMusicGenerator
    {

        public static DataSet GetStavesByMusicId(int musicId, IConfiguration config)
        {
            DataTable dt = new DataTable();
            DataSet ds = new DataSet();
            var cs = config.GetConnectionString("MySQLConnectionString");

            var conn = new MySqlConnection(cs);

            var sql = "SELECT * FROM Stave WHERE musicId = @musicId;";

            conn.Open();

            using (var command = new MySqlCommand(sql, conn))
            {
                command.Parameters.Add(new MySqlParameter("@musicId", musicId));
                using (var dataReader = command.ExecuteReader())
                {
                    dt.Load(dataReader);
                    ds.Tables.Add(dt);
                }
            }
            return ds;
        }
    }
}
