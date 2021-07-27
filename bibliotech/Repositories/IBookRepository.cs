using Bibliotech.Models;
using System.Collections.Generic;

namespace Bibliotech.Repositories
{
    public interface IBookRepository
    {
        void Add(Book book, List<Author> authors);
        void Delete(int id);
        List<Book> GetAll();
        Book GetBookById(int id);
        List<Book> GetUserLoansByStatus(UserProfile user, string loanStatus);
    }
}