using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SurpriseU.ViewModels
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Не указан Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Не указан пароль")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Пароль введен неверно")]
        public string ConfirmPassword { get; set; }

        //[Required, StringLength(100)]
        public string Name { get; set; }

        //[Required(ErrorMessage = "Не указан возраст")]
        public DateTime Age { get; set; }

        //[Required(ErrorMessage = "Не указан пол")]
        public Gender Gender { get; set; }
    }
    public enum Gender
    {

        Male,
        Female
    }
}
