package oz.rest.services;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
// import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.JsonArray;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
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

import java.util.ArrayList;

import static com.mongodb.client.model.Filters.and;

// TODO: i think we need to make email address unique between adopter and shelters,
// so there can be a generic "login" page and then just navigate to whichever
// functionality they need, likely involves a generic "user" class and having adopteruser
// and shelteruser inherit from superclass; remember to deal with permissions in JWT etc
@Tag(name = "Shelters")
@Path("/shelter")
@ApplicationScoped
public class ShelterService extends AbstractService<Shelter> {
    // TODO: getting the collection is done for every service,
    // so it would be nice to have that moved into the AbstractService
    // as a field somehow, and initialized in each service
    @Override
    @POST
    @APIResponses({
            @APIResponse(responseCode = "400", description = "The request was invalid"),
            @APIResponse(responseCode = "200", description = "Successfully added new shelter")
    })
    @Operation(summary = "Add a new shelter to the database")
    public Response add(Shelter newEntry) {
        JsonArray violations = getViolations(newEntry);

        if (!violations.isEmpty()) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(violations.toString())
                    .build();
        }

        MongoCollection<Shelter> sheltersCollection = db.getCollection("Shelters",
                Shelter.class);

        InsertOneResult res = sheltersCollection.insertOne(newEntry);

        ObjectId oid = res.getInsertedId().asObjectId().getValue();

        newEntry.setId(oid);

        return Response
                .status(Response.Status.OK)
                .entity(newEntry.toJson())
                .build();
    }

    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    @Override
    @GET
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

        MongoCollection<Shelter> sheltersCollection = db.getCollection("Shelters",
                Shelter.class);

        var shelter = sheltersCollection.find(eq("_id", oid)).first();

        if (shelter == null) {
            return Response.status(400).build();
        } else {
            return Response.ok(shelter.toJson()).build();
        }
    }

    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response find(@QueryParam(value = "name") String name, @QueryParam(value = "limit") Integer limit) {
        MongoCollection<Shelter> sheltersCollection = db.getCollection("Shelters",
                Shelter.class);

        ArrayList<Bson> filters = new ArrayList<Bson>();
        if (name != null) {
            filters.add(eq("name", name));
        }

        // TODO: DECIDE HOW TO MANY ENTRIES A USER SHOULD BE ABLE TO RETRIEVE (set cap
        // on how large limit can be)
        if (limit == null) {
            limit = 1;
        }

        var foundShelters = (filters.size() != 0) ? sheltersCollection.find(and(filters)).limit(limit)
                : sheltersCollection.find().limit(limit);

        Jsonb jsonb = JsonbBuilder.create();

        var shelters = new ArrayList<Document>();
        for (Shelter foundShelter : foundShelters) {
            var doc = Document.parse(jsonb.toJson(foundShelter));
            doc.replace("id", foundShelter.getId().toString());
            shelters.add(doc);
        }

        if (shelters.size() == 0) {
            return Response.status(404).build();
        }

        return Response.ok(jsonb.toJson(shelters)).build();
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @APIResponses({ @APIResponse(responseCode = "200", description = "Successfully updated shelter."),
            @APIResponse(responseCode = "400", description = "Invalid name orconfiguration"),
            @APIResponse(responseCode = "404", description = "Shelter not found")
    })
    @Operation(summary = "Update info about a shelter")
    public Response update(Shelter updatedEntry,
            @Parameter(description = "Object id of the crew member to update.", required = true) @PathParam("id") String id) {
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
        MongoCollection<Shelter> shelters = db.getCollection("Shelters",
                Shelter.class);

        UpdateResult updateResult = shelters
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

    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    @DELETE
    @Override
    public Response remove(@PathParam(value = "id") String id) {
        ObjectId oid;

        try {
            oid = new ObjectId(id);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity("[\"Invalid object id!\"]")
                    .build();
        }

        MongoCollection<Shelter> sheltersCollection = db.getCollection("Shelters",
                Shelter.class);

        var removedShelter = sheltersCollection.findOneAndDelete(eq("_id", oid));

        if (removedShelter == null) {
            return Response.status(404).entity("Shelter ID not found...").build();
        } else {
            return Response.ok(removedShelter.toJson()).build();
        }
    }

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Login as a shelter user")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Login was successful"),
            @APIResponse(responseCode = "401", description = "Login failed")
    })
    public Response login(@QueryParam(value = "name") String name, @QueryParam(value = "password") String password) {
        MongoCollection<Shelter> sheltersCollection = db.getCollection("Shelters",
                Shelter.class);

        // TODO: encrypt passwords at rest, java.security MessageDigest looks promising

        var record = sheltersCollection.find(and(eq("name", name), eq("password", password))).first();

        if (record == null) {
            return Response.status(401).build();
        }

        return Response.ok(record.toJson()).build();
    }
}
