using System.Net;

namespace kektrophies.Exceptions
{
    public class IncorrectAdminPasswordException : KekException
    {
        public IncorrectAdminPasswordException() : base(HttpStatusCode.Unauthorized)
        {
        }
    }
}