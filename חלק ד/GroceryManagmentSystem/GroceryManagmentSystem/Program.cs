
using GroceryManagementSystem.GroceryDbContext;
using GroceryManagementSystem.Repository.Interfaces;
using GroceryManagementSystem.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

namespace GroceryManagementSystem
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddMyServices();
            //builder.Services.AddControllers().AddJsonOptions(options =>
            //  {
            //      options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            //  });
            builder.Services.AddDbContext<IContext,MyGroceryContext>();

            builder.Services.AddCors(options =>
           {
               options.AddPolicy("AllowOrigin",
                   builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
           });
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                           .AddJwtBearer(option =>
                           option.TokenValidationParameters = new TokenValidationParameters
                           {
                               ValidateIssuer = true,
                               ValidateAudience = true,
                               ValidateLifetime = true,
                               ValidateIssuerSigningKey = true,
                               ValidIssuer = builder.Configuration.GetValue<string>("Jwt:Issuer"),
                               ValidAudience = builder.Configuration.GetValue<string>("Jwt:Audience"),
                               IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("Jwt:Key")))

                           });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("AllowOrigin");
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
