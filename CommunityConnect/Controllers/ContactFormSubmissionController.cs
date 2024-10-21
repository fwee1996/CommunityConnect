using CommunityConnect.Models;
using CommunityConnect.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CommunityConnect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactFormSubmissionController : ControllerBase
    {
        private readonly IContactFormSubmissionRepository _contactFormSubmissionRepository;

        public ContactFormSubmissionController(IContactFormSubmissionRepository contactFormSubmissionRepository)
        {
            _contactFormSubmissionRepository = contactFormSubmissionRepository;
        }
        // GET: api/<ContactFormSubmissionController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_contactFormSubmissionRepository.GetAllContactForms());
        }

        // GET api/<ContactFormSubmissionController>/5
        [HttpGet("{eventId}")]
        public IActionResult Get(int eventId)
        {
            var contactFormSubmission = _contactFormSubmissionRepository.GetContactFormSubmissionByEventId(eventId);
            if (contactFormSubmission == null || !contactFormSubmission.Any())
            {
                // Return an empty array if no forms are found
                return Ok(new List<VolunteerSignup>());
            }
            return Ok(contactFormSubmission);
        }

        // POST api/<ContactFormSubmissionController>
        [HttpPost("{eventId}")]
        public IActionResult Post(ContactFormSubmission contactFormSubmission)
        {
            _contactFormSubmissionRepository.AddContactFormSubmission(contactFormSubmission);
            return CreatedAtAction("Get", new { id = contactFormSubmission.Id }, contactFormSubmission);
        }

        //// PUT api/<ContactFormSubmissionController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<ContactFormSubmissionController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
