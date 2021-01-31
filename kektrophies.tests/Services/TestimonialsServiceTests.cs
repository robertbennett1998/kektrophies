using System;
using System.Linq;
using System.Threading.Tasks;
using kektrophies.DTOs;
using kektrophies.Exceptions;
using kektrophies.Models;
using kektrophies.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.AutoMock;
using NUnit.Framework;
using Shouldly;

namespace kektrophies.tests.Services
{
    [TestFixture]
    public class TestimonialsServiceTests
    {
        private AutoMocker _mocker;
        private DatabaseContext _databaseContext;
        
        [SetUp]
        public void Init()
        {
            _mocker = new AutoMocker();
            
            DbContextOptions<DatabaseContext> options = new DbContextOptionsBuilder<DatabaseContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .EnableSensitiveDataLogging()
                .Options;

            _databaseContext = new DatabaseContext(options);
            _mocker.Use(_databaseContext);
        }
        
        [Test]
        public async Task CreateNewTestimonialCode_OneCode_Success()
        {
            // Definitions
            const string firstName = "first;";
            const string lastName = "last";
            const string description = "description";
            const string adminPassword = "password";
            const string expectedCode = "123456";
            DateTime expirationDateTime = DateTime.Now.AddDays(28);
            const int expectedCodeLength = 6;
            
            // Arrange
            var createTestimonialCodeDto = new CreateTestimonialCodeDto(firstName, lastName, description, adminPassword);
            var serviceUnderTest = CreateServiceUnderTest();
            _mocker.GetMock<ICryptoService>().Setup(ts => ts.GenerateCode(It.Is<int>((i) => i == expectedCodeLength))).Returns(expectedCode);
            _mocker.GetMock<IPasswordService>().Setup(ps => ps.CheckPassword(It.Is<string>((password) => password == adminPassword), It.IsAny<string>())).Returns(true);

            // Act
            var result = await serviceUnderTest.CreateNewTestimonialCode(createTestimonialCodeDto);

            // Assert
            result.ShouldNotBeNullOrEmpty();
            result.ShouldBe(expectedCode);
            result.Length.ShouldBe(6);
            
            _databaseContext.TestimonialCodes.Count().ShouldBe(1);
            var databaseCode = _databaseContext.TestimonialCodes.FirstOrDefault();
            databaseCode.ShouldNotBeNull();
            databaseCode.FirstName.ShouldBe(firstName);
            databaseCode.LastName.ShouldBe(lastName);
            databaseCode.Description.ShouldBe(description);
            databaseCode.Code.ShouldBe(expectedCode);
        }
        
        // Tests that a clash in the codes is resolved if an existing code is generated.
        [Test]
        public async Task CreateNewTestimonialCode_AdditionalCode_Success()
        {
            // Definitions
            const string firstName = "first;";
            const string lastName = "last";
            const string description = "description";
            const string adminPassword = "password";
            const string existingCode = "123456";
            const string expectedCode = "654321";
            DateTime expirationDateTime = DateTime.Now.AddDays(28);
            const int expectedCodeLength = 6;
            
            // Arrange
            _databaseContext.TestimonialCodes.Add(new TestimonialCodeModel(firstName, lastName, description, existingCode, expirationDateTime));
            _databaseContext.SaveChanges();
            
            var createTestimonialCodeDto = new CreateTestimonialCodeDto(firstName, lastName, description, adminPassword);
            var serviceUnderTest = CreateServiceUnderTest();
            _mocker.GetMock<ICryptoService>().Setup(ts => ts.GenerateCode(It.Is<int>((i) => i == expectedCodeLength))).Returns(expectedCode);
            _mocker.GetMock<IPasswordService>().Setup(ps => ps.CheckPassword(It.Is<string>((password) => password == adminPassword), It.IsAny<string>())).Returns(true);

            // Act
            var result = await serviceUnderTest.CreateNewTestimonialCode(createTestimonialCodeDto);

            // Assert
            result.ShouldNotBeNullOrEmpty();
            result.ShouldBe(expectedCode);
            result.Length.ShouldBe(6);
            
            _databaseContext.TestimonialCodes.Count().ShouldBe(2);
            var databaseCode = _databaseContext.TestimonialCodes.FirstOrDefault((c) => c.Code == expectedCode);
            databaseCode.ShouldNotBeNull();
            databaseCode.FirstName.ShouldBe(firstName);
            databaseCode.LastName.ShouldBe(lastName);
            databaseCode.Description.ShouldBe(description);
            databaseCode.Code.ShouldBe(expectedCode);
        }

