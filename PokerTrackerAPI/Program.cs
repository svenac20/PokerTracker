using System.Text;
using Azure.Identity;
using FastEndpoints;
using FastEndpoints.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.MicrosoftAccount;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PokerTrackerAPI.SignalR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Allow",
        cors => cors 
            .WithOrigins(builder.Configuration["CorsOrigins"]!)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
        );
});

// builder.Services
//     .AddFastEndpoints()
//     .SwaggerDocument(o =>
//     {
//         o.DocumentSettings = s =>
//         {
//             s.Title = "Poker Tracker API";
//             s.Version = "v1";
//         };
//     });

builder.Services.AddSignalR();

var app = builder.Build();

// app
//     .UseFastEndpoints(c => { c.Endpoints.RoutePrefix = "api"; })
//     .UseSwaggerGen();

app.MapHub<MessagingHub>("/hub");

app.UseHttpsRedirection();
app.UseCors("Allow");

app.Run();