using System;

namespace kektrophies.Services
{
    public class CryptoService : ICryptoService
    {
        public string GenerateCode(int length)
        {
            var guid = Guid.NewGuid().ToString();
            if (length > guid.Length)
                throw new ArgumentOutOfRangeException(nameof(length), length,
                    $"{nameof(length)} must be less than {guid.Length}.");
            if (length <= 0)
                throw new ArgumentOutOfRangeException(nameof(length), length,
                    $"{nameof(length)} must be greater than 0.");

            return guid.Substring(0, length);
        }
    }
}