using System;
using System.Collections.Generic;
using System.Linq;
using Bibliotech.Models;
using Microsoft.Extensions.Configuration;
using Bibliotech.Utils;
using Bibliotech.Repositories;

namespace Bibliotech.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.ImageUrl, up.City, up.State
                          FROM UserProfile up
                          ORDER BY up.DisplayName
            ";

                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            City = DbUtils.GetString(reader, "City"),
                            State = DbUtils.GetString(reader, "State")
                        });
                    }

                    reader.Close();

                    return users;
                }
            }
        }

        //public List<UserProfile> GetAllDeactivated()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //       SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
        //                       up.Email, up.ImageUrl, up.IsDeactivated, up.UserTypeId,
        //                       ut.Name AS UserTypeName
        //                  FROM UserProfile up
        //                       LEFT JOIN UserType ut on up.UserTypeId = ut.Id
        //                    WHERE up.IsDeactivated = 1
        //                    ORDER BY up.DisplayName
        //    ";

        //            var reader = cmd.ExecuteReader();

        //            var users = new List<UserProfile>();
        //            while (reader.Read())
        //            {
        //                users.Add(new UserProfile()
        //                {
        //                    Id = DbUtils.GetInt(reader, "Id"),
        //                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
        //                    FirstName = DbUtils.GetString(reader, "FirstName"),
        //                    LastName = DbUtils.GetString(reader, "LastName"),
        //                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
        //                    Email = DbUtils.GetString(reader, "Email"),
        //                    ImageUrl = DbUtils.GetString(reader, "ImageUrl")
        //                });
        //            }

        //            reader.Close();

        //            return users;
        //        }
        //    }
        //}

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.ImageUrl, up.City, up.State
                          FROM UserProfile up
                         WHERE up.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            City = DbUtils.GetString(reader, "City"),
                            State = DbUtils.GetString(reader, "State")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.ImageUrl, up.City, up.State
                          FROM UserProfile up
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            City = DbUtils.GetString(reader, "City"),
                            State = DbUtils.GetString(reader, "State")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName,                                                   DisplayName, Email, ImageUrl, City, State)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, 
                                                @Email,  @ImageUrl, @City, @State)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ImageUrl", userProfile.ImageUrl);
                    DbUtils.AddParameter(cmd, "@City", userProfile.City);
                    DbUtils.AddParameter(cmd, "@State", userProfile.State);
                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //public void Activate(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"UPDATE UserProfile SET isDeactivated=@IsDeactivated WHERE Id=@Id";
        //            cmd.Parameters.AddWithValue("@IsDeactivated", 0);
        //            cmd.Parameters.AddWithValue("@Id", id);
        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

        //public void Deactivate(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"UPDATE UserProfile SET isDeactivated=@IsDeactivated WHERE Id=@Id";
        //            cmd.Parameters.AddWithValue("@IsDeactivated", 1);
        //            cmd.Parameters.AddWithValue("@Id", id);
        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

        //public void MakeAdmin(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"UPDATE UserProfile SET UserTypeId=@UserTypeId WHERE Id=@Id";
        //            cmd.Parameters.AddWithValue("@UserTypeId", 1);
        //            cmd.Parameters.AddWithValue("@Id", id);
        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}
        //public void MakeAuthor(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"UPDATE UserProfile SET UserTypeId=@UserTypeId WHERE Id=@Id";
        //            cmd.Parameters.AddWithValue("@UserTypeId", 2);
        //            cmd.Parameters.AddWithValue("@Id", id);
        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

        /*
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                       .Include(up => up.UserType) 
                       .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
        */
    }
}
