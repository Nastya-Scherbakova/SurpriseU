using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SurpriseU.Models
{

    public class Present
    {
        public int PresentId { get; set; }
        [Required, StringLength(100)]
        public string Title { get; set; }
        [Required, StringLength(100)]
        public string Content { get; set; }
        [Required, StringLength(100)]
        public string Photo { get; set; }


    }
    public class PresentsContext : DbContext
    {
        public PresentsContext(DbContextOptions<PresentsContext> options)
           : base(options)
        { }
        public DbSet<Present> Presents { get; set; }

    }
}
