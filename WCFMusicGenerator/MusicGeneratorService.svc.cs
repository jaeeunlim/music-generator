using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WCFMusicGenerator
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class MusicGeneratorService : IMusicGeneratorService
    {
        public DataSet GetAllMusic(IConfiguration config)
        {
            return DataAccessNETFramework.DataNETMusicGenerator.GetAllMusic( config);
        }

        public DataSet GetMusic(int musicId, IConfiguration config)
        {
            return DataAccessNETFramework.DataNETMusicGenerator.GetMusic( musicId, config);
        }

        public DataSet GetStavesByMusicId(int musicId, IConfiguration config)
        {
            return DataAccessNETFramework.DataNETMusicGenerator.GetStavesByMusicId(musicId, config);
        }
    }
}
