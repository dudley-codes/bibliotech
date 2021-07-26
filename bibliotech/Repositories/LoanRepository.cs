using Bibliotech.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bibliotech.Repositories
{
    public class LoanRepository: BaseRepository
    {
        public LoanRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Book book)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"";
                }
            }
        }
    }
}
