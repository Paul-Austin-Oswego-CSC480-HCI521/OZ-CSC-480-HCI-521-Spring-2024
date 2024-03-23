package oz.rest.services;

import org.bson.types.ObjectId;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.JsonArray;
import jakarta.ws.rs.Produces;
// import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import oz.rest.models.Adopter;

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

        InsertOneResult res = adopters.insertOne(newEntry);

        ObjectId oid = res.getInsertedId().asObjectId().getValue();

        newEntry.setId(oid);

        return Response
                .status(Response.Status.OK)
                .entity(newEntry.toJson())
                .build();
    }

    @GET
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Successfully found user."),
            @APIResponse(responseCode = "400", description = "Invalid name or configuration."),
            @APIResponse(responseCode = "404", description = "User not found.")

    })
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response retrieve(@PathParam("id") String id) {
        ObjectId oid;

        try {
            oid = new ObjectId(id);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity("[\"Invalid object id!\"]")
                    .build();
        }

        MongoCollection<Adopter> adopters = db.getCollection("Adopters", Adopter.class);

        var adopter = adopters.find(eq("_id", oid)).first();

        if (adopter == null) {
            return Response.status(404).build();
        } else {
            return Response.ok(adopter.toJson()).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Successfully updated adopter."),
            @APIResponse(responseCode = "400", description = "Invalid configuration"),
            @APIResponse(responseCode = "404", description = "Adopter not found")
    })
    @Operation(summary = "Update info about an adopter")
    public Response update(Adopter updatedEntry,
            @Parameter(description = "Object id of the adopter to update.", required = true) @PathParam("id") String id) {
        ObjectId oid;

        try {
            oid = new ObjectId(id);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity("[\"Invalid object id!\"]")
                    .build();
        }

        JsonArray vio = getViolations(updatedEntry);

        if (!vio.isEmpty()) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(vio.toString())
                    .build();
        }
        MongoCollection<Adopter> adoptersCollection = db.getCollection("Adopters",
                Adopter.class);

        UpdateResult updateResult = adoptersCollection
                .replaceOne(eq("_id", oid), updatedEntry);

        if (updateResult.getMatchedCount() == 0) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .entity("[\"_id was not found!\"]")
                    .build();
        }

        updatedEntry.setId(oid);

        return Response
                .status(Response.Status.OK)
                .entity(updatedEntry.toJson())
                .build();
    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response remove(@PathParam("id") String id) {
        ObjectId oid;

        try {
            oid = new ObjectId(id);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity("[\"Invalid object id!\"]")
                    .build();
        }

        MongoCollection<Adopter> adopters = db.getCollection("Adopters",
                Adopter.class);

        var removedAdopter = adopters
                .findOneAndDelete(eq("_id", oid));

        if (removedAdopter == null) {
            return Response.status(400).build();
        } else {
            return Response.ok(removedAdopter.toJson()).build();
        }
    }

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Login method")
    @APIResponses({
            @APIResponse(responseCode = "400", description = "Login failed"),
            @APIResponse(responseCode = "200", description = "Login was successful") })
    public Response login(Adopter entry) {
        MongoCollection<Adopter> adopters = db.getCollection("Adopters",
                Adopter.class);

        // TODO: encrypt passwords at rest, java.security MessageDigest looks promising

        var record = adopters.find(and(eq("name", entry.getName()), eq("password", entry.getEmailAddress()))).first();

        if (record == null) {
            return Response.status(400).build();
        }

        return Response.ok(record.toJson()).build();
    }
}
