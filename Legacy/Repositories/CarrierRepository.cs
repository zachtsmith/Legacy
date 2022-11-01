using Legacy.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Legacy.Models;
using Legacy.Utils;
using Legacy.Repositories;

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
                    cmd.CommandText = @"SELECT c.Id, c.Name, c.PhoneNumber, c.Address, c.LogoUrl, upc.Id as UPCid,                             
                                        upc.CarrierId, upc.UserId
                                        FROM Carrier c
                                        Left JOIN UserProfileCarriers  upc ON c.Id = upc.CarrierId
                                        Order by c.Name
                                       ";
                  
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
                            LogoUrl = DbUtils.GetString(reader, "LogoUrl"),
                            UserProfileCarrier = new UserProfileCarriers()
                            {
                                Id = DbUtils.GetNullableInt(reader, "UPCid"),
                                UserId = DbUtils.GetNullableInt(reader, "UserId"),
                                CarrierId = DbUtils.GetNullableInt(reader, "CarrierId")
                            }

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

                    cmd.CommandText = @"
                    INSERT INTO UserProfileCarriers (UserId, CarrierId)
                    OUTPUT INSERTED.Id
                    VALUES (@userId, @carrierId)";
                   
                    DbUtils.AddParameter(cmd, "@userProfileCarrierId", carrier.UserProfileCarrier.Id);
                    DbUtils.AddParameter(cmd, "@userId", carrier.UserProfileCarrier.UserId);
                    DbUtils.AddParameter(cmd, "@carrierId", carrier.Id);
                    

                    int newlyCreatedUserProfileCarrierId = (int)cmd.ExecuteScalar();
                    carrier.UserProfileCarrier.Id = newlyCreatedUserProfileCarrierId;


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
                    cmd.CommandText = @"DELETE FROM UserProfileCarriers
                                       WHERE CarrierId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
