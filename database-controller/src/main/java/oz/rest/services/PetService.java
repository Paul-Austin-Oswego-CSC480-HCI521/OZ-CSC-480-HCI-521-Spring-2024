package oz.rest.services;

import org.bson.types.ObjectId;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

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
import oz.rest.models.Shelter;
import static com.mongodb.client.model.Filters.eq;
// import static com.mongodb.client.model.Filters.and;

import oz.rest.models.Pet;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;

@Tag(name = "Pets")
@Path("/pet")
@ApplicationScoped
public class PetService extends AbstractService<Pet> {
    @Override
    @POST
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Successfully added new pet"),
            @APIResponse(responseCode = "400", description = "The request was invalid"),
            @APIResponse(responseCode = "404", description = "Pet not found")
    })
    @Operation(summary = "Add a new pet to the database")
    public Response add(Pet newEntry) {
        JsonArray violations = getViolations(newEntry);

        if (!violations.isEmpty()) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(violations.toString())
                    .build();
        }

        MongoCollection<Pet> petCollection = db.getCollection("Pets",
                Pet.class);

        InsertOneResult res = petCollection.insertOne(newEntry);

        ObjectId oid = res.getInsertedId().asObjectId().getValue();

        newEntry.setId(oid);

        return Response
                .status(Response.Status.OK)
                .entity(newEntry.toJson())
                .build();
    }

    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
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

        MongoCollection<Pet> pets = db.getCollection("Pets", Pet.class);
        var pet = pets.find(eq("_id", oid)).first();

        if (pet == null) {
            return Response.status(404).build();
        }

        return Response.ok(pet.toJson()).build();
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Successfully updated shelter."),
            @APIResponse(responseCode = "400", description = "Invalid name or configuration"),
            @APIResponse(responseCode = "404", description = "Shelter not found")
    })
    @Operation(summary = "Update a pet")
    public Response update(Pet updatedEntry,
            @Parameter(description = "Object id of the pet to update.", required = true) @PathParam("id") String id) {
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
        MongoCollection<Pet> petsCollection = db.getCollection("Pets",
                Pet.class);

        UpdateResult updateResult = petsCollection
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

    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    @DELETE
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

        MongoCollection<Shelter> petCollection = db.getCollection("Pets",
                Shelter.class);

        var removedPet = petCollection.findOneAndDelete(eq("_id", oid));
        if (removedPet == null) {
            return Response.status(404).build();
        }

        removedPet.setId(oid);

        return Response.ok(removedPet.toJson()).build();
    }
}
