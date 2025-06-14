using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using SharpRise_WebApp.Data;

var builder = WebApplication.CreateBuilder(args);

// Добавляем сервисы в контейнер
builder.Services.AddDbContext<SharpRiseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Добавляем сервисы аутентификации
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "SharpRise.Auth";
        options.LoginPath = "/Account/Login";
        options.LogoutPath = "/Account/Logout";
        options.AccessDeniedPath = "/Account/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromDays(30); // Куки будут храниться 30 дней
        options.SlidingExpiration = true; // Обновлять срок действия при каждом запросе
    });

// Добавляем политику cookie
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.Lax;
    options.HttpOnly = Microsoft.AspNetCore.CookiePolicy.HttpOnlyPolicy.Always;
    options.Secure = CookieSecurePolicy.Always;
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Настройка конвейера HTTP-запросов
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCookiePolicy(); // Добавляем политику cookie
app.UseRouting();

// Важно: UseAuthentication ДО UseAuthorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();