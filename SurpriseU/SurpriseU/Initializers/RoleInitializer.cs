using Microsoft.AspNetCore.Identity;
using SurpriseU.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurpriseU.Initializers
{
    public class RoleInitializer
    {
        public static async Task InitializeAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            string adminEmail = "dmirievnaa@icloud.com";
            string password = "12345678";
            string adminEmail2 = "ashmooree1@gmail.com";
            string password2 = "12345678";
            if (await roleManager.FindByNameAsync("admin") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("admin"));
            }
            if (await roleManager.FindByNameAsync("user") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("user"));
            }
            if (await userManager.FindByNameAsync(adminEmail) == null)
            {
                User admin = new User { Email = adminEmail, UserName = adminEmail };
                User admin2 = new User { Email = adminEmail2, UserName = adminEmail2 };
                IdentityResult result = await userManager.CreateAsync(admin, password);
                IdentityResult result2 = await userManager.CreateAsync(admin2, password2);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "admin");
                    await userManager.AddToRoleAsync(admin2, "admin");
                    
                }
            }
        }
    }
}
