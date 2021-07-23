using Bibliotech.Models;
using System.Collections.Generic;

namespace Bibliotech.Repositories
{
    public interface IBookRepository
    {
        void Add(Book book, List<Author> authors);
    }
}