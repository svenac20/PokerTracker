using System.Text;
using FastEndpoints;
using PokerTrackerAPI.Features.Casino.GetCasinoForUser;

namespace PokerTrackerAPI.Middlewares;

public class RoleMiddleware: IPreProcessor<GetCasinoForUserRequest>
{
    public async Task PreProcessAsync(IPreProcessorContext<GetCasinoForUserRequest> context, CancellationToken ct)
    {
        var roleIdClaim = context.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "role id");

        if (roleIdClaim == null || roleIdClaim.Value != "2")
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
            context.HttpContext.Response.ContentType = "text/plain";
            await context.HttpContext.Response.WriteAsync("Forbidden: Invalid roleId", Encoding.UTF8, ct);
            return;
        }
    }
}