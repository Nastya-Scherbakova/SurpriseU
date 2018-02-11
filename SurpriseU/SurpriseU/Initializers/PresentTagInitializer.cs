using Microsoft.AspNetCore.Identity;
using SurpriseU.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurpriseU.Initializers
{
    public class PresentTagInitializer
    {

        public static void Initialize(ApplicationContext context)
        {
            if (!context.Presents.Any() && (!context.Tags.Any()))
            {
                var presents = new[]
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
                var tags = new[]
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
                context.Presents.AddRange(presents);
                context.Tags.AddRange(tags);
                context.AddRange(
                    new PresentTag
                    {
                        Present = presents[0],
                        Tag = tags[4]
                    },
                    new PresentTag
                    {
                        Present = presents[0],
                        Tag = tags[5]
                    },
                     new PresentTag
                     {
                         Present = presents[1],
                         Tag = tags[4]
                     },
                    new PresentTag
                    {
                        Present = presents[1],
                        Tag = tags[5]
                    }, new PresentTag
                    {
                        Present = presents[2],
                        Tag = tags[3]
                    },
                    new PresentTag
                    {
                        Present = presents[2],
                        Tag = tags[9]
                    }, new PresentTag
                    {
                        Present = presents[3],
                        Tag = tags[1]
                    },
                    new PresentTag
                    {
                        Present = presents[3],
                        Tag = tags[5]
                    }, new PresentTag
                    {
                        Present = presents[4],
                        Tag = tags[4]
                    },
                    new PresentTag
                    {
                        Present = presents[4],
                        Tag = tags[6]
                    }, new PresentTag
                    {
                        Present = presents[5],
                        Tag = tags[3]
                    },
                    new PresentTag
                    {
                        Present = presents[5],
                        Tag = tags[7]
                    }, new PresentTag
                    {
                        Present = presents[6],
                        Tag = tags[2]
                    },
                    new PresentTag
                    {
                        Present = presents[6],
                        Tag = tags[5]
                    }, new PresentTag
                    {
                        Present = presents[7],
                        Tag = tags[2]
                    },
                    new PresentTag
                    {
                        Present = presents[7],
                        Tag = tags[5]
                    }, new PresentTag
                    {
                        Present = presents[8],
                        Tag = tags[4]
                    },
                    new PresentTag
                    {
                        Present = presents[8],
                        Tag = tags[9]
                    }, new PresentTag
                    {
                        Present = presents[9],
                        Tag = tags[2]
                    },
                    new PresentTag
                    {
                        Present = presents[9],
                        Tag = tags[9]
                    }, new PresentTag
                    {
                        Present = presents[10],
                        Tag = tags[1]
                    },
                    new PresentTag
                    {
                        Present = presents[10],
                        Tag = tags[8]
                    }

                   );
                context.SaveChanges();
            }
        }
    }
}
