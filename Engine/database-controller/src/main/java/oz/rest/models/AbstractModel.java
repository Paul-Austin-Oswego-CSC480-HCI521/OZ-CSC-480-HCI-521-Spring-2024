package oz.rest.models;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;

public class AbstractModel {
    final private Jsonb jsonbBuilder = JsonbBuilder.create();

    public String toJson() {
        return jsonbBuilder.toJson(this);
    }
}
