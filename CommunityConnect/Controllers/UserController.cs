using Microsoft.AspNetCore.Mvc;
using CommunityConnect.Models;
using CommunityConnect.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CommunityConnect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        // GET: api/<UserController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAllUsers());
        }

        // GET api/<UserController>/5
        //test: https://localhost:5001/api/user/1 
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var singleUser = _userRepository.GetUserByIdWithEvents(id);
            if (singleUser == null)
            {
                return NotFound();
            }
            return Ok(singleUser);
        }

        //check:https://localhost:5001/api/user/getbyemail?email=fiona@gmail.com
        [HttpGet("getbyemail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST api/<UserController>
        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepository.AddUser(user);
            return CreatedAtAction("Get", new { id = user.Id }, user);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _userRepository.UpdateUser(id, user);
            return NoContent();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userRepository.Delete(id);
            return NoContent();
        }



        [HttpPost("upload")]
        public IActionResult UploadUserImage(IFormFile file, int userId)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var uploadsDirectory = "wwwroot/uploads";
            var filePath = Path.Combine(uploadsDirectory, file.FileName);

            // Ensure the uploads directory exists
            if (!Directory.Exists(uploadsDirectory))
            {
                Directory.CreateDirectory(uploadsDirectory);
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            var userToUpdate = _userRepository.GetUserByIdWithEvents(userId);
            if (userToUpdate != null)
            {
                userToUpdate.ProfileImage = $"uploads/{file.FileName}";
                _userRepository.UpdateUser(userId, userToUpdate);
            }

            return Ok(new { FilePath = $"uploads/{file.FileName}" });
        }

    }
}
