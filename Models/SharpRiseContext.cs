using Microsoft.EntityFrameworkCore;

namespace SharpRise_WebApp.Models;

public partial class SharpRiseContext : DbContext
{
    public SharpRiseContext()
    {
    }

    public SharpRiseContext(DbContextOptions<SharpRiseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Group> Groups { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<Teacher> Teachers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=FREAKOVV\\SQLEXPRESS;Database=SharpRise_beta;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Group>(entity =>
        {
            entity.HasIndex(e => e.TeacherId, "IX_Groups_TeacherId");

            entity.Property(e => e.Description).HasMaxLength(200);
            entity.Property(e => e.InviteCode).HasMaxLength(9);
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.TeacherUsername).HasMaxLength(30);

            entity.HasOne(d => d.Teacher).WithMany(p => p.Groups).HasForeignKey(d => d.TeacherId);

            entity.HasMany(d => d.Students).WithMany(p => p.Groups)
                .UsingEntity<Dictionary<string, object>>(
                    "GroupStudent",
                    r => r.HasOne<Student>().WithMany().HasForeignKey("StudentsId"),
                    l => l.HasOne<Group>().WithMany().HasForeignKey("GroupsId"),
                    j =>
                    {
                        j.HasKey("GroupsId", "StudentsId");
                        j.ToTable("GroupStudent");
                        j.HasIndex(new[] { "StudentsId" }, "IX_GroupStudent_StudentsId");
                    });
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.Property(e => e.Email).HasMaxLength(254);
            entity.Property(e => e.Password).HasMaxLength(64);
            entity.Property(e => e.Username).HasMaxLength(30);
        });

        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.Property(e => e.Email).HasMaxLength(254);
            entity.Property(e => e.Password).HasMaxLength(64);
            entity.Property(e => e.Username).HasMaxLength(30);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
