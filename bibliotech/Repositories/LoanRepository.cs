using Bibliotech.Models;
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
                                        OwnerId,
                                        BorrowerId,
                                        RequestDate,
                                        DueDate,
                                        LoanStatusId)
                                        OUTPUT INSERTED.ID
                                        VALUES(@bookId, @ownerId, @borrowerId, @requestDate, @dueDate, @loanStatusId)";

                    DateTimeOffset dtOffset = DateTimeOffset.FromUnixTimeSeconds(loan.DueDateUnix);
              
                    DbUtils.AddParameter(cmd, "@bookId", loan.BookId);
                    DbUtils.AddParameter(cmd, "@ownerId", loan.OwnerId);
                    DbUtils.AddParameter(cmd, "@borrowerId", user.Id);
                    DbUtils.AddParameter(cmd, "@requestDate", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@dueDate", dtOffset.DateTime);
                    DbUtils.AddParameter(cmd, "@loanStatusId", 1);

                    loan.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        /// <summary>
        /// Update book loan status
        /// </summary>
        /// <param name="loan"></param>
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

        public void Delete(int id, UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Loan WHERE Id = @id AND BorrowerId = @currentUserId";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@currentUserId", user.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
