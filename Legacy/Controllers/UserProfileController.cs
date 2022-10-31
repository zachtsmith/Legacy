using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Legacy.Repositories;
using Legacy.Models;

namespace Legacy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetUserProfiles()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
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

        [HttpGet("details/{id}")]
        public IActionResult GetUserById(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }
        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            if (userProfile.UserType == "Client") { userProfile.UserTypeId = UserType.CLIENT_ID; }
            else {
                userProfile.UserTypeId = UserType.BROKER_ID; }
                _userProfileRepository.Add(userProfile);
                return CreatedAtAction(
                    nameof(GetUserProfile),
                    new { firebaseUserId = userProfile.FirebaseUserId },
                    userProfile);
            
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userProfileRepository.UpdateUser(userProfile);
            return NoContent();
        }
    }
}
