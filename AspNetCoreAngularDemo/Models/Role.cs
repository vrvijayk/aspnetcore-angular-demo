using System.Collections.Generic;

namespace AspNetCoreAngularDemo.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public IList<UserRole> UserRoles { get; set; }
    }
}