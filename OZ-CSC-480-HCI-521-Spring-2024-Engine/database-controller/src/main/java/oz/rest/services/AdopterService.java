package oz.rest.services;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import com.mongodb.client.MongoCollection;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.JsonArray;
import jakarta.websocket.server.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import oz.rest.models.Shelter;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.and;


@Tag(name = "Adopters")
@Path("/adopter")
@ApplicationScoped
public class AdopterService extends AbstractService<Adopter> {
    @Override
    @POST
    public Response add(Adopter newEntry) {
        JsonArray violations = getViolations(newEntry);

        if (!violations.isEmpty()) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(violations.toString())
                    .build();
        }

        MongoCollection<Adopter> adopters = db.getCollection("Adopters", Adopter.class);

        adopters.insertOne(newEntry);

        return Response
                .status(Response.Status.OK)
                .entity(newEntry.toJson())
                .build();
    }

    @GET
    @APIResponses({
        @APIResponse(
            responseCode = "200",
            description = "Successfully found user."),
        @APIResponse(
            responseCode = "400",
            description = "Invalid name or configuration"),
        @APIResponse(
            responseCode = "404",
            description = "User not found")})
    public Response retrieve(Adopter entry) {
        MongoCollection<Adopter> adopters = db.getCollection("Adopters", Adopter.class);

        var adopter = adopters.find(eq("_id", entry.getName())).first();
        if(adopter == null){
            return Response.Status(404).build();
        }
        else{
            return Response.ok(adopter.toJson()).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @APIResponses({
        @APIResponse(
            responseCode = "200",
            description = "Successfully updated shelter."),
        @APIResponse(
            responseCode = "400",
            description = "Invalid name or configuration"),
        @APIResponse(
            responseCode = "404",
            description = "Shelter not found")})
    @Operation (summary = "Update info about a shelter")
    public Response update(Adopter adopter,
    @Parameter(
        description = "Name of the adopter to update",
        required = true
    )
    @PathParam("id") String id) {
        JsonArray vio = getViolations(adopter);

        if(!vio.isEmpty()){
            return Response
            .status(Response.Status.BAD_REQUEST)
            .entity(vio.toString())
            .build();
        }
        MongoCollection<Adopter> adopters = db.getCollection("Adopters", Adopter.class);

        Adopter newAdopter = new Adopter();
        newAdopter.setName();
        newAdopter.setEmailAddress();
        //newAdopter.setLocation

        UpdateResult result = adopters.replaceOne(and(eq("_id", adopter.getName()), eq("password", adopter.getEmailAddress())), newAdopter);

        return Response
        .status(Response.Status.OK)
        .entity(newShelter.toJson())
        .build();
    }

    @DELETE
    public Response remove(Adopter entry) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }


    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation (summary = "Login method")
    @APIResponses({
            @APIResponse(responseCode = "400", description = "Login failed"),
            @APIResponse(responseCode = "200", description = "Login was successful") })
    public Response login(Adopter entry) {
        MongoCollection<Adopter> adopter = db.getCollection("Adopters",
                Adopter.class);

        // TODO: encrypt passwords at rest, java.security MessageDigest looks promising

        var record = adopter.find(and(eq("_id", entry.getName()), eq("password", entry.getPassword()))).first();

        if (record == null) {
            return Response.status(400).build();
        }

        return Response.ok(record.toJson()).build();
    }
}
