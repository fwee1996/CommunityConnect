using CommunityConnect.Repositories;

namespace CommunityConnect
{
        public class Program
        {
            public static void Main(string[] args)
            {
                var builder = WebApplication.CreateBuilder(args);

                // Add services to the container.

                builder.Services.AddControllers();
                builder.Services.AddTransient<IEventRepository, EventRepository>();
                builder.Services.AddTransient<IUserRepository, UserRepository>();
                builder.Services.AddTransient<IVolunteerSignupRepository, VolunteerSignupRepository>();
                builder.Services.AddTransient<IContactFormSubmissionRepository, ContactFormSubmissionRepository>();
                builder.Services.AddTransient<INotificationRepository, NotificationRepository>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen();


                var app = builder.Build();
            // Configure CORS policy
            app.UseCors(options =>
            {
                options.AllowAnyOrigin();
                options.AllowAnyMethod();
                options.AllowAnyHeader();
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
        

                app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthorization();


                app.MapControllers();

                app.Run();
            }
        }
    }



//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//    {
//        app.UseSwagger();
//        app.UseSwaggerUI();
//        app.UseCors(options =>
//        {
//            options.AllowAnyOrigin();
//            options.AllowAnyMethod();
//            options.AllowAnyHeader();
//        });
//    }