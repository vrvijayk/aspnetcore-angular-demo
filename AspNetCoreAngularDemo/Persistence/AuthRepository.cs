using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using AspNetCoreAngularDemo.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreAngularDemo.Persistence
{
    public class AuthRepository
    {
        private readonly AppSettings appSettings;
        private readonly DemoDbContext context;

        public AuthRepository(IOptions<AppSettings> appSettings, DemoDbContext context)
        {
            this.appSettings = appSettings.Value;
            this.context = context;
        }
        
        public object Authenticate(string username, string password)
        {
            //var user = context.Users.Include(u => u.UserRoles).ThenInclude(r => r.Role).SingleOrDefault(p => p.Username == username && p.Password == password);
            var user = context.Users.SingleOrDefault(p => p.Username == username && p.Password == password);

            //invalid user
            if (user == null)
                return null;

            context.Entry(user).Collection(ur => ur.UserRoles).Query().Include(r => r.Role).ToList();
            var key = System.Text.Encoding.ASCII.GetBytes(appSettings.Secret);

            //Add claims
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, user.Name));
            claims.Add(new Claim(ClaimTypes.Role, string.Join(",", user.UserRoles.Select(p => p.Role.Name).ToArray())));

            //Generate token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var jwtToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(jwtToken);

            return new {token = token};
        }
    }
}