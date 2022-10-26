using Legacy.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Legacy.Models;
using Legacy.Utils;
using Tabloid.Repositories;

namespace Legacy.Repositories
{
    public class CarrierRepository : BaseRepository, ICarrierRepository
    {
        public CarrierRepository(IConfiguration configuration) : base(configuration) { }
        public List<Carrier> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, PhoneNumber, Address, LogoUrl 
                                        FROM Carrier 
                                        ORDER BY Name";
                    var reader = cmd.ExecuteReader();

                    var carriers = new List<Carrier>();

                    while (reader.Read())
                    {
                        carriers.Add(new Carrier()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                            Address = DbUtils.GetString(reader, "Address"),
                            LogoUrl = DbUtils.GetString(reader, "LogoUrl")
                        });
                    }

                    reader.Close();

                    return carriers;
                }
            }
        }

        public Carrier GetCarrierById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, PhoneNumber, Address, LogoUrl
                        FROM Carrier
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Carrier carrier = new Carrier()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                Address = DbUtils.GetString(reader, "Address"),
                                LogoUrl = DbUtils.GetString(reader, "LogoUrl")
                            };

                            return carrier;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        public void UpdateCarrier(Carrier carrier)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Carrier
                            SET 
                                Name = @name,
                                PhoneNumber = @phoneNumber,
                                Address = @address,
                                LogoUrl = @logoUrl
                            WHERE Id = @id";


                    DbUtils.AddParameter(cmd, "@name", carrier.Name);
                    DbUtils.AddParameter(cmd, "@id", carrier.Id);
                    DbUtils.AddParameter(cmd, "@phoneNumber", carrier.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@address", carrier.Address);
                    DbUtils.AddParameter(cmd, "@logoUrl", carrier.LogoUrl);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void AddCarrier(Carrier carrier)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Carrier (Name, PhoneNumber, Address, LogoUrl)
                    OUTPUT INSERTED.Id
                    VALUES (@name, @phoneNumber, @address, @logoUrl)";
                    DbUtils.AddParameter(cmd, "@name", carrier.Name);
                    DbUtils.AddParameter(cmd, "@id", carrier.Id);
                    DbUtils.AddParameter(cmd, "@phoneNumber", carrier.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@address", carrier.Address);
                    DbUtils.AddParameter(cmd, "@logoUrl", carrier.LogoUrl);

                    int newlyCreatedId = (int)cmd.ExecuteScalar();
                    carrier.Id = newlyCreatedId;
                }
            }
        }

        public void DeleteCarrier(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Carrier
                                       WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
