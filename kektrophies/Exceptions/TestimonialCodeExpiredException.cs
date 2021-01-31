using System.Net;

namespace kektrophies.Exceptions
{
    public class TestimonialCodeExpiredException : KekException
    {
        public TestimonialCodeExpiredException() : base(HttpStatusCode.Gone)
        {
        }
    }
}