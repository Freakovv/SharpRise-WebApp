using System;
using System.Collections.Generic;

namespace SharpRise_WebApp.Models;

public partial class Group
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string TeacherUsername { get; set; } = null!;

    public bool IsVerificated { get; set; }

    public DateTime CreationDate { get; set; }

    public string? InviteCode { get; set; }

    public int TeacherId { get; set; }

    public virtual Teacher Teacher { get; set; } = null!;

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
}
