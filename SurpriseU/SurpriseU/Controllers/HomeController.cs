using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SurpriseU.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace SurpriseU.Controllers
{
    public class HomeController : Controller
    {

       // [Authorize(Roles = "admin, user")]
        public IActionResult Index()
        {
            //string role = User.FindFirst(x => x.Type == ClaimsIdentity.DefaultRoleClaimType).Value;
            return View();
        }
        //[Authorize(Roles = "admin")]
        //public IActionResult AdminsCabinet()
        //{

        //    return View();
        //}

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
