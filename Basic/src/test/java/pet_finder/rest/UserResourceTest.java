package pet_finder.rest;

import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class UserResourceTest {

    @Test
    public void testGetResponse() {
        given()
            .when()
                .get("/user")
            .then()
                .statusCode(200)
                .body(equalTo("Anyone can see this!"));
    }
}