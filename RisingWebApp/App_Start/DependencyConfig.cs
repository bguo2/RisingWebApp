using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Configuration;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using RisingWebApp.Email;
using RisingWebApp.Managers;

namespace RisingWebApp.App_Start
{
    public class DependencyConfig
    {
        public static void Configure(HttpConfiguration httpConfiguration)
        {
            var builder = new ContainerBuilder();
            RegisterInjecttions(builder);

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            var container = builder.Build();
            httpConfiguration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static void RegisterInjecttions(ContainerBuilder builder)
        {
            var emailSettings = new EmailServerSettings();
            emailSettings.Host = ConfigurationManager.AppSettings.Get("SMTP.Host");
            emailSettings.Port = Convert.ToInt32(ConfigurationManager.AppSettings.Get("SMTP.Port"));
            emailSettings.UserName = ConfigurationManager.AppSettings.Get("SMTP.UserName");
            emailSettings.Password = ConfigurationManager.AppSettings.Get("SMTP.Password");
            emailSettings.UseTLS = Convert.ToBoolean(ConfigurationManager.AppSettings.Get("SMTP.TLS"));

            builder.Register(c => emailSettings)
                .As<IEmailServerSettings>()
                .SingleInstance();

            builder.RegisterType<EmailServerImp>()
                .As<IEmailServer>();

            builder.RegisterType<RentApplicationManager>()
                .As<IRentApplicationManager>()
                .SingleInstance();
        }
    }
}