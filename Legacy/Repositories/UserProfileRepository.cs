using Legacy.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Legacy.Models;
using Legacy.Utils;
using Tabloid.Repositories;

namespace Legacy.Repositories
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
                         SELECT up.Id, up.FirebaseUserId, up.Name, up.UserType, up.Weight, up.Age, up.IsDiabetic, up.IsSmoker, up.Medications, up.Email, up.UserTypeId, up.ImageLocation 
                            FROM UserProfiles up Order by up.Name
                    ";

                    using (var reader = cmd.ExecuteReader())
                    {
                        List<UserProfile> userProfiles = new List<UserProfile>();

                        while (reader.Read())
                        {
                            UserProfile userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Weight = DbUtils.GetNullableInt(reader, "Weight"),
                                Age = DbUtils.GetNullableInt(reader, "Age"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                UserType = DbUtils.GetString(reader, "UserType"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                            };
                            userProfiles.Add(userProfile);
                        }

                        return userProfiles;
                    }
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
                        SELECT up.Id, up.FirebaseUserId, up.Name, up.UserType, up.Weight, up.Age, up.IsDiabetic, up.IsSmoker, up.Medications, up.Email, up.UserTypeId, up.ImageLocation 
                            FROM UserProfiles up
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
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Weight = DbUtils.GetNullableInt(reader, "Weight"),
                            Age = DbUtils.GetNullableInt(reader, "Age"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = DbUtils.GetString(reader, "UserType"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                        };
                    }
                    reader.Close();

                    return userProfile;
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
                         SELECT up.Id, up.FirebaseUserId, up.Name, up.UserType, up.Weight, up.Age, up.IsDiabetic, up.IsSmoker, up.Medications, up.Email, up.UserTypeId, up.ImageLocation  
                            FROM UserProfiles up
                        WHERE up.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile profile = null;
                        while (reader.Read())
                        {
                            if (profile == null)
                            {
                                profile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    Weight = DbUtils.GetNullableInt(reader, "Weight"),
                                    Age = DbUtils.GetNullableInt(reader, "Age"),
                                    Medications = DbUtils.GetString(reader, "Medications"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                    UserType = DbUtils.GetString(reader, "UserType"),
                                    ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                                };
                            }

                        }
                        return profile;
                    }
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
                    cmd.CommandText = @"INSERT INTO UserProfiles (FirebaseUserId, Name, 
                                                                 Email, UserType, UserTypeId, ImageLocation)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @Name, 
                                                @Email, @UserType, @UserTypeId, @ImageLocation)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@UserType", userProfile.UserType);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateUser(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfiles 
                                SET 
                                Weight = @weight,
                                Age = @age,
                                IsDiabetic = @isDiabetic,
                                IsSmoker = @isSmoker,
                                Medications = @medications
                            WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@weight", userProfile.Weight);
                    DbUtils.AddParameter(cmd, "@age", userProfile.Age);
                    DbUtils.AddParameter(cmd, "@isDiabetic", userProfile.isDiabetic);
                    DbUtils.AddParameter(cmd, "@isSmoker", userProfile.isSmoker);
                    DbUtils.AddParameter(cmd, "@Medications", userProfile.Medications);
                    DbUtils.AddParameter(cmd, "@id", userProfile.Id);


                    cmd.ExecuteNonQuery();
                }
            }
        }
       
    }
}
