using Bibliotech.Models;

namespace Bibliotech.Repositories
{
    public interface ILoanRepository
    {
        void Add(Loan loan, UserProfile user);
        void Delete(int id);
        void UpdateLoanStatus(Loan loan);
    }
}