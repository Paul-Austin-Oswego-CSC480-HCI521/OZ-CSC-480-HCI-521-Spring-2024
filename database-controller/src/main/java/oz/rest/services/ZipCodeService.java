package oz.rest.services;

import java.util.Set;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import com.mongodb.client.MongoDatabase;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import oz.rest.models.ZipCode;

@Tag(name = "Zip Code")
@Path("/zip_code")
@ApplicationScoped
public class ZipCodeService {
    @Inject
    protected MongoDatabase db;

    @Inject
    protected Validator validator;

    protected JsonArray getViolations(ZipCode data) {
        Set<ConstraintViolation<ZipCode>> violations = validator.validate(data);

        JsonArrayBuilder messages = Json.createArrayBuilder();

        for (ConstraintViolation<ZipCode> v : violations) {
            messages.add(v.getMessage());
        }

        return messages.build();
    }

    // THIS IS THE ENDPOINT U HAVE TO EDIT
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response processZipCode(ZipCode newEntry) {
        JsonArray violations = getViolations(newEntry);

        if (!violations.isEmpty()) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(violations.toString())
                    .build();
        }

        
        return Response.ok("T").build();
    }


}