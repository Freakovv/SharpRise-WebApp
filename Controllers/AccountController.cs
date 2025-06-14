using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using SharpRise_WebApp.Data;
using SharpRise_WebApp.Models;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SharpRise_WebApp.Controllers
{
    public class AccountController : Controller
    {
        private readonly SharpRiseContext _context;
        private readonly ILogger<AccountController> _logger;

        public AccountController(SharpRiseContext context, ILogger<AccountController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return PartialView("_LoginModal");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                // Поиск пользователя по email или username
                IUser user = _context.Teachers.FirstOrDefault(u => u.Email == model.UsernameOrEmail || u.Username == model.UsernameOrEmail)
                            ?? (IUser)_context.Students.FirstOrDefault(u => u.Email == model.UsernameOrEmail || u.Username == model.UsernameOrEmail);
                if (user != null && VerifyPassword(model.Password, user.Password))
                {
                    await Authenticate(user);
                    return Json(new { success = true });
                }

                ModelState.AddModelError(string.Empty, "Неверный email/имя пользователя или пароль");
            }

            return PartialView("_LoginModal", model);
        }

        [HttpGet]
        public IActionResult Register()
        {
            return PartialView("_RegisterModal");
        }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterModel model, string userRole)
    {
        if (ModelState.IsValid)
        {
            // Проверка на существование пользователя
            if (_context.Teachers.Any(u => u.Email == model.Email) || _context.Students.Any(u => u.Email == model.Email))
            {
                ModelState.AddModelError("Email", "Пользователь с таким email уже существует");
                return PartialView("_RegisterModal", model);
            }

            if (_context.Teachers.Any(u => u.Username == model.Username) || _context.Students.Any(u => u.Username == model.Username))
            {
                ModelState.AddModelError("Username", "Пользователь с таким именем уже существует");
                return PartialView("_RegisterModal", model);
            }

            if (userRole == "Teacher")
            {
                var teacher = new Teacher
                {
                    Username = model.Username,
                    Email = model.Email,
                    Password = HashPassword(model.Password)
                };
                _context.Teachers.Add(teacher);
            }
            else
            {
                var student = new Student
                {
                    Username = model.Username,
                    Email = model.Email,
                    Password = HashPassword(model.Password)
                };
                _context.Students.Add(student);
            }

            await _context.SaveChangesAsync();
            return Json(new { success = true });
        }

        return PartialView("_RegisterModal", model);
    }
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");
        }

        private async Task Authenticate(dynamic user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user is Teacher ? "Teacher" : "Student")
            };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);
            
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }

        private bool VerifyPassword(string enteredPassword, string storedHash)
        {
            var enteredHash = HashPassword(enteredPassword);
            return enteredHash == storedHash;
        }
    }
}