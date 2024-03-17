package oz.rest;

import jakarta.inject.Inject;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import org.bson.Document;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Path("database")
public class Database {
    @Inject
    MongoDatabase mongoDB;

    @PUT
    @Produces(MediaType.TEXT_PLAIN)
    public Document insert() {
        MongoCollection<Document> shelterIdCollection = mongoDB.getCollection("IDs");
        Document doc = new Document();
        doc.put("test", "working");
        shelterIdCollection.insertOne(doc);

        return doc;
    }
}
