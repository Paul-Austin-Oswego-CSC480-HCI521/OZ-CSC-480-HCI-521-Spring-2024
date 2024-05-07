package oz.rest.models;

import org.bson.Document;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.persistence.Id;

public class AbstractModel {
    final private Jsonb jsonb = JsonbBuilder.create();

    @Id
    @BsonProperty("_id")
    @BsonId
    @Schema(readOnly = true)
    private ObjectId id;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String toJson() {
        // convert to json, but replace the "id" field with a string representation for
        // easier frontend use
        var doc = Document.parse(jsonb.toJson(this));
        doc.replace("id", id.toString());
        return doc.toJson();
    }

}
