using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    /// <summary>
    /// Base class for all controllers to extend.
    /// Common methods/properties can be included here.
    /// </summary>
    public class ControllerBase : Controller
    {
        public string? UserName => User?.Identity?.Name;
    }
}
