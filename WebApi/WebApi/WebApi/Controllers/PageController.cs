using DataModel.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interface;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageController : ControllerBase
    {
        private IPageService _pageService;

        public PageController (IPageService pageService)
        {
            _pageService = pageService;
        }

        /// <summary>
        /// Return all pages.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllPages")]
        public IActionResult GetAllPages()
        {
            return Ok(_pageService.GetAllPages());
        }

        /// <summary>
        /// Return all pages.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetPageById/{id}")]
        public IActionResult GetPageById(int id)
        {
            return Ok(_pageService.GetById(id));
        }

        /// <summary>
        /// Update page.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("UpdatePage")]
        public IActionResult UpdatePage(Page page)
        {
            _pageService.UpdatePage(page);
            return Ok();
        }
    }
}
