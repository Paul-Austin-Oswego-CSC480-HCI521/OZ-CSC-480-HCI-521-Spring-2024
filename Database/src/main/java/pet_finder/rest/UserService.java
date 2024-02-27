package pet_finder.rest;

import java.util.Set;

import java.io.StringWriter;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.Json;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import jakarta.validation.Validator;
import jakarta.validation.ConstraintViolation;

import com.mongodb.client.FindIterable;
// tag::bsonDocument[]
import org.bson.Document;
// end::bsonDocument[]
import org.bson.types.ObjectId;

// tag::mongoImports1[]
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
// end::mongoImports1[]
// tag::mongoImports2[]
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
// end::mongoImports2[]

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;

@Path("/users")
@ApplicationScoped
public class UserService {
    @Inject
    MongoDatabase db;

    @Inject
    Validator validator;

    private JsonArray getViolations(UserProfile user){
        Set<ConstraintViolation<UserProfile>> violations = validator.validate(user);

        JsonArrayBuilder messages = Json.createArrayBuilder();

        for(ConstraintViolation<UserProfile> v : violations){
            messages.add(v.getMessage());
        }

        return messages.build();
    }

    @PUT
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @APIResponses({
        @APIResponse(
            responseCode = "200",
            description = "Successfully created new user."),
        @APIResponse(
            responseCode = "400",
            description = "Invalid name config") })
    @Operation(summary = "Add a new user to the database.")

    public Response add(UserProfile user){
        JsonArray vio = getViolations(user);

        if(!vio.isEmpty()){
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(vio.toString())
                    .build();
        }

        MongoCollection<Document> userProfiles = db.getCollection("Users");

        Document newUser = new Document();
        newUser.put("Name", user.getName());
        newUser.put("Location", user.getLocation());

        userProfiles.insertOne(newUser);

        return Response
        .status(Response.Status.OK)
        .entity(newUser.toJson())
        .build();
    }

}
