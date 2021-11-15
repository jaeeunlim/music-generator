using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Models;
using MusicGenerator.Models;

namespace MusicGenerator.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly IConfiguration _configuration;

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CreateSheet()
        {
            return View();
        }

        public IActionResult Data()
        {
            dynamic model = new ExpandoObject();
            model.Musics = BusinessAccess.BusinessMusicGenerator.GetAllMusic(_configuration);
            model.Staves = BusinessAccess.BusinessMusicGenerator.GetStavesByMusicId(-1, _configuration);
            return View(model);
        }

        [HttpGet]
        public IActionResult MusicSheet()
        {
            dynamic model = new ExpandoObject();
            List<Music> musicList = BusinessAccess.BusinessMusicGenerator.GetAllMusic(_configuration); 
            model.Musics = musicList;
            model.Staves = BusinessAccess.BusinessMusicGenerator.GetStavesByMusicId(0, _configuration);
            model.SelectedMusic = BusinessAccess.BusinessMusicGenerator.GetMusic(0, _configuration);
            ViewBag.Musics = musicList;
            return View(model);
        }

        [HttpPost]
        public IActionResult MusicSheet(int musicId)
        {
            dynamic model = new ExpandoObject();
            List<Music> musicList = BusinessAccess.BusinessMusicGenerator.GetAllMusic(_configuration);
            model.Musics = musicList;
            model.Staves = BusinessAccess.BusinessMusicGenerator.GetStavesByMusicId(musicId, _configuration);
            model.SelectedMusic = BusinessAccess.BusinessMusicGenerator.GetMusic(musicId, _configuration);
            ViewBag.Musics = musicList;
            return View(model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
