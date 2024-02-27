package pet_finder.rest;

import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/user")
public class UserResource 
{
    @GET
    @PermitAll
    public String getResponse()
    {
        return "Anyone can see this!";
    }
}