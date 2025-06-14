using System.ComponentModel.DataAnnotations;

namespace SharpRise_WebApp.Controllers
{

    public class LoginModel
    {
        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [Display(Name = "Email или имя пользователя")]
        public required string UsernameOrEmail { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public required string Password { get; set; }

        [Display(Name = "Запомнить меня")]
        public bool RememberMe { get; set; }
    }
}