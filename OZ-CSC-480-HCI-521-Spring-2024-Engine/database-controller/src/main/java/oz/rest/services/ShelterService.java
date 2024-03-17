package oz.rest.services;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.UpdateResult;
import com.mongodb.internal.bulk.UpdateRequest;

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

@Tag(name = "Shelters")
@Path("/shelter")
@ApplicationScoped
public class ShelterService extends AbstractService<Shelter> {
    @Override
    @POST
    @APIResponses({
            @APIResponse(responseCode = "400", description = "The request was invalid"),
            @APIResponse(responseCode = "200", description = "Successfully added new shelter") })
    @Operation(summary = "Add a new shelter to the database")
    public Response add(Shelter newEntry) {
        JsonArray violations = getViolations(newEntry);

        if (!violations.isEmpty()) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(violations.toString())
                    .build();
        }

        // TODO: getting the collection is done for every service,
        // so it would be nice to have that moved into the AbstractService
        // as a field somehow, and initialized in each service
        MongoCollection<Shelter> shelters = db.getCollection("Shelters",
                Shelter.class);

        shelters.insertOne(newEntry);

        return Response
                .status(Response.Status.OK)
                .entity(newEntry.toJson())
                .build();
    }

    // TODO: this does not work! needs to be redone using query parameters
    // instead of JSON in the request body
    @Override
    @GET
    public Response retrieve(Shelter entry) {
        MongoCollection<Shelter> shelters = db.getCollection("Shelters",
                Shelter.class);

        var shelter = shelters.find(eq("_id", entry.getName())).first();
        if (shelter == null) {
            return Response.status(400).build();
        } else {
            return Response.ok(shelter.toJson()).build();
        }
    }

    @PUT
    @Path("/{name}")
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
    public Response update(Shelter shelter,
        @Parameter(
            description = "Name of shelter to update",
            required = true
        )
        @PathParam("name") String name) {
            JsonArray vio = getViolations(shelter);

            if(!vio.isEmpty()){
                return Response
                .status(Response.Status.BAD_REQUEST)
                .entity(vio.toString())
                .build();
            }
            MongoCollection<Shelter> shelters = db.getCollection("Shelters",
                Shelter.class);
            //shelter = shelters.find(and(eq("_id", shelter.getName()), eq("password", shelter.getPassword()))).first(); 

            Shelter newShelter = new Shelter();
            newShelter.setName(shelter.getName());
            newShelter.setPassword(shelter.getPassword());
            newShelter.setAvailablePets(shelter.getAvailablePets());

            
            UpdateResult updateResult = shelters.replaceOne(and(eq("_id", shelter.getName()), eq("password", shelter.getPassword())), newShelter);

            if(updateResult.getMatchedCount() == 0){
                return Response
                .status(Response.Status.NOT_FOUND)
                .entity("[\"_id was not found!\"]")
                .build();
            }

            shelters.replaceOne(and(eq("_id", shelter.getName()), eq("password", shelter.getPassword())), newShelter); 

            return Response
                .status(Response.Status.OK)
                .entity(newShelter.toJson())
                .build();
        }

    @Override
    @DELETE
    public Response remove(Shelter entry) {
        MongoCollection<Shelter> shelters = db.getCollection("Shelters",
                Shelter.class);

        var removedShelter = shelters.findOneAndDelete(eq("_id", entry.getName()));
        if (removedShelter == null) {
            return Response.status(400).build();
        } else {
            return Response.ok(removedShelter.toJson()).build();
        }
    }

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation (summary = "Update info about a shelter")
    @APIResponses({
            @APIResponse(responseCode = "400", description = "Login failed"),
            @APIResponse(responseCode = "200", description = "Login was successful") })
    public Response login(Shelter entry) {
        MongoCollection<Shelter> shelters = db.getCollection("Shelters",
                Shelter.class);

        // TODO: encrypt passwords at rest, java.security MessageDigest looks promising

        var record = shelters.find(and(eq("_id", entry.getName()), eq("password", entry.getPassword()))).first();

        if (record == null) {
            return Response.status(400).build();
        }

        return Response.ok(record.toJson()).build();
    }
}
