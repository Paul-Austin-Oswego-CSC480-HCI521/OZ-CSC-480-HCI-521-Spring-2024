package oz.rest;

import java.util.Set;

import org.bson.Document;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.Json;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import oz.rest.models.Pet;
import jakarta.validation.Validator;
import jakarta.validation.ConstraintViolation;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Path("/dbTest")
@ApplicationScoped
public class crudTest {

    @Inject
    MongoDatabase db;

    @Inject
    Validator validator;

    private JsonArray getViolations(Pet pet) {
        Set<ConstraintViolation<Pet>> violations = validator.validate(pet);

        JsonArrayBuilder messages = Json.createArrayBuilder();

        for (ConstraintViolation<Pet> v : violations) {
            messages.add(v.getMessage());
        }

        return messages.build();
    }

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @APIResponses({
            @APIResponse(responseCode = "400", description = "The request was invalid"),
            @APIResponse(responseCode = "200", description = "Successfully added new pet") })
    @Operation(summary = "Add a new pet to the database")
    public Response add(Pet pet) {
        JsonArray violations = getViolations(pet);

        if (!violations.isEmpty()) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(violations.toString())
                    .build();
        }

        MongoCollection<Document> pets = db.getCollection("Pets");

        Document newPet = new Document();
        newPet.put("name", pet.getName());
        // newPet.put("petPhotos", pet.getPetPhotos());
        newPet.put("petType", pet.getPetType());
        newPet.put("breed", pet.getBreed());
        newPet.put("color", pet.getColor());
        newPet.put("health", pet.getHealth());
        newPet.put("age", pet.getAge());
        newPet.put("sex", pet.getSex());

        pets.insertOne(newPet);

        return Response
                .status(Response.Status.OK)
                .entity(newPet.toJson())
                .build();
    }

}
