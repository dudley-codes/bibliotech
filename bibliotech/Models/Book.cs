using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bibliotech.Models
{
    public class Book
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public string Title { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Description { get; set; }
        public decimal AverageRating { get; set; }
        public bool OnShelf { get; set; }
        public bool IsDeleted { get; set; }
        public UserProfile Owner { get; set; } 
        public List<Author> Authors { get; set; }
        public List<Loan> Loans { get; set; }
    }
}
