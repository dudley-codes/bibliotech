using Bibliotech.Models;
using Bibliotech.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Bibliotech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        private readonly ILoanRepository _loanRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public LoanController(ILoanRepository loanRepo,
            IUserProfileRepository userProfileRepo)
        {
            _loanRepository = loanRepo;
            _userProfileRepository = userProfileRepo;
        }

        [HttpPost]
        public IActionResult Post(Loan loan)
        {
            var currentUser = GetCurrentUserProfile();

            _loanRepository.Add(loan, currentUser);

            return Ok();
        }

        // Update post
        [HttpPut("{id}")]
        public IActionResult Put(int id, Loan loan)
        {
            var currentUser = GetCurrentUserProfile();
            if (id != loan.Id)
            {
                return BadRequest();
            }
            else if (loan.BorrowerId == currentUser.Id || loan.OwnerId == currentUser.Id)
            {
                _loanRepository.UpdateLoanStatus(loan);
                return NoContent();
            }
            else
            {
                return Unauthorized();
            }

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUser = GetCurrentUserProfile();

            _loanRepository.Delete(id, currentUser);
            return StatusCode(StatusCodes.Status200OK);

        }

        /// Get book loan requests made to current user selected book
        [HttpGet("GetByUser/{id}")]
        public IActionResult GetBooksByUser(int id)
        {
            var user = GetCurrentUserProfile();
            return Ok(_loanRepository.GetLoansByCurrentUser(user, id));
        }

        //Controller for loan requests made by current user for selected book
        [HttpGet("GetLoanRequest/{id}")]
        public IActionResult GetLoanRequest(int id)
        {
            var user = GetCurrentUserProfile();
            return Ok(_loanRepository.GetLoanRequest(user, id));
        }

        //returns a list of all loan requests made by current logged in user
        [HttpGet("GetAllUserRequests")]
        public IActionResult GetAllLoanRequests()
        {
            var user = GetCurrentUserProfile();
            return Ok(_loanRepository.GetAllUserLoanRequests(user));
        }

        /// controller  to Get all loans made to current user for their books
        [HttpGet("LoansToUser")]
        public IActionResult GetAllLoanRequestsTo()
        {
            var user = GetCurrentUserProfile();
            return Ok(_loanRepository.GetRequestsMadeToUser(user));
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
