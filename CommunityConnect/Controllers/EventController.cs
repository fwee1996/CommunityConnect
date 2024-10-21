using Microsoft.AspNetCore.Mvc;
using CommunityConnect.Models;
using CommunityConnect.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CommunityConnect.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        // GET: api/Events
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_eventRepository.GetAllEvents());
        }

        //// GET api/Events/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var singleEvent = _eventRepository.GetById(id);
            if (singleEvent == null)
            {
            return NotFound();
        }
            return Ok(singleEvent);
        }


        // POST api/<EventController>
        [HttpPost]
        public IActionResult Post(Event singleEvent)
        {
            _eventRepository.AddEvent(singleEvent);
            return CreatedAtAction("Get", new { id = singleEvent.Id }, singleEvent);
        }

        // PUT api/<EventController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Event singleEvent)
        {
            if (id != singleEvent.Id)
            {
                return BadRequest();
            }
            _eventRepository.UpdateEvent(id,singleEvent);
            return NoContent();
        }

        // DELETE api/<EventController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _eventRepository.Delete(id);
            return NoContent();
        }



        // GET: api/Event/user/{userId}
        [HttpGet("user/{userId}")]
        public IActionResult GetEventsByUserId(int userId)
        {
            var events = _eventRepository.GetEventsByUserId(userId);
            if (events == null || !events.Any())
            {
                return NotFound();
            }
            return Ok(events);
        }

        // DELETE: api/Event/user/{userId}
        [HttpDelete("user/{userId}")]
        public IActionResult DeleteEventsByUserId(int userId)
        {
            _eventRepository.DeleteEventsByUserId(userId);
           
            return NoContent(); // Successfully deleted
        }


        [HttpPost("upload")]
        public IActionResult UploadEventImage(IFormFile file, int eventId)
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

            var eventToUpdate = _eventRepository.GetById(eventId);
            if (eventToUpdate != null)
            {
                eventToUpdate.EventPicture = $"uploads/{file.FileName}";
                _eventRepository.UpdateEvent(eventId, eventToUpdate);
            }

            return Ok(new { FilePath = $"uploads/{file.FileName}" });
        }






    }
}






//PUT swagger test for event id=1:
//{
//    "id": 1,
//  "userId": 2,
//  "name": "Asheville Flood Fundraiser",
//  "description": "A fundraiser to benefit flood victims.",
//  "eventDate": "2024-11-15T00:00:00Z",
//  "startTime": "10:00:00",
//  "endTime": "15:00:00",
//  "city": "Huntington",
//  "state": "WV",
//  "numVolunteersNeeded": 5,
//  "volunteersDuties": "Collect donations",
//  "eventPicture": "https://www.ashevillenc.gov/wp-content/uploads/2019/04/sunny-flooded-Biltmore-Village-768x503.png",
//  "user": {
//        "id": 2,
//    "email": "janora@gmail.com",
//    "password": "password456",
//    "fullName": "Janora",
//    "phoneNumber": "555-555-5555",
//    "city": "Huntington",
//    "state": "WV",
//    "profileImage": "https://www.shutterstock.com/image-photo/happy-pretty-stylish-senior-woman-600nw-2365474055.jpg",
//    "events": []
//  }
//}
