using System.Threading.Tasks;
using kektrophies.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;

namespace kektrophies.Middleware
{
    public class KekExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public KekExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var endpoint = httpContext.Features.Get<IEndpointFeature>()?.Endpoint;
            try
            {
                await _next(httpContext);
            }
            catch (KekException e)
            {
                httpContext.Response.StatusCode = (int)e.StatusCode;
                await httpContext.Response.WriteAsync(e.Message);
            }
        }
    }

    public static class StatusExceptionHandlerMiddlewareExtensions
    {
        public static IApplicationBuilder UseKekExceptionHandlerMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<KekExceptionHandlerMiddleware>();
        }
    }
}