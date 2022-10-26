using Legacy.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Legacy.Models;
using Legacy.Utils;
using Tabloid.Repositories;

namespace Legacy.Repositories
{
    public class ProductRepository : BaseRepository, IProductRepository
    {
        public ProductRepository(IConfiguration configuration) : base(configuration) { }
        public List<Product> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id as ProductId, p.CarrierId as ProdCarrId, p.ProductName, p.ProductType, p.Length, p.BenefitAmount, c.Id AS CarrierId, c.Name as CarrierName, c.PhoneNumber, c.Address, c.logoUrl
                        FROM Product p 
                        Left JOIN Carrier c ON p.CarrierId = c.Id
                                        ORDER BY p.Id";
                    var reader = cmd.ExecuteReader();

                    var products = new List<Product>();

                    while (reader.Read())
                    {
                        products.Add(new Product()
                        {
                            Id = DbUtils.GetInt(reader, "ProductId"),
                            CarrierId = DbUtils.GetInt(reader, "CarrierId"),
                            Carrier = new Carrier()
                            {
                                Id = DbUtils.GetInt(reader, "CarrierId"),
                                Name = DbUtils.GetString(reader, "CarrierName"),
                                PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                Address = DbUtils.GetString(reader, "Address"),
                                LogoUrl = DbUtils.GetString(reader, "LogoUrl")
                            },
                            ProductName = DbUtils.GetString(reader, "ProductName"),
                            ProductType = DbUtils.GetString(reader, "ProductType"),
                            Length = DbUtils.GetString(reader, "Length"),
                            BenefitAmount = DbUtils.GetInt(reader, "BenefitAmount")

                        });
                    }

                    reader.Close();

                    return products;
                }
            }
        }

        public Product GetProductById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id as ProductId, p.CarrierId as ProdCarrId, p.ProductName, p.ProductType, p.Length, p.BenefitAmount, c.Id AS CarrierId, c.Name as CarrierName, c.PhoneNumber, c.Address, c.logoUrl
                        FROM Product p 
                        Left JOIN Carrier c ON p.CarrierId = c.Id
                                     WHERE p.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Product product = new Product()
                            {
                                Id = DbUtils.GetInt(reader, "ProductId"),
                                CarrierId = DbUtils.GetInt(reader, "CarrierId"),
                                ProductName = DbUtils.GetString(reader, "ProductName"),
                                ProductType = DbUtils.GetString(reader, "ProductType"),
                                Length = DbUtils.GetString(reader, "Length"),
                                BenefitAmount = DbUtils.GetInt(reader, "BenefitAmount"),
                                Carrier = new Carrier()
                                {
                                    Id = DbUtils.GetInt(reader, "CarrierId"),
                                    Name = DbUtils.GetString(reader, "CarrierName"),
                                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                    Address = DbUtils.GetString(reader, "Address"),
                                    LogoUrl = DbUtils.GetString(reader, "LogoUrl")
                                },
                            };

                            return product;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        public void UpdateProduct(Product product)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Product
                            SET 
                                CarrierId = @carrierId,
                                ProductName = @productName,
                                ProductType = @productType,
                                Length = @length,
                                BenefitAmount = @benefitAmount
                            WHERE Id = @id";


                    DbUtils.AddParameter(cmd, "@carrierId", product.CarrierId);
                    DbUtils.AddParameter(cmd, "@productName", product.ProductName);
                    DbUtils.AddParameter(cmd, "@productType", product.ProductType);
                    DbUtils.AddParameter(cmd, "@length", product.Length);
                    DbUtils.AddParameter(cmd, "@benefitAmount", product.BenefitAmount);
                    DbUtils.AddParameter(cmd, "@id", product.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void AddProduct(Product product)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Product (CarrierId, ProductName, ProductType, Length, BenefitAmount)
                    OUTPUT INSERTED.Id
                    VALUES (@carrierId, @productName, @productType, @length, @benefitAmount)";
                    DbUtils.AddParameter(cmd, "@carrierId", product.CarrierId);
                    DbUtils.AddParameter(cmd, "@productName", product.ProductName);
                    DbUtils.AddParameter(cmd, "@productType", product.ProductType);
                    DbUtils.AddParameter(cmd, "@length", product.Length);
                    DbUtils.AddParameter(cmd, "@benefitAmount", product.BenefitAmount);

                    int newlyCreatedId = (int)cmd.ExecuteScalar();
                    product.Id = newlyCreatedId;
                }
            }
        }

        public void DeleteProduct(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Product
                                       WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
