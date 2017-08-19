using System.Web;
using System.Web.Mvc;
using System.Web.Http.Filters;
using RisingWebApp.Filters;

namespace RisingWebApp
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterWebApiFilters(HttpFilterCollection filters)
        {
            filters.Add(new AntiForgeryTokenFilter());
        }
    }
}
