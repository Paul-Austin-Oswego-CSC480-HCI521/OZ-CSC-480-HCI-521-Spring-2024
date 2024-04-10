package oz.rest.models;

import org.bson.codecs.pojo.annotations.BsonProperty;

import jakarta.json.bind.annotation.JsonbAnnotation;
import jakarta.json.bind.annotation.JsonbCreator;
import jakarta.json.bind.annotation.JsonbProperty;
import jakarta.validation.constraints.Email;

public class Adopter extends AbstractModel {
    // @JsonbCreator
    // public Adopter(@JsonbProperty("name") String name,
    // @JsonbProperty("emailAddress") String emailAddress) {
    // this.name = name;
    // this.emailAddress = emailAddress;
    // }

    private String username;

    private String name;

    // TODO: implement location
    // private Location location;

    @Email
    @BsonProperty("email_address")
    private String emailAddress;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    // public void setLocation(String location){
    // //Turn the string into geographical location

    // //Set the new location
    // }

    // public Location getLocation(){
    // return location
    // }
}
