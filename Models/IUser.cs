using System.ComponentModel.DataAnnotations;

namespace SharpRise_WebApp.Controllers
{
    public interface IUser
    {
        int Id { get; set; }
        string Username { get; set; }
        string Password { get; set; }
        string Email { get; set; }
    }
}