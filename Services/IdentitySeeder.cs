using Microsoft.AspNetCore.Identity;

namespace Echo.Web.Services
{
    public static class IdentitySeeder
    {
        public static async Task SeedRolesAsync(
            IServiceProvider serviceProvider,
            IConfiguration configuration)
        {
            var roleManager =
                serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            var userManager =
                serviceProvider.GetRequiredService<UserManager<IdentityUser>>();

            const string adminRole = "Admin";

            if (!await roleManager.RoleExistsAsync(adminRole))
            {
                await roleManager.CreateAsync(
                    new IdentityRole(adminRole)
                );
            }

            var adminEmail =
                configuration["AdminUser:Email"];

            if (string.IsNullOrWhiteSpace(adminEmail))
            {
                return;
            }

            var adminUser =
                await userManager.FindByEmailAsync(adminEmail);

            if (adminUser != null &&
                !await userManager.IsInRoleAsync(adminUser, adminRole))
            {
                await userManager.AddToRoleAsync(
                    adminUser,
                    adminRole
                );
            }
        }
    }
}