        [Test]
        public async Task CreateNewTestimonialCode_IncorrectAdminPassword()
        {
            // Definitions
            const string firstName = "first;";
            const string lastName = "last";
            const string description = "description";
            const string adminPassword = "password";
            const string expectedCode = "123456";
            DateTime expirationDateTime = DateTime.Now.AddDays(28);
            const int expectedCodeLength = 6;

            // Arrange
            var createTestimonialCodeDto = new CreateTestimonialCodeDto(firstName, lastName, description, adminPassword);
            var serviceUnderTest = CreateServiceUnderTest();
            _mocker.GetMock<ICryptoService>().Setup(ts => ts.GenerateCode(It.Is<int>((i) => i == expectedCodeLength))).Returns(expectedCode);
            _mocker.GetMock<IPasswordService>().Setup(ps => ps.CheckPassword(It.Is<string>((password) => password == adminPassword), It.IsAny<string>())).Returns(false);

            // Act
            await Should.ThrowAsync<IncorrectAdminPasswordException>(serviceUnderTest.CreateNewTestimonialCode(createTestimonialCodeDto));

            // Assert
            _databaseContext.TestimonialCodes.Count().ShouldBe(0);
        }

        // Tests that a clash in the codes is resolved if an existing code is generated.
        [Test]
        public async Task CreateNewTestimonialCode_AdditionalCode_CodeClash_Success()
        {
            // Definitions
            const string firstName = "first;";
            const string lastName = "last";
            const string description = "description";
            const string adminPassword = "password";
            const string existingCode = "123456";
            const string expectedCode = "654321";
            DateTime expirationDateTime = DateTime.Now.AddDays(28);
            const int expectedCodeLength = 6;
            
            // Arrange
            _databaseContext.TestimonialCodes.Add(new TestimonialCodeModel(firstName, lastName, description, existingCode, expirationDateTime));
            _databaseContext.SaveChanges();
            
            var createTestimonialCodeDto = new CreateTestimonialCodeDto(firstName, lastName, description, adminPassword);
            var serviceUnderTest = CreateServiceUnderTest();
            _mocker.GetMock<ICryptoService>().SetupSequence(ts => ts.GenerateCode(It.Is<int>((i) => i == expectedCodeLength))).Returns(existingCode).Returns(expectedCode);
            _mocker.GetMock<IPasswordService>().Setup(ps => ps.CheckPassword(It.Is<string>((password) => password == adminPassword), It.IsAny<string>())).Returns(true);

            // Act
            var result = await serviceUnderTest.CreateNewTestimonialCode(createTestimonialCodeDto);

            // Assert
            result.ShouldNotBeNullOrEmpty();
            result.ShouldBe(expectedCode);
            result.Length.ShouldBe(6);
            
            _databaseContext.TestimonialCodes.Count().ShouldBe(2);
            var databaseCode = _databaseContext.TestimonialCodes.FirstOrDefault((c) => c.Code == expectedCode);
            databaseCode.ShouldNotBeNull();
            databaseCode.FirstName.ShouldBe(firstName);
            databaseCode.LastName.ShouldBe(lastName);
            databaseCode.Description.ShouldBe(description);
            databaseCode.Code.ShouldBe(expectedCode);
        }
    
        [Test]
        public async Task CreateNewTestimonial_Success()
        {
            // Definitions
            const string firstName = "first;";
            const string lastName = "last";
            const string description = "description";
            const string code = "123456";
            DateTime expirationDateTime = DateTime.Now.AddDays(28);
            const string testimonial = "testimonial";
            
            // Arrange
            _databaseContext.TestimonialCodes.Add(new TestimonialCodeModel(firstName, lastName, description, code, expirationDateTime));
            _databaseContext.SaveChanges();
            
            var createTestimonialDto = new CreateTestimonialDto(code, testimonial);
            var serviceUnderTest = CreateServiceUnderTest();

            // Act
            await serviceUnderTest.CreateNewTestimonial(createTestimonialDto);

            // Assert
            _databaseContext.TestimonialCodes.Count().ShouldBe(0);
            _databaseContext.Testimonials.Count().ShouldBe(1);
            var databaseTestimonial = _databaseContext.Testimonials.FirstOrDefault();
            databaseTestimonial.ShouldNotBeNull();
            databaseTestimonial.FirstName.ShouldBe(firstName);
            databaseTestimonial.LastName.ShouldBe(lastName);
            databaseTestimonial.Description.ShouldBe(description);
            databaseTestimonial.Testimonial.ShouldBe(testimonial);
        }
        
