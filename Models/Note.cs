using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Note
    {
        public int NoteId { get; set; }
        [DisplayName("Note Description")]
        [StringLength(50)]
        public string NoteDescription { get; set; }
        [DisplayName("Note Row")]
        public int NoteRow { get; set; }

    }
}
