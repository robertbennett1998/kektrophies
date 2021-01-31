using System.Net;

namespace kektrophies.Exceptions
{
    public class TestimonialCodeDoesNotExistException : KekException
    {
        public TestimonialCodeDoesNotExistException() : base(HttpStatusCode.Gone)
        {
        }
    }
}   