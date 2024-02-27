package pet_finder.rest;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/shelter")
public class ShelterResource 
{
    @GET
    @RolesAllowed("admin2")
    public String getResponse()
    {
        return "You should only see this if you're an admin!";
    }
}
