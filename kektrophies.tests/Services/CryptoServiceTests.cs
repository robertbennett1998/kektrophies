using System;
using kektrophies.Services;
using Moq.AutoMock;
using NUnit.Framework;
using Shouldly;

namespace kektrophies.tests.Services
{
    [TestFixture]
    public class CryptoServiceTests
    {
        private AutoMocker _mocker;

        [SetUp]
        public void Init()
        {
            _mocker = new AutoMocker();
        }
        
        [TestCase(6)]
        [TestCase(32)]
        [TestCase(3)]
        [TestCase(12)]
        [TestCase(1)]
        public void GenerateCode_Success(int length)
        {
            // Arrange
            var serviceUnderTest = CreateServiceUnderTest();
            
            // Act
            var code = serviceUnderTest.GenerateCode(length);

            // Assert
            code.ShouldNotBeNullOrEmpty();
            code.Length.ShouldBe(length);
        }
        
        [TestCase(50)]
        public void GenerateCode_LengthTooLong(int length)
        {
            // Arrange
            var serviceUnderTest = CreateServiceUnderTest();
            
            // Act
            var exception = Should.Throw<ArgumentOutOfRangeException>(() => serviceUnderTest.GenerateCode(length));

            // Assert
            exception.ParamName.ShouldBe("length");
            exception.ActualValue.ShouldBe(length);
        }
        
        [TestCase(0)]
        [TestCase(-5)]
        public void GenerateCode_LengthZeroOrLess(int length)
        {
            // Arrange
            var serviceUnderTest = CreateServiceUnderTest();
            
            // Act
            var exception = Should.Throw<ArgumentOutOfRangeException>(() => serviceUnderTest.GenerateCode(length));

            // Assert
            exception.ParamName.ShouldBe("length");
            exception.ActualValue.ShouldBe(length);
        }
        
        private ICryptoService CreateServiceUnderTest() => _mocker.CreateInstance<CryptoService>();
    }
}