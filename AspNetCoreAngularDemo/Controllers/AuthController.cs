using AspNetCoreAngularDemo.Interfaces;
using AspNetCoreAngularDemo.Models;
using AspNetCoreAngularDemo.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAngularDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repository;

        public AuthController(IAuthRepository repository)
        {
            this.repository = repository;
        }

        [HttpPost]
        public ActionResult<string> Authenticate(User user)
        {
            object token = repository.Authenticate(user.Username, user.Password);
            if (token == null)
            {
                return BadRequest("Invalid username and password");
            }

            return Ok(token);
        }
    }
}