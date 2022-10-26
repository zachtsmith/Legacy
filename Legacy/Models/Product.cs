namespace Legacy.Models
{
    public class Product 
    {
        public int Id { get; set; }
        public int CarrierId { get; set; }
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public string Length { get; set; }
        public int BenefitAmount { get; set; }
        public Carrier Carrier { get; set; }

    }
}