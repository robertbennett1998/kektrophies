using System;
using System.Net;

namespace kektrophies.Exceptions
{
    public class KekException : Exception
    {
        public HttpStatusCode StatusCode { get; }

        public KekException(HttpStatusCode statusCode, string message=null) : base(message)
        {
            StatusCode = statusCode;
        }
    }
}