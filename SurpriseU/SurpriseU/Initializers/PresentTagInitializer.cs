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
                        Photo  = "http://mom-story.com/wp-content/uploads/2015/04/romovyy-keks-s-izyumom3.jpg",
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
                        Photo = "http://eurotort.com.ua/katalog-tortov/images/thumbs/405.jpg",
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
                        Photo = "https://www.bhphotovideo.com/images/images2500x2500/ijoy_pww_10k_red_10000_mah_dual_usb_1203465.jpg",
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
                         Photo = "http://ralphsrentall.com/wp-content/uploads/2016/02/balloons.png",
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
                          Photo = "https://merrybee.com.ua/wp-content/uploads/2017/05/DSC_1829-min.jpg",
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
                           Photo = "http://shop.vodafone.ua/uploads/shop/products/large/ef72b3c1f04d226e3cb6235d1dfdf946.jpg",
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
                            Photo = "https://super.com.ua/upload/iblock/cfa/cfa0c67b83db5103d934a8146138677b.jpg",
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
                             Photo = "https://i5.walmartimages.com/asr/220907a5-d0ff-4af9-bf26-555140d0c3d0_1.87f45cc77cc82c98d7af3690ee092dbe.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
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
                              Photo = "https://img.newchic.com/thumb/large/oaupload/newchic/images/F1/E1/78ac4ff0-7f75-416e-8061-45266b8f86b7.jpg",
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
                              Photo = "http://i.grenka.ua/shop/1/1/379/Igra-prestolov_23051_3.png",
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
                              Photo = "http://shop.djournal.com.ua/published/publicdata/DMAGAZIN/attachments/SC/products_pictures/oh-my-book-ua-bir-11.jpg",
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
