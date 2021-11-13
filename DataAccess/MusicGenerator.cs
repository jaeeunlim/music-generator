using Microsoft.Extensions.Configuration;
using System;
using System.Data;

namespace DataAccess
{
    public class MusicGenerator
    {

        public static DataSet GetStavesByMusicId(int musicId, IConfiguration config)
        {
            var cs = config.GetConnectionString("MySQLConnectionString");
            return null;
        }
    }
}
