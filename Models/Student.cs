using System;
using System.Collections.Generic;

namespace SharpRise_WebApp.Models;

public partial class Student
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<Group> Groups { get; set; } = new List<Group>();
}
