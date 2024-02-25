package oz.rest.services;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import com.mongodb.client.MongoCollection;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.JsonArray;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import oz.rest.models.Adopter;

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

    @Override
    @GET
    public Response retrieve(Adopter entry) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'read'");
    }

    // @Override
    // public Response update() {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method 'update'");
    // }

    @Override
    @DELETE
    public Response remove(Adopter entry) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }
}
