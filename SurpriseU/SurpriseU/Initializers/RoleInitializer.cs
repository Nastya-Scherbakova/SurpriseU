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

    public class PresentsTagInitializer
    {

        public static void Initialize(ApplicationContext context)
        {
            bool presentTag = false;
            if (!context.Presents.Any())
            {
                presentTag = true;
                var presents = new List<Present>
                {
                    new Present
                    {
                        Id = "1",
                        Title = "Кекс",
                        Content = "Смачний подарунок для твоєї пишечки",
                        Gender = PresentsGender.All,
                        Photo  = "http://qoo.by/3PET",
                        StartAge = 10,
                        EndAge  = 85
                        //List<PresentTag> Tags
                        //List<UserPresent> Users//users that liked this present
                        //User User
                        //List<PresentUser> likedForUsers
                    },
                    new Present
                    {
                        Id = "2",
                        Title = "Торт",
                        Content = "Смачний подарунок до вашого святкового столу",
                        Gender = PresentsGender.All,
                        Photo = "http://qoo.by/3PES",
                        StartAge = 5,
                        EndAge = 85,
                        //List<PresentTag> Tags
                        //List<UserPresent> Users//users that liked this present
                        //User User
                        //List<PresentUser> likedForUsers
                    },
                    new Present
                    {
                        Id = "3",
                        Title = "PowerBank",
                        Content = "Залишайся на зв'язку навіть під час подорожі",
                        Gender = PresentsGender.All,
                        Photo = "http://qoo.by/3PEQ",
                        StartAge = 14,
                        EndAge = 85,
                        //List<PresentTag> Tags
                        //List<UserPresent> Users//users that liked this present
                        //User User
                        //List<PresentUser> likedForUsers
                    },
                     new Present
                     {
                         Id = "4",
                         Title = "Кульки",
                         Content = "Подаруй легкість та яскравість",
                         Gender = PresentsGender.Female,
                         Photo = "http://qoo.by/3PEP",
                         StartAge = 10,
                         EndAge = 85,
                         //List<PresentTag> Tags
                         //List<UserPresent> Users//users that liked this present
                         //User User
                         //List<PresentUser> likedForUsers
                     },
                      new Present
                      {
                          Id = "5",
                          Title = "Святковий набір",
                          Content = "Чудовий вибір, коли бажаєш підкреслити різносторонність людини",
                          Gender = PresentsGender.All,
                          Photo = "http://qoo.by/3PF4",
                          StartAge = 16,
                          EndAge = 85,
                          //List<PresentTag> Tags
                          //List<UserPresent> Users//users that liked this present
                          //User User
                          //List<PresentUser> likedForUsers
                      },
                       new Present
                       {
                           Id = "6",
                           Title = "Навушники",
                           Content = "Накращий подарунок для твого геймера",
                           Gender = PresentsGender.Male,
                           Photo = "http://qoo.by/3PF6",
                           StartAge = 10,
                           EndAge = 40,
                           //List<PresentTag> Tags
                           //List<UserPresent> Users//users that liked this present
                           //User User
                           //List<PresentUser> likedForUsers
                       },
                        new Present
                        {
                            Id = "7",
                            Title = "XBox 360",
                            Content = "Смачний подарунок для твоєї пишечки",
                            Gender = PresentsGender.Male,
                            Photo = "http://qoo.by/3PFp",
                            StartAge = 10,
                            EndAge = 85,
                            //List<PresentTag> Tags
                            //List<UserPresent> Users//users that liked this present
                            //User User
                            //List<PresentUser> likedForUsers
                        },
                         new Present
                         {
                             Id = "8",
                             Title = "L.O.L.",
                             Content = "Подарунок для маленької красуні",
                             Gender = PresentsGender.Female,
                             Photo = "http://qoo.by/3PFq",
                             StartAge = 3,
                             EndAge = 11,
                             //List<PresentTag> Tags
                             //List<UserPresent> Users//users that liked this present
                             //User User
                             //List<PresentUser> likedForUsers
                         },
                          new Present
                          {
                              Id = "9",
                              Title = "LunchBox",
                              Content = "Завжди ситий - завжди щасливий",
                              Gender = PresentsGender.All,
                              Photo = "http://qoo.by/3PFA",
                              StartAge = 10,
                              EndAge = 85,
                              //List<PresentTag> Tags
                              //List<UserPresent> Users//users that liked this present
                              //User User
                              //List<PresentUser> likedForUsers
                          },
                          new Present
                          {
                              Id = "10",
                              Title = "Настільна гра",
                              Content = "Дозволить Вам частіше збиратись компанією",
                              Gender = PresentsGender.All,
                              Photo = "http://qoo.by/3PFH",
                              StartAge = 8,
                              EndAge = 85,
                              //List<PresentTag> Tags
                              //List<UserPresent> Users//users that liked this present
                              //User User
                              //List<PresentUser> likedForUsers
                          },
                          new Present
                          {
                              Id = "11",
                              Title = "Щоденник Insta-girl",
                              Content = "Допоможе тобі організувати свій день та Instagram",
                              Gender = PresentsGender.Female,
                              Photo = "http://qoo.by/3PFA",
                              StartAge = 8,
                              EndAge = 50,
                              //List<PresentTag> Tags
                              //List<UserPresent> Users//users that liked this present
                              //User User
                              //List<PresentUser> likedForUsers
                          }
                };
                
                



            }
            if (!context.Tags.Any())
            {
                presentTag = true;
                var tags = new List<Tag>
                {
                    new Tag
                    {
                        Id = "1",
                        Name = "Куховарство",
                        Type = Models.Type.Likes
                    },
                     new Tag
                    {
                        Id = "2",
                        Name = "Instagram",
                        Type = Models.Type.Likes
                    },
                      new Tag
                    {
                        Id = "3",
                        Name = "Gaming",
                        Type = Models.Type.Likes
                    },
                       new Tag
                    {
                        Id = "4",
                        Name = "Ґаджети",
                        Type = Models.Type.Likes
                    },
                        new Tag
                    {
                        Id = "5",
                        Name = "Солодке",
                        Type = Models.Type.Likes
                    },
                        new Tag
                    {
                        Id = "6",
                        Name = "День Народження",
                        Type = Models.Type.Celebration
                    },
                        new Tag
                    {
                        Id = "7",
                        Name = "Новий Рік",
                        Type = Models.Type.Celebration
                    },
                        new Tag
                    {
                        Id = "8",
                        Name = "День закоханих",
                        Type = Models.Type.Celebration
                    },
                        new Tag
                    {
                        Id = "9",
                        Name = "Жіночий день",
                        Type = Models.Type.Celebration
                    },
                        new Tag
                    {
                        Id = "10",
                        Name = "Чоловічий день",
                        Type = Models.Type.Celebration
                    }
                };
                tags.ForEach(s => context.AddRange(s));

            }
            if (presentTag)
            {
                context.AddRange(
                    new PresentTag
                    {
                        
                    }
                   );
            }
        }
    }
}
