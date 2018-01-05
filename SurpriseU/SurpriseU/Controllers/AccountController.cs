using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using SurpriseU.ViewModels; // пространство имен моделей RegisterModel и LoginModel
using SurpriseU.Models; // пространство имен UserContext и класса User
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

namespace SurpriseU.Controllers
{
    public class AccountController : Controller
    {

        private ApplicationContext _context;
        public AccountController(ApplicationContext context)
        {
            _context = context;
            DatabaseInitialize(); // добавляем пользователя и роли в бд
        }
        [HttpGet]
        public IActionResult AddAdmin()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> AddAdmin(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user == null)
                {
                    // добавляем пользователя в бд
                    user = new User { Email = model.Email, Password = model.Password };
                    Role adminRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "admin");
                    if (adminRole != null)
                        user.Role = adminRole;

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                   

                    return RedirectToAction("Index", "Home");
                }
                else
                    ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }
            return View(model);
        }
        private void DatabaseInitialize()
        {
            if (!_context.Roles.Any())
            {
                string adminRoleName = "admin";
                string userRoleName = "user";

                string adminEmail = "dmitrievnaa@icloud.com";
                string adminPassword = "n21111998";

                string adminEmail2 = "ashmooree1@gmail.com";
                string adminPassword2 = "12345678";

                // добавляем роли
                Role adminRole = new Role { Name = adminRoleName };
                Role userRole = new Role { Name = userRoleName };


                _context.Roles.Add(userRole);
                _context.Roles.Add(adminRole);

                // добавляем администратора
                _context.Users.Add(new User { Email = adminEmail, Password = adminPassword, Role = adminRole });
                _context.Users.Add(new User { Email = adminEmail2, Password = adminPassword2, Role = adminRole });

                _context.SaveChanges();
            }
        }
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user == null)
                {
                    // добавляем пользователя в бд
                    user = new User { Email = model.Email, Password = model.Password, Name=model.Name, Age=model.Age };
                    Role userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "user");
                    if (userRole != null)
                        user.Role = userRole;

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    await Authenticate(user); // аутентификация

                    return RedirectToAction("Index", "Home");
                }
                else
                    ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }
            return View(model);
        }
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                User user = await _context.Users
                    .Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);
                if (user != null)
                {
                    await Authenticate(user); // аутентификация
                    if (user.Role.Name == "admin") return RedirectToAction("AdminsCabinet", "Home");
                    else return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }
            return View(model);
        }
        private async Task Authenticate(User user)
        {
            // создаем один claim
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role?.Name)
            };
            // создаем объект ClaimsIdentity
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            // установка аутентификационных куки
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}
