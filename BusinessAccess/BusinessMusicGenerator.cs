using DataAccess;
using Microsoft.Extensions.Configuration;
using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace BusinessAccess
{
    public class BusinessMusicGenerator
    {
        public static List<Stave> GetStavesByMusicId(int musicId, IConfiguration config)
        {
            var staveList = new List<Stave>();
            DataSet ds = new DataSet();

            // 2nd Assignment

            ds = DataMusicGenerator.GetStavesByMusicId(musicId, config);

            if (ds.Tables.Count > 0)
            {
                staveList = ds.Tables[0].AsEnumerable().Select(model => new Stave
                {
                    StaveId = Convert.ToInt32(model["StaveId"]),
                    MusicId = Convert.ToInt32(model["MusicId"]),
                    NoteId = Convert.ToInt32(model["NoteId"]),
                    StaveIndex = Convert.ToInt32(model["StaveIndex"])
                }).ToList();
            }
            return staveList;
        }
    }
}
