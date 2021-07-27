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
        /// <summary>
        /// Fetch all books from DB with authors
        /// </summary>
        /// <returns></returns>
        public List<Book> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT
                                                b.Id AS BookId, 
                                                b.Title,
                                                b.Description, 
                                                b.AverageRating,  
                                                b.OnShelf, 
                                                b.ThumbnailUrl, 
                                                a.Name AS Author,
                                                b.OwnerId,
                                                up.Id AS UserProfileId,
                                                up.FireBaseUserId,
                                                up.Email,
                                                up.FirstName,
                                                up.LastName,
                                                up.ImageUrl,
                                                up.City,
                                                up.State,
                                                up.DisplayName,
                                                a.Id AS AuthorId,
                                                l.Id AS LoanId,
                                                l.BorrowerId,
                                                l.RequestDate,
                                                l.ResponseDate,
                                                l.DueDate,
                                                l.ReturnDate,
                                                ls.Id AS LoanStatusId,
                                                ls.Status
                                        FROM Book b
                                        LEFT JOIN BookAuthor ba ON ba.BookId = b.Id
                                        LEFT JOIN Author a ON ba.AuthorId = a.Id
                                        LEFT JOIN Loan l ON b.Id = l.BookId
                                        LEFT JOIN LoanStatus ls ON ls.Id = l.LoanStatusId
                                        LEFT JOIN UserProfile up on up.Id = b.OwnerId 
                                        WHERE IsDeleted = 0";

                    var reader = cmd.ExecuteReader();

                    var books = new List<Book>();
                    while (reader.Read())
                    {
                        var bookId = DbUtils.GetInt(reader, "BookId");
                        //Checks to see if book has been added to list if not, creates book object
                        var existingBook = books.FirstOrDefault(p => p.Id == bookId);
                        if (existingBook == null)
                        {
                            existingBook = new Book()
                            {
                                //TODO: Add full Owner object
                                Id = bookId,
                                OwnerId = reader.GetInt32(reader.GetOrdinal("OwnerId")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                ThumbnailUrl = DbUtils.GetNullableString(reader, "ThumbnailUrl"),
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                AverageRating = reader.GetDecimal(reader.GetOrdinal("AverageRating")),
                                OnShelf = reader.GetBoolean(reader.GetOrdinal("OnShelf")),
                                Owner = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    ImageUrl = DbUtils.GetNullableString(reader, "ImageUrl"),
                                    City = DbUtils.GetString(reader, "City"),
                                    State = DbUtils.GetString(reader, "State")
                                },
                                Authors = new List<Author>(),
                                Loans = new List<Loan>()
                            };

                            books.Add(existingBook);
                        }
                        //Adds list of author(s) to book
                        if (DbUtils.IsNotDbNull(reader, "AuthorId"))
                        {
                            var authorId = DbUtils.GetInt(reader, "AuthorId");
                            var existingAuthor = existingBook.Authors.FirstOrDefault(a => a.Id == authorId);

                            if(existingAuthor == null)
                            {

                            existingBook.Authors.Add(new Author()
                            {
                                Id = DbUtils.GetInt(reader, "AuthorId"),
                                Name = reader.GetString(reader.GetOrdinal("Author"))
                            });
                            }
                        }

                        //Check to see if there are any loan requests for book and adds to list
                        if(DbUtils.IsNotDbNull(reader, "LoanId"))
                        {
                            var loanId = DbUtils.GetInt(reader, "LoanId");
                            var existingLoan = existingBook.Loans.FirstOrDefault(l => l.Id == loanId);

                            if (existingLoan == null)
                            {
                                existingBook.Loans.Add(new Loan()
                            {
                                Id = DbUtils.GetInt(reader, "LoanId"),
                                BookId = DbUtils.GetInt(reader, "BookId"),
                                BorrowerId = DbUtils.GetInt(reader, "BorrowerId"),
                                RequestDate = DbUtils.GetDateTime(reader, "RequestDate"),
                                ResponseDate = DbUtils.GetNullableDateTime(reader, "ResponseDate"),
                                DueDate = DbUtils.GetDateTime(reader, "DueDate"),
                                ReturnDate = DbUtils.GetNullableDateTime(reader, "ReturnDate"),
                                LoanStatus = new LoanStatus()
                                {
                                    Id = DbUtils.GetInt(reader, "LoanStatusId"),
                                    Status = DbUtils.GetString(reader, "Status")
                                }
                            });
                        }
                    }
                    }

                    reader.Close();

                    return books;
                }
            }
        }
        /// <summary>
        /// Fetches all book loans by loan status for current user
        /// </summary>
        /// <param name="user"></param>
        /// <param name="loanStatus"></param>
        /// <returns></returns>
        public List<Book> GetUserLoansByStatus(UserProfile user, string loanStatus)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT
                                                b.Id AS BookId, 
                                                b.Title,
                                                b.Description, 
                                                b.AverageRating,  
                                                b.OnShelf, 
                                                b.ThumbnailUrl, 
                                                a.Name AS Author,
                                                b.OwnerId,
                                                up.Id AS UserProfileId,
                                                up.FireBaseUserId,
                                                up.Email,
                                                up.FirstName,
                                                up.LastName,
                                                up.ImageUrl,
                                                up.City,
                                                up.State,
                                                up.DisplayName,
                                                a.Id AS AuthorId,
                                                l.Id AS LoanId,
                                                l.BorrowerId,
                                                l.RequestDate,
                                                l.ResponseDate,
                                                l.DueDate,
                                                l.ReturnDate,
                                                ls.Id AS LoanStatusId,
                                                ls.Status
                                        FROM Book b
                                        LEFT JOIN BookAuthor ba ON ba.BookId = b.Id
                                        LEFT JOIN Author a ON ba.AuthorId = a.Id
                                        LEFT JOIN Loan l ON b.Id = l.BookId
                                        LEFT JOIN LoanStatus ls ON ls.Id = l.LoanStatusId
                                        LEFT JOIN UserProfile up on up.Id = b.OwnerId
                                        WHERE l.BorrowerId = @id AND ls.Status = @status AND IsDeleted = 0;";

                    DbUtils.AddParameter(cmd, "@id", user.Id);
                    DbUtils.AddParameter(cmd, "@status", loanStatus);
                    var reader = cmd.ExecuteReader();

                    var books = new List<Book>();
                    while (reader.Read())
                    {
                        var bookId = DbUtils.GetInt(reader, "BookId");
                        //Checks to see if book has been added to list if not, creates book object
                        var existingBook = books.FirstOrDefault(p => p.Id == bookId);
                        if (existingBook == null)
                        {
                            existingBook = new Book()
                            {
                                //TODO: Add full Owner object
                                Id = bookId,
                                OwnerId = reader.GetInt32(reader.GetOrdinal("OwnerId")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                ThumbnailUrl = DbUtils.GetNullableString(reader, "ThumbnailUrl"),
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                AverageRating = reader.GetDecimal(reader.GetOrdinal("AverageRating")),
                                OnShelf = reader.GetBoolean(reader.GetOrdinal("OnShelf")),
                                Owner = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    ImageUrl = DbUtils.GetNullableString(reader, "ImageUrl"),
                                    City = DbUtils.GetString(reader, "City"),
                                    State = DbUtils.GetString(reader, "State")
                                },
                                Authors = new List<Author>(),
                                Loans = new List<Loan>()
                            };

                            books.Add(existingBook);
                        }
                        //Adds list of author(s) to book
                        if (DbUtils.IsNotDbNull(reader, "AuthorId"))
                        {
                            var authorId = DbUtils.GetInt(reader, "AuthorId");
                            var existingAuthor = existingBook.Authors.FirstOrDefault(a => a.Id == authorId);

                            if (existingAuthor == null)
                            {

                                existingBook.Authors.Add(new Author()
                                {
                                    Id = DbUtils.GetInt(reader, "AuthorId"),
                                    Name = reader.GetString(reader.GetOrdinal("Author"))
                                });
                            }
                        }

                        //Check to see if there are any loan requests for book and adds to list
                        if (DbUtils.IsNotDbNull(reader, "LoanId"))
                        {
                            var loanId = DbUtils.GetInt(reader, "LoanId");
                            var existingLoan = existingBook.Loans.FirstOrDefault(l => l.Id == loanId);

                            if (existingLoan == null)
                            {
                                existingBook.Loans.Add(new Loan()
                                {
                                    Id = DbUtils.GetInt(reader, "LoanId"),
                                    BookId = DbUtils.GetInt(reader, "BookId"),
                                    BorrowerId = DbUtils.GetInt(reader, "BorrowerId"),
                                    RequestDate = DbUtils.GetDateTime(reader, "RequestDate"),
                                    ResponseDate = DbUtils.GetNullableDateTime(reader, "ResponseDate"),
                                    DueDate = DbUtils.GetDateTime(reader, "DueDate"),
                                    ReturnDate = DbUtils.GetNullableDateTime(reader, "ReturnDate"),
                                    LoanStatus = new LoanStatus()
                                    {
                                        Id = DbUtils.GetInt(reader, "LoanStatusId"),
                                        Status = DbUtils.GetString(reader, "Status")
                                    }
                                });
                            }
                        }
                    }

                    reader.Close();

                    return books;
                }
            }
        }

        public Book GetBookById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT
                                                b.Id AS BookId, 
                                                b.Title,
                                                b.Description, 
                                                b.AverageRating,  
                                                b.OnShelf, 
                                                b.ThumbnailUrl, 
                                                a.Name AS Author,
                                                b.OwnerId,
                                                up.Id AS UserProfileId,
                                                up.FireBaseUserId,
                                                up.Email,
                                                up.FirstName,
                                                up.LastName,
                                                up.ImageUrl,
                                                up.City,
                                                up.State,
                                                up.DisplayName,
                                                a.Id AS AuthorId,
                                                l.Id AS LoanId,
                                                l.BorrowerId,
                                                l.RequestDate,
                                                l.ResponseDate,
                                                l.DueDate,
                                                l.ReturnDate,
                                                ls.Id AS LoanStatusId,
                                                ls.Status
                                        FROM Book b
                                        LEFT JOIN BookAuthor ba ON ba.BookId = b.Id
                                        LEFT JOIN Author a ON ba.AuthorId = a.Id
                                        LEFT JOIN Loan l ON b.Id = l.BookId
                                        LEFT JOIN LoanStatus ls ON ls.Id = l.LoanStatusId
                                        LEFT JOIN UserProfile up on up.Id = b.OwnerId
                                        WHERE b.Id = @id AND IsDeleted = 0";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var books = new List<Book>();
                    while (reader.Read())
                    {
                        var bookId = DbUtils.GetInt(reader, "BookId");
                        //Checks to see if book has been added to list if not, creates book object
                        var existingBook = books.FirstOrDefault(p => p.Id == id);
                        if (existingBook == null)
                        {
                            existingBook = new Book()
                            {
                                //TODO: Add full Owner object
                                Id = bookId,
                                OwnerId = reader.GetInt32(reader.GetOrdinal("OwnerId")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                ThumbnailUrl = DbUtils.GetNullableString(reader, "ThumbnailUrl"),
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                AverageRating = reader.GetDecimal(reader.GetOrdinal("AverageRating")),
                                OnShelf = reader.GetBoolean(reader.GetOrdinal("OnShelf")),
                                Owner = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    ImageUrl = DbUtils.GetNullableString(reader, "ImageUrl"),
                                    City = DbUtils.GetString(reader, "City"),
                                    State = DbUtils.GetString(reader, "State")
                                },
                                Authors = new List<Author>(),
                                Loans = new List<Loan>()
                            };

                            books.Add(existingBook);
                        }
                        //Adds list of author(s) to book
                        if (DbUtils.IsNotDbNull(reader, "AuthorId"))
                        {
                            var authorId = DbUtils.GetInt(reader, "AuthorId");
                            var existingAuthor = existingBook.Authors.FirstOrDefault(a => a.Id == authorId);

                            if (existingAuthor == null)
                            {

                                existingBook.Authors.Add(new Author()
                                {
                                    Id = DbUtils.GetInt(reader, "AuthorId"),
                                    Name = reader.GetString(reader.GetOrdinal("Author"))
                                });
                            }
                        }

                        //Check to see if there are any loan requests for book and adds to list
                        if (DbUtils.IsNotDbNull(reader, "LoanId"))
                        {
                            var loanId = DbUtils.GetInt(reader, "LoanId");
                            var existingLoan = existingBook.Loans.FirstOrDefault(l => l.Id == loanId);

                            if (existingLoan == null)
                            {
                                existingBook.Loans.Add(new Loan()
                                {
                                    Id = DbUtils.GetInt(reader, "LoanId"),
                                    BookId = DbUtils.GetInt(reader, "BookId"),
                                    BorrowerId = DbUtils.GetInt(reader, "BorrowerId"),
                                    RequestDate = DbUtils.GetDateTime(reader, "RequestDate"),
                                    ResponseDate = DbUtils.GetNullableDateTime(reader, "ResponseDate"),
                                    DueDate = DbUtils.GetDateTime(reader, "DueDate"),
                                    ReturnDate = DbUtils.GetNullableDateTime(reader, "ReturnDate"),
                                    LoanStatus = new LoanStatus()
                                    {
                                        Id = DbUtils.GetInt(reader, "LoanStatusId"),
                                        Status = DbUtils.GetString(reader, "Status")
                                    }
                                });
                            }
                        }
                    }

                    reader.Close();
                    var book = books.FirstOrDefault(p => p.Id == id);

                    return book;
                }
            }
        }


        /// <summary>
        /// Add new book to database
        /// </summary>
        /// <param name="book"></param>
        /// <param name="authors"></param>
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

                    //Checks to see if an author is in DB. If author is not in DB. creates new author
                    foreach (var author in authors)
                    {
                        cmd.CommandText = $"SELECT Id AS AuthorId, Name FROM Author WHERE Name LIKE '{author.Name}'";
                        var reader = cmd.ExecuteReader();
                        //If author is not in DB, add to DB with BookAuthor join table

                        if (!reader.Read())
                        {
                            reader.Close();
                            cmd.CommandText = @"INSERT INTO Author(Name) 
                                                    OUTPUT INSERTED.ID 
                                                    VALUES(@Name)";

                            DbUtils.AddParameter(cmd, "@Name", author.Name);
                            author.Id = (int)cmd.ExecuteScalar();

                            cmd.CommandText = @"INSERT INTO BookAuthor(BookId, AuthorId)
                                                    VALUES(@BookId, @AuthorId)";
                            DbUtils.AddParameter(cmd, "@BookId", book.Id);
                            DbUtils.AddParameter(cmd, "@AuthorId", author.Id);
                            cmd.ExecuteScalar();
                        }
                        //If author is in DB, create join table for book and author
                        else
                        {
                            var authorId = reader.GetInt32(reader.GetOrdinal("AuthorId"));

                            cmd.CommandText = @$"INSERT INTO BookAuthor(BookId, AuthorId)
                                                    VALUES({book.Id}, 
                                                    {authorId})";

                            reader.Close();
                            cmd.ExecuteScalar();
                        }

                    }
                }
            }
        }
        /// <summary>
        /// Soft Delete Book
        /// </summary>
        /// <param name="id"></param>
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "UPDATE Book SET IsDeleted = @isDeleted WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@isDeleted", 1);
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
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


