#if DEBUG
using System.Threading.Tasks;
using kektrophies.Services;
using Microsoft.AspNetCore.Mvc;

namespace kektrophies.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IPasswordService _passwordService;

        public AuthenticationController(IPasswordService passwordService)
        {
            _passwordService = passwordService;
        }

        [HttpPost("Hash")]
        public async Task<IActionResult> Hash([FromBody] string toHash)
        {
            return await Task.FromResult(Ok(_passwordService.HashPassword(toHash)));
        }
    }
}
#endif