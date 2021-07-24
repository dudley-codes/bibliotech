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

        public List<Book> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT
                                                b.Id, 
                                                b.Title, 
                                                b.Description, 
                                                b.AverageRating,  
                                                b.OnShelf, 
                                                b.ThumbnailUrl, 
                                                a.Name AS Author, 
                                                up.DisplayName,
                                                a.Id AS AuthorId
                                        FROM Book b
                                        JOIN BookAuthor ba ON ba.BookId = b.Id
                                        JOIN Author a ON ba.AuthorId = a.Id
                                        JOIN UserProfile up on up.Id = b.OwnerId";

                    var reader = cmd.ExecuteReader();

                    var books = new List<Book>();

                    Book book = null;
                    while (reader.Read())
                    {
                        if (book == null)
                        {
                            book = new Book()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                ThumbnailUrl = DbUtils.GetNullableString(reader, "ThumbnailUrl"),
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                AverageRating = reader.GetDecimal(reader.GetOrdinal("AverageRating")),
                                OnShelf = reader.GetBoolean(reader.GetOrdinal("OnShelf")),
                                Owner = new UserProfile()
                                {
                                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                                },
                                Authors = new List<Author>()
                            };
                        }

                        Author author = new Author()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("AuthorId")),
                            Name = reader.GetString(reader.GetOrdinal("Author"))
                        };

                        book.Authors.Add(author);

                        books.Add(book);
                    }

                    reader.Close();

                    return books;
                }
            }
        }

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


                    foreach (var author in authors)
                    {

                        cmd.CommandText = $"SELECT Name FROM Author WHERE Name LIKE '{author.Name}'";
                        var reader = cmd.ExecuteReader();

                        //cmd.Parameters.AddWithValue("@name", author.Name);


                        if (!reader.Read())
                        {
                            reader.Close();
                            cmd.CommandText = @"INSERT INTO Author(Name, BookId) 
                                            OUTPUT INSERTED.ID 
                                            VALUES(@Name, @BookId)";

                            DbUtils.AddParameter(cmd, "@Name", author.Name);
                            DbUtils.AddParameter(cmd, "@BookId", book.Id);
                            author.Id = (int)cmd.ExecuteScalar();


                        }

                        reader.Close();

                    }
                }
            }
        }

        private Book NewBookFromReader(SqlDataReader reader)
        {
            Book book = null;

            while (reader.Read())
            {
                if (book == null)
                {
                    book = new Book()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        Title = reader.GetString(reader.GetOrdinal("Title")),
                        ThumbnailUrl = DbUtils.GetNullableString(reader, "ThumbnailUrl"),
                        Description = reader.GetString(reader.GetOrdinal("Description")),
                        AverageRating = reader.GetDecimal(reader.GetOrdinal("AverageRating")),
                        OnShelf = reader.GetBoolean(reader.GetOrdinal("OnShelf")),
                        Owner = new UserProfile()
                        {
                            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                        },
                        Authors = new List<Author>()
                    };
                }

                Author author = new Author()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("AuthorId")),
                    Name = reader.GetString(reader.GetOrdinal("Author"))
                };

                book.Authors.Add(author);

            };

            return book;
        }
    }
}


