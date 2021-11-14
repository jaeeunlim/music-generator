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
                    StaveIndex = Convert.ToInt32(model["StaveIndex"]),
                    Music = new Music
                    {
                        MusicId = Convert.ToInt32(model["MusicId"]),
                        MusicAuthor = Convert.ToString(model["MusicAuthor"]),
                        MusicTitle = Convert.ToString(model["MusicTitle"])
                    },
                    Note = new Note
                    {
                        NoteId = Convert.ToInt32(model["NoteId"]),
                        NoteDescription = Convert.ToString(model["NoteDescription"]),
                        NoteRow = Convert.ToInt32(model["NoteRow"])
                    }
                }).ToList();
            }
            return staveList;
        }

        public static List<Music> GetAllMusic(IConfiguration config)
        {
            var musicList = new List<Music>();
            DataSet ds = new DataSet();

            // 2nd Assignment

            ds = DataMusicGenerator.GetAllMusic(config);

            if (ds.Tables.Count > 0)
            {
                musicList = ds.Tables[0].AsEnumerable().Select(model => new Music
                {
                    MusicId = Convert.ToInt32(model["MusicId"]),
                    MusicAuthor = Convert.ToString(model["MusicAuthor"]),
                    MusicTitle = Convert.ToString(model["MusicTitle"])
                }).ToList();
            }
            return musicList;
        }

        public static Music GetMusic(int musicId, IConfiguration config)
        {
            var musicList = new List<Music>();
            DataSet ds = new DataSet();

            // 2nd Assignment

            ds = DataMusicGenerator.GetMusic(musicId, config);

            if (ds.Tables.Count > 0)
            {
                musicList = ds.Tables[0].AsEnumerable().Select(model => new Music
                {
                    MusicId = Convert.ToInt32(model["MusicId"]),
                    MusicAuthor = Convert.ToString(model["MusicAuthor"]),
                    MusicTitle = Convert.ToString(model["MusicTitle"])
                }).ToList();
            }
            return musicList[0];
        }
    }
}
