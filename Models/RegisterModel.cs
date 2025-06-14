
using System.ComponentModel.DataAnnotations;

namespace SharpRise_WebApp.Controllers
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [EmailAddress(ErrorMessage = "Некорректный email адрес")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [StringLength(30, MinimumLength = 3, ErrorMessage = "Имя пользователя должно быть от 3 до 30 символов")]
        [Display(Name = "Имя пользователя")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [StringLength(64, MinimumLength = 8, ErrorMessage = "Пароль должен быть от 8 до 64 символов")]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Подтверждение пароля")]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Необходимо принять условия использования")]
        [Range(typeof(bool), "true", "true", ErrorMessage = "Необходимо принять условия использования")]
        [Display(Name = "Я согласен с условиями использования")]
        public bool TermsAgree { get; set; }
    }
}