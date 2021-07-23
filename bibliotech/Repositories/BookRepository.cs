using Bibliotech.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Bibliotech.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bibliotech.Repositories
{
    public class BookRepository : BaseRepository, IBookRepository
    {
        public BookRepository(IConfiguration configuration) : base(configuration) { }
        public void Add(Book book, List<Author> authors)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Book(
                                                    OwnerId, 
                                                    Title, 
                                                    ThumbnailUrl, 
                                                    Description,
                                                    AverageRating,
                                                    OnShelf)
                                                    OUTPUT INSERTED.ID
                                                    VALUES(@OwnerId, @Title, 
                                                            @ThumbnailUrl, @Description, 
                                                            @AverageRating, @OnShelf);";
                    DbUtils.AddParameter(cmd, "@Title", book.Title);
                    DbUtils.AddParameter(cmd, "@OwnerId", book.OwnerId);
                    DbUtils.AddParameter(cmd, "@ThumbnailUrl", book.ThumbnailUrl);
                    DbUtils.AddParameter(cmd, "@Description", book.Description);
                    DbUtils.AddParameter(cmd, "@AverageRating", book.AverageRating);
                    DbUtils.AddParameter(cmd, "@OnShelf", book.OnShelf);

                    book.Id = (int)cmd.ExecuteScalar();
                }

                foreach (var author in authors)
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"INSERT INTO Author(Name, BookId) 
                                            OUTPUT INSERTED.ID 
                                            VALUES(@Name, @BookId)";

                        DbUtils.AddParameter(cmd, "@Name", author.Name);
                        DbUtils.AddParameter(cmd, "@BookId", book.Id);
                        author.Id = (int)cmd.ExecuteScalar();
                    }
                }
            }
        }
    }
}
