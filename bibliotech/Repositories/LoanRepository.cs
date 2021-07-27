﻿using Bibliotech.Models;
using Bibliotech.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Bibliotech.Repositories
{
    public class LoanRepository : BaseRepository, ILoanRepository
    {
        public LoanRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Loan loan, UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Loan(
                                        BookId, 
                                        BorrowerId,
                                        RequestDate,
                                        DueDate,
                                        LoanStatusId)
                                        OUTPUT INSERTED.ID
                                        VALUES(@bookId, @borrowerId, @requestDate, @dueDate, @loanStatusId)";

                    DbUtils.AddParameter(cmd, "@bookId", loan.BookId);
                    DbUtils.AddParameter(cmd, "@borrowerId", user.Id);
                    DbUtils.AddParameter(cmd, "@requestDate", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@dueDate", loan.DueDate);
                    DbUtils.AddParameter(cmd, "@loanStatusId", 1);

                    loan.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateLoanStatus(Loan loan)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    string StatusDate = null;
                    if (loan.LoanStatus.Status == "IsReturned" || loan.LoanStatusId == 9)
                    {
                        StatusDate = "ReturnDate";
                    }
                    else
                    {
                        StatusDate = "ResponseDate";
                    }
                    cmd.CommandText = @$"
                                        UPDATE Loan
                                                SET LoanStatusId = @loanStatusId,
                                                {StatusDate} = @dateTime
                                                WHERE Id = @id
                                        ";

                    DbUtils.AddParameter(cmd, "@loanStatusId", loan.LoanStatusId);
                    DbUtils.AddParameter(cmd, "@dateTime", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@id", loan.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}