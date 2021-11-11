using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models
{
    public class Music
    {
        public int MusicId { get; set; }
        [DisplayName("Music Title")]
        [StringLength(100)]
        public string MusicTitle{ get; set; }
        [DisplayName("Music Author")]
        [StringLength(100)]
        public string MusicAuthor { get; set; }

    }
}
