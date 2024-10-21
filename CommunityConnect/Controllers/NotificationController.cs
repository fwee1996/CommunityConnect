using CommunityConnect.Models;
using CommunityConnect.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CommunityConnect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationController(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }
        // GET: api/<NotificationController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_notificationRepository.GetAllNotifications());
        }

        // GET api/<NotificationController>/5
        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var notification = _notificationRepository.GetNotificationsByUserId(userId);
            if (notification == null || !notification.Any())
            {
                return NotFound();
            }
            return Ok(notification);
        }

        //// POST api/<NotificationController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<NotificationController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<NotificationController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}



        [HttpPost]
        public IActionResult CreateNotification([FromBody] Notification notification)
        {
            if (notification == null)
                return BadRequest("Notification data is required.");

            _notificationRepository.AddNotification(notification);
            return CreatedAtAction(nameof(Get), new { userId = notification.UserId }, notification);
        }

        [HttpPut("{notificationId}")]
        public IActionResult MarkAsRead(int id, int notificationId)
        {
            var notification = _notificationRepository.GetById(notificationId);
            if (notification == null)
                return NotFound();

            notification.IsRead = true;
            _notificationRepository.UpdateNotification(id, notification);
            return NoContent();
        }

    }
}
