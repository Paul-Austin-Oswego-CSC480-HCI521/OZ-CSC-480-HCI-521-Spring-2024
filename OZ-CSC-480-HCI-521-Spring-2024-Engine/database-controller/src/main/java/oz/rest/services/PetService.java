package oz.rest.services;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.JsonArray;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import oz.rest.models.Pet;
import oz.rest.models.Shelter;

import com.mongodb.client.MongoCollection;

@Tag(name = "Pets")
@Path("/pet")
@ApplicationScoped
public class PetService extends AbstractService<Pet> {
    @Override
    @POST
    @APIResponses({
            @APIResponse(responseCode = "400", description = "The request was invalid"),
            @APIResponse(responseCode = "200", description = "Successfully added new pet") })
    @Operation(summary = "Add a new pet to the database")
    public Response add(Pet newEntry) {
        JsonArray violations = getViolations(newEntry);

        if (!violations.isEmpty()) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(violations.toString())
                    .build();
        }

        MongoCollection<Pet> pets = db.getCollection("Pets",
                Pet.class);

        pets.insertOne(newEntry);

        return Response
                .status(Response.Status.OK)
                .entity(newEntry.toJson())
                .build();
    }

    @Override
    @GET
    public Response retrieve(Pet entry) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'read'");
    }

    @Override
    @DELETE
    //Removes a pet specific shelter
    public Response remove(Pet entry) {
        MongoCollection<Shelter> shelters = db.getCollection("Shelters",
        Shelter.class);

        
         
    }

    @PUT
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
    @Operation("Update a pet in a shelter")
    public Response updatePet(Pet pet,
        @Parameter(
            description = "Name of the shelter the pet is in",
            required = true
        )){
            JsonArray violations = getViolations(pet);
        }

    }
