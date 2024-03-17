package oz.rest;

import java.util.Map;

import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCredential;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Disposes;
import jakarta.enterprise.inject.Produces;
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
        var mongoCredential = MongoCredential.createCredential(username, "admin", password.toCharArray());
        var mongoSettingsBuilder = MongoClientSettings.builder();
        mongoSettingsBuilder.credential(mongoCredential);
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

        return mongoClient.getDatabase("PlaceholderAppName").withCodecRegistry(pojoCodecRegistry);
    }

    public void close(@Disposes MongoClient toClose) {
        toClose.close();
    }
}
