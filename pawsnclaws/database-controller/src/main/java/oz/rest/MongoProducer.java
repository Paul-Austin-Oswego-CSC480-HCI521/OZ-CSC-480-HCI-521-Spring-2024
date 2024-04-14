package oz.rest;

import java.util.Map;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.IndexOptions;
import org.bson.Document;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Disposes;
import jakarta.enterprise.inject.Produces;
import oz.rest.models.Adopter;
import oz.rest.models.Shelter;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;
import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;

@ApplicationScoped
public class MongoProducer {
    @Produces
    public MongoClient createMongoClient() {
        Map<String, String> env = System.getenv();
        String username = env.get("MONGO_INITDB_ROOT_USERNAME");
        String password = env.get("MONGO_INITDB_ROOT_PASSWORD");
        var mongoSettingsBuilder = MongoClientSettings.builder();
        var connectionString = new ConnectionString("mongodb://" + username + ":" + password + "@mongo:27017");
        mongoSettingsBuilder.applyConnectionString(connectionString);
        var mongoClientSettings = mongoSettingsBuilder.build();

        var mongoClient = MongoClients.create(mongoClientSettings);

        return mongoClient;
    }

    @Produces
    public MongoDatabase createDB(MongoClient mongoClient) {
        // allows us to use POJO, inserting objects directly instead of manually
        CodecProvider pojoCodecProvider = fromProviders(PojoCodecProvider.builder().automatic(true).build());
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        MongoDatabase database = mongoClient.getDatabase("PlaceholderAppName").withCodecRegistry(pojoCodecRegistry);

        // on creating a new db, we would run an initializer
        initializeCollections(database);

        return database;
    }

    private void initializeCollections(MongoDatabase database) {
        createUniqueEmailAdopter(database.getCollection("Adopters", Adopter.class));
        createUniqueEmailShelter(database.getCollection("Shelters", Shelter.class));
    }

    private void createUniqueEmailAdopter(MongoCollection<Adopter> adopterCollection) {
        IndexOptions indexOptions = new IndexOptions().unique(true);
        adopterCollection.createIndex(new Document("emailAddress", 1), indexOptions);
    }

    private void createUniqueEmailShelter(MongoCollection<Shelter> shelterCollection) {
        IndexOptions indexOptions = new IndexOptions().unique(true);
        shelterCollection.createIndex(new Document("emailAddress", 1), indexOptions);
    }

    public void close(@Disposes MongoClient toClose) {
        toClose.close();
    }
}