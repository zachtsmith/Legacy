namespace Legacy.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FirebaseUserId { get; set; }
        public string Email { get; set; }
        public int UserTypeId { get; set; }
        public string UserType { get; set; }
        public int? Weight { get; set; }
        public int? Age { get; set; }
        public bool isDiabetic { get; set; }
        public bool isSmoker { get; set; }
        public string Medications { get; set; } 


    }
}

