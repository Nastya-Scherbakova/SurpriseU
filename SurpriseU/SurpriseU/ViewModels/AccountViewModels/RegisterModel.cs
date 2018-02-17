using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SurpriseU.Models;
using Microsoft.AspNetCore.Identity;

namespace SurpriseU.ViewModels
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Не указан Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Не указан пароль")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 5)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        //[DataType(DataType.Password)]
        //[Compare("Password", ErrorMessage = "Пароль введен неверно")]
        //public string ConfirmPassword { get; set; }

        //[Required, StringLength(100)]
        public string Name { get; set; }

        //[Required(ErrorMessage = "Не указан возраст")]
       // public DateTime Age { get; set; }

        //[Required(ErrorMessage = "Не указан пол")]
        public Gender Gender { get; set; }
    }
    public class CreateUserViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public Gender Gender { get; set; }
    }
    public class EditUserViewModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public Gender Gender { get; set; }
    }
    public class ChangePasswordViewModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }
    public class ChangeRoleViewModel
    {
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public List<IdentityRole> AllRoles { get; set; }
        public IList<string> UserRoles { get; set; }
        public ChangeRoleViewModel()
        {
            AllRoles = new List<IdentityRole>();
            UserRoles = new List<string>();
        }
    }
    //public class ForgotPasswordViewModel
    //{
        
    //    public string Email { get; set; }
    //    public string Code { get; set; }

    //}
    //public class ResetPasswordViewModel
    //{
    //    public string Code { get; set; }
    //    public string Email { get; set; }
    //    public string Password { get; set; }

    //}
}
