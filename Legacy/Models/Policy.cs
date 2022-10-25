namespace Legacy.Models
{
    public class Policy
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Price { get; set; }  
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public string Length { get; set; }
        public int BenefitAmount { get; set; }  
      
    }
}