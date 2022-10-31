using Legacy.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Legacy.Models;
using Legacy.Utils;
using Legacy.Repositories;

namespace Legacy.Repositories
{
    public class UserTypeRepository : BaseRepository, IUserTypeRepository
    {
        public UserTypeRepository(IConfiguration configuration) : base(configuration) { }
        public List<UserType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT *
                        FROM UserType
                        ORDER BY Id";
                    var reader = cmd.ExecuteReader();

                    var types = new List<UserType>();

                    while (reader.Read())
                    {
                        types.Add(new UserType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                                                     
                        });
                    }

                    reader.Close();

                    return types;
                }
            }
        }
    }
}