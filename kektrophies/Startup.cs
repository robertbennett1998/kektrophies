using System.IO;
using kektrophies.Middleware;
using kektrophies.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

namespace kektrophies
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // #if DEBUG
            services.AddCors();
            // #endif
        
            services.AddControllers();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddDbContext<DatabaseContext>();
            services.AddTransient<ITestimonialsService, TestimonialsService>();
            services.AddSingleton<IPasswordService, PBKDF2PasswordService>();
            services.AddSingleton<ICryptoService, CryptoService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // #if DEBUG
            app.UseCors(opts =>
            {
                opts.AllowAnyOrigin();
                opts.AllowAnyHeader();
                opts.AllowAnyMethod();
                opts.WithExposedHeaders("X-Operation");
            });
            // #endif                        
            
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseKekExceptionHandlerMiddleware();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "api/{controller}/{action=Index}/{id?}");
                endpoints.MapControllers();
            });
            
            app.MapWhen(x => !x.Request.Path.Value.StartsWith("/api"), builder =>
            {
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp";
            
                    if (env.IsDevelopment())
                    {
                        spa.UseReactDevelopmentServer(npmScript: "start");
                    }
                    else
                    {
                        app.UseSpaStaticFiles();
                    }
                });
            });
        }
    }
}