        [Test]
        public async Task CreateNewTestimonial_AdditionalReviewSamePerson_Success()
        {
            // Definitions
            const string firstName = "first;";
            const string lastName = "last";
            const string description = "description";
            const string code = "123456";
            DateTime expirationDateTime = DateTime.Now.AddDays(28);
            const string testimonial = "testimonial";
            
            // Arrange
            _databaseContext.TestimonialCodes.Add(new TestimonialCodeModel(firstName, lastName, description, code, expirationDateTime));
            _databaseContext.Testimonials.Add(new TestimonialModel(firstName, lastName, description, testimonial));
            
            _databaseContext.SaveChanges();
            
            var createTestimonialDto = new CreateTestimonialDto(code, testimonial);
            var serviceUnderTest = CreateServiceUnderTest();

            // Act
            await serviceUnderTest.CreateNewTestimonial(createTestimonialDto);

            // Assert
            _databaseContext.TestimonialCodes.Count().ShouldBe(0);
            _databaseContext.Testimonials.Count().ShouldBe(2);
            var databaseTestimonial = _databaseContext.Testimonials.FirstOrDefault();
            databaseTestimonial.ShouldNotBeNull();
            databaseTestimonial.FirstName.ShouldBe(firstName);
            databaseTestimonial.LastName.ShouldBe(lastName);
            databaseTestimonial.Description.ShouldBe(description);
            databaseTestimonial.Testimonial.ShouldBe(testimonial);
        }
        
        [Test]
        public void CreateNewTestimonial_AdditionalReviewSamePerson_CodeDoesntExist()
        {
            // Definitions
            const string code = "123456";
            const string testimonial = "testimonial";
            
            // Arrange
            var createTestimonialDto = new CreateTestimonialDto(code, testimonial);
            var serviceUnderTest = CreateServiceUnderTest();

            // Act
            // Assert
            Should.Throw<TestimonialCodeDoesNotExistException>(async () => await serviceUnderTest.CreateNewTestimonial(createTestimonialDto));
        }
        
        [Test]
        public async Task CreateNewTestimonial_AdditionalReviewSamePerson_CodeExpired()
        {
            // Definitions
            const string firstName = "first;";
            const string lastName = "last";
            const string description = "description";
            DateTime expirationDateTime = DateTime.Now.AddDays(-28);
            const string code = "123456";
            const string testimonial = "testimonial";
            
            // Arrange
            var createTestimonialDto = new CreateTestimonialDto(code, testimonial);
            var serviceUnderTest = CreateServiceUnderTest();

            await _databaseContext.TestimonialCodes.AddAsync(new TestimonialCodeModel(firstName, lastName, description, code, expirationDateTime));
            await _databaseContext.SaveChangesAsync();
            
            // Act
            // Assert
            Should.Throw<TestimonialCodeExpiredException>(async () => await serviceUnderTest.CreateNewTestimonial(createTestimonialDto));
        }

        [Test]
        public async Task GetTestimonials_All()
        {           
            // Definitions
            const string firstName = "first;";
            const string lastName = "last";
            const string description = "description";
            const string testimonial = "testimonial";
            
            // Arrange
            var serviceUnderTest = CreateServiceUnderTest();
            
            await _databaseContext.Testimonials.AddAsync(new TestimonialModel(firstName, lastName, description, testimonial));
            await _databaseContext.Testimonials.AddAsync(new TestimonialModel(firstName, lastName, description, testimonial));
            await _databaseContext.Testimonials.AddAsync(new TestimonialModel(firstName, lastName, description, testimonial));
            await _databaseContext.Testimonials.AddAsync(new TestimonialModel(firstName, lastName, description, testimonial));

            await _databaseContext.SaveChangesAsync();

            //Act
            var testimonials = await serviceUnderTest.GetTestimonials();
            
            // Assert
            testimonials.ShouldNotBeNull();
            testimonials.Count.ShouldBe(4);
        }
               
        [TestCase(0, 4, 4)]
        [TestCase(0, -1, 1)]
        [TestCase(0, 8, 4)]
        [TestCase(0, 2, 2)]
        [TestCase(2, 4, 2)]
        [TestCase(2, 2, 2)]
        [TestCase(2, 1, 1)]
        [TestCase(2, -1, 1)]
        [TestCase(4, 4, 0)]
        [TestCase(4, -1, 1)]
        public async Task GetTestimonials_GetRange(int offset, int length, int expectedLength)
        {           
            // Definitions
            const string firstName = "first;";
            const string lastName = "last";
            const string description = "description";
            const string testimonial = "testimonial";
            
            // Arrange
            var serviceUnderTest = CreateServiceUnderTest();
            
            await _databaseContext.Testimonials.AddAsync(new TestimonialModel(firstName, lastName, description, testimonial));
            await _databaseContext.Testimonials.AddAsync(new TestimonialModel(firstName, lastName, description, testimonial));
            await _databaseContext.Testimonials.AddAsync(new TestimonialModel(firstName, lastName, description, testimonial));
            await _databaseContext.Testimonials.AddAsync(new TestimonialModel(firstName, lastName, description, testimonial));

            await _databaseContext.SaveChangesAsync();

            //Act
            var testimonials = await serviceUnderTest.GetTestimonials(offset, length);
            
            // Assert
            testimonials.ShouldNotBeNull();
            testimonials.Count.ShouldBe(expectedLength);
        }
        
        private ITestimonialsService CreateServiceUnderTest() => _mocker.CreateInstance<TestimonialsService>();
    }
}