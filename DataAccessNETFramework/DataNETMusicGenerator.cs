using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessNETFramework
{
    public class DataNETMusicGenerator
    {
        public static DataSet GetStavesByMusicId(int musicId, IConfiguration config)
        {
            var sql = $@"SELECT * FROM Stave s
                    JOIN Note n ON n.NoteId=s.NoteId
                    WHERE s.MusicId={musicId}
                    ORDER BY s.StaveIndex ASC";

            // If musicId is -1, get all staves irrespective of musicId as -1 is invalid
            if (musicId == -1)
            {
                sql = $@"SELECT * FROM Stave s
                    JOIN Note n ON n.NoteId=s.NoteId";
            }

            return GetDataBySqlQuery(config, sql);
        }

        public static DataSet GetAllMusic(IConfiguration config)
        {
            var sql = "SELECT * FROM Music";
            return GetDataBySqlQuery(config, sql);
        }

        public static DataSet GetMusic(int musicId, IConfiguration config)
        {
            var sql = (musicId == 0) ? $"SELECT * FROM Music; " : $"SELECT * FROM Music WHERE MusicId={musicId} ;";
            return GetDataBySqlQuery(config, sql);
        }

        private static DataSet GetDataBySqlQuery(IConfiguration config, string sql)
        {
            DataTable dt = new DataTable();
            DataSet ds = new DataSet();
            var cs = config.GetConnectionString(CONNECTION_STRING);

            var conn = new MySqlConnection(cs);

            conn.Open();

            using (var command = new MySqlCommand(sql, conn))
            {
                using (var dataReader = command.ExecuteReader())
                {
                    dt.Load(dataReader);
                    ds.Tables.Add(dt);
                }
            }
            conn.Close();
            return ds;
        }

        private const string CONNECTION_STRING = "MySQLConnectionString";
    }
}
