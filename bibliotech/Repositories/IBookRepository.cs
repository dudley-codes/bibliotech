using Bibliotech.Models;
using System.Collections.Generic;

namespace Bibliotech.Repositories
{
    public interface IBookRepository
    {
        void Add(Book book, List<Author> authors, UserProfile user);
        void Delete(int id);
        List<Book> GetAll(UserProfile user);
        Book GetBookById(int id);
        List<Book> GetBooksByUser(UserProfile user);
        List<Book> GetUserLoansByStatus(UserProfile user, string loanStatus);
        List<Book> Search(UserProfile user, string criterion);
    }
}