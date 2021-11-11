using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models
{
    public class Stave
    {
        public int StaveId { get; set; }
        public int MusicId { get; set; }
        public Music Music { get; set; }
        public int NoteId { get; set; }
        public Note Note { get; set; }
        public int StaveIndex { get; set; }

    }
}
