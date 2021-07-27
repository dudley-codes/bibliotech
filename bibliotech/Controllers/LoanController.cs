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
                return NoContent();
            
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
