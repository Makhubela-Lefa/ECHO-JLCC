using Microsoft.AspNetCore.Mvc;

namespace Echo.Web.Controllers
{
    public class ProductionsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult WhenFireFell()
        {
            return View();
        }
    }
}