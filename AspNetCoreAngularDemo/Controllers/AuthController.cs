using AspNetCoreAngularDemo.Models;
using AspNetCoreAngularDemo.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAngularDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthRepository _authRepository;

        public AuthController(AuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost]
        public ActionResult<string> Authenticate(User user)
        {
            object token = _authRepository.Authenticate(user.Username, user.Password);
            if (token == null)
            {
                return BadRequest("Invalid username and password");
            }

            return Ok(token);
        }
    }
}