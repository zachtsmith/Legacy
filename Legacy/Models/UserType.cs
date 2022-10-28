using System.ComponentModel.DataAnnotations;

namespace Legacy.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        public static int BROKER_ID => 1;
        public static int CLIENT_ID => 2;
    }
}