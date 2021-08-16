using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Bibliotech.Models;
using Bibliotech.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Bibliotech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("UserProfile/{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPost("AddFriend/{id}")]
        public IActionResult AddFriend(int id)
        {
            var user = GetCurrentUserProfile();

            _userProfileRepository.AddFriend(user, id);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult UnFriend(int id)
        {
            var user = GetCurrentUserProfile();

            _userProfileRepository.UnFriend(user, id);

            return NoContent();
        }

        [HttpGet("GetAllFriends")]
        public IActionResult GetAllFriends()
        {
            var user = GetCurrentUserProfile();
            return Ok(_userProfileRepository.GetAllFriends(user));
        }

        [HttpGet("GetNotFriends")]
        public IActionResult GetNotFriends()
        {
            var user = GetCurrentUserProfile();
            return Ok(_userProfileRepository.GetNotFriends(user));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
