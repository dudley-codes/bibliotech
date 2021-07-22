﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace bibliotech.Models
{
    public class Loan
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int BorrowerId { get; set; }
        public DateTime RequestDate { get; set; }
        public DateTime? ResponseDate { get; set; }
        public DateTime? BorrowDate { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int LoanStatusId { get; set; }
        public LoanStatus LoanStatus { get; set; }
    }
}