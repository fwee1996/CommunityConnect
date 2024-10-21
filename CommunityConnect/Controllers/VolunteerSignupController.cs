using CommunityConnect.Models;
using CommunityConnect.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CommunityConnect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolunteerSignupController : ControllerBase
    {
        private readonly IVolunteerSignupRepository _volunteerSignupRepository;

        public VolunteerSignupController(IVolunteerSignupRepository volunteerSignupRepository)
        {
            _volunteerSignupRepository = volunteerSignupRepository;
        }

        //// GET: api/<VolunteerSignup>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_volunteerSignupRepository.GetAllVolunteers());
        }


        //get all volunteers for an event
        // GET api/<VolunteerSignup>/5
        [HttpGet("{eventId}")] //eventId not VolunteerSignup id! bs that's what youre getting as parameter in method below
        public IActionResult Get(int eventId)
        {
            var volunteerSignup = _volunteerSignupRepository.GetVolunteersByEventId(eventId);
            if ( volunteerSignup == null || !volunteerSignup.Any())
            {
                // Return an empty array if no volunteers are found
                return Ok(new List<VolunteerSignup>());
            }
            return Ok( volunteerSignup);
        }

        


        //add volunteer to an event
        //this works where 1 is eventId:https://localhost:5001/api/volunteersignup/1
        //so you need to post to above
        // POST api/<VolunteerSignup>
        [HttpPost("{eventId}")]
        public IActionResult Post(VolunteerSignup volunteerSignup)
        {

            _volunteerSignupRepository.AddVolunteerSignup(volunteerSignup); // Breakpoint to debug here
            return CreatedAtAction("Get", new { id = volunteerSignup.Id }, volunteerSignup);

        }



        //// PUT api/<VolunteerSignup>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<VolunteerSignup>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
