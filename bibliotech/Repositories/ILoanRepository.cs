using Bibliotech.Models;
using System.Collections.Generic;

namespace Bibliotech.Repositories
{
    public interface ILoanRepository
    {
        void Add(Loan loan, UserProfile user);
        void Delete(int id, UserProfile user);
        List<Loan> GetLoansByCurrentUser(UserProfile user, int id);
        void UpdateLoanStatus(Loan loan);
    }
}