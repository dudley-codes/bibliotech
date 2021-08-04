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

        /// <summary>
        /// List all users
        /// </summary>
        /// <returns></returns>
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
        /// <summary>
        /// Get all user friends
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public List<UserProfile> GetAllFriends(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT 
                                              fr.Id, 
                                              fr.FirstName, 
                                              fr.LastName, 
                                              fr.DisplayName, 
                                              fr.Email, 
                                              fr.ImageUrl, 
                                              fr.City, 
                                              fr.State
                                              FROM UserProfile cu
                                              LEFT JOIN UserFriend uf ON cu.Id = uf.UserId OR cu.Id = uf.FriendId
                                              LEFT JOIN UserProfile fr ON fr.Id = uf.UserId OR fr.Id = uf.FriendId
                                              WHERE cu.Id = @userId AND NOT fr.Id = @userId
                                              ORDER BY fr.DisplayName";

                    DbUtils.AddParameter(cmd, "@userId", user.Id);
                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
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
        /// <summary>
        /// Fetches a list of users not on current user's friendslist
        /// </summary>
        /// <returns></returns>
        public List<UserProfile> GetNotFriends(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT 
                                              fr.Id, 
                                              fr.FirstName, 
                                              fr.LastName, 
                                              fr.DisplayName, 
                                              fr.Email, 
                                              fr.ImageUrl, 
                                              fr.City, 
                                              fr.State
                                              FROM UserProfile fr
                                              WHERE NOT fr.Id = @userId

                                             EXCEPT 

                                        SELECT 
                                              fr.Id, 
                                              fr.FirstName, 
                                              fr.LastName, 
                                              fr.DisplayName, 
                                              fr.Email, 
                                              fr.ImageUrl, 
                                              fr.City, 
                                              fr.State
                                              FROM UserProfile cu
                                              LEFT JOIN UserFriend uf ON cu.Id = uf.UserId OR cu.Id = uf.FriendId
                                              LEFT JOIN UserProfile fr ON fr.Id = uf.UserId OR fr.Id = uf.FriendId
                                              WHERE cu.Id = @userId AND NOT fr.Id = @userId
                                              ORDER BY fr.DisplayName";
                    DbUtils.AddParameter(cmd, "@userId", user.Id);
                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
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

        /// <summary>
        /// List all user profiles
        /// </summary>
        /// <returns></returns>
        public void AddFriend(UserProfile currentUser, int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT INTO UserFriend(UserId, FriendId)
                                         OUTPUT INSERTED.ID
                                         VALUES(@currentUserId, @friendId)";

                    DbUtils.AddParameter(cmd, "@currentUserId", currentUser.Id);
                    DbUtils.AddParameter(cmd, "@friendId", id);

                    cmd.ExecuteScalar();

                }
            }
        }

        public void UnFriend(UserProfile currentUser, int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" DELETE FROM UserFriend
                                         WHERE UserId = @currentUserId AND FriendId = @friendId 
                                         OR FriendId = @currentUserId AND UserId = @friendId";

                    DbUtils.AddParameter(cmd, "@currentUserId", currentUser.Id);
                    DbUtils.AddParameter(cmd, "@friendId", id);

                    cmd.ExecuteNonQuery();

                }
            }
        }

    }
}