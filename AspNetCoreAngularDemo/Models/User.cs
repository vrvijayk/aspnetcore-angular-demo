using System.Collections.Generic;

namespace AspNetCoreAngularDemo.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public List<UserRole> UserRoles { get; set; }
    }
}