package oz.rest.services;

import java.util.Set;

import jakarta.validation.Validator;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.mongodb.client.MongoDatabase;

// import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.validation.ConstraintViolation;

// not completely sure, but I don't think this is applicationscoped
// @ApplicationScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public abstract class AbstractService<T> {
    @Inject
    protected MongoDatabase db;

    @Inject
    protected Validator validator;

    protected JsonArray getViolations(T data) {
        Set<ConstraintViolation<T>> violations = validator.validate(data);

        JsonArrayBuilder messages = Json.createArrayBuilder();

        for (ConstraintViolation<T> v : violations) {
            messages.add(v.getMessage());
        }

        return messages.build();
    }

    // TODO maybe: if there is a way to get generic T's class as
    // well as all of its getter methods, the following methods could
    // be implemented concretely here

    abstract public Response add(T newEntry);

    // abstract public Response retrieve(T entry);

    abstract public Response retrieve(String id);

    // abstract public Response update();

    abstract public Response remove(String id);
}
