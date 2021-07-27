using Bibliotech.Models;
using Bibliotech.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Bibliotech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public BookController(IBookRepository bookRepo,
            IUserProfileRepository userProfileRepo)
        {
            _bookRepository = bookRepo;
            _userProfileRepository = userProfileRepo;
        }

        // GET: api/<BookController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_bookRepository.GetAll());
        }

        // GET api/<BookController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_bookRepository.GetBookById(id));
        }

        // GET api/<BookController>/5
        [HttpGet("GetByStatus/{loanStatus}")]
        public IActionResult Get(string loanStatus)
        {
            var user = GetCurrentUserProfile();
            return Ok(_bookRepository.GetUserLoansByStatus(user, loanStatus));
        }

        // POST api/<BookController>
        [HttpPost]
        public IActionResult Post(Book book)
        {
            _bookRepository.Add(book, book.Authors);
            //TODO: Add CreatedAtAction
            return Ok();
        }

        // PUT api/<BookController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BookController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User?.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (firebaseUserId != null)
            {
                return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }
            else
            {
                return null;
            }
        }
    }
}
