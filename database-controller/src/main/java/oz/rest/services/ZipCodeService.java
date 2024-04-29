package oz.rest.services;

import java.util.Set;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import jakarta.ws.rs.Consumes;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.FindIterable;
import java.io.IOException;
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
import oz.rest.models.Shelter;
import java.util.ArrayList;

@Tag(name = "Zip Code")
@Path("/zip_code")
@ApplicationScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
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
    public Response processZipCode(ZipCode newEntry) throws IOException{
        JsonArray violations = getViolations(newEntry);

        if (!violations.isEmpty()) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(violations.toString())
                    .build();
        }


        MongoCollection<Shelter> sheltersCollection = db.getCollection("Shelters",
                Shelter.class);

            
        FindIterable<Shelter> tempShelters = sheltersCollection.find();
        ArrayList<Shelter> shelters = new ArrayList<Shelter>();

        for(Shelter shelter : tempShelters){
            shelters.add(shelter);
        }


        float[] newCoords = GeoEncodingTest.getZipCodeCoords(newEntry.getZipCode());

        float[] distArr = new float[shelters.size()];

        
        int count = 0;
        for(Shelter shelter : shelters){
            float[] tempCoord = new float[2];
            tempCoord[0] = (float)Float.valueOf(shelter.getLatitude());
            tempCoord[1] = (float)Float.valueOf(shelter.getLongitude());
            distArr[count] = GeoEncodingTest.distance(tempCoord, newCoords);
        }

        //Sort

        int n = shelters.size();
        for (int i = 1; i < n; ++i) {
            float key = distArr[i];
            int j = i - 1;

            while (j >= 0 && distArr[j] > key) {
                shelters.set(j+1, shelters.get(j));
                j = j - 1;
            }
            shelters.set(j+1, shelters.get(i));
        }

        for(Shelter shelter : shelters){
            System.out.println(shelter.getName());
        }



        // REPLACE "T" WITH WHATEVER OBJECT U WANT TO RETURN TO THE USER AS JSON
        return Response.ok("T").build();
    }
}