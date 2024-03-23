package oz.rest.models;

import org.bson.codecs.pojo.annotations.BsonProperty;

import jakarta.validation.constraints.Email;

public class Adopter extends AbstractModel {
    private String name;

    // TODO: implement location
    // private Location location;

    @Email
    @BsonProperty("email_address")
    private String emailAddress;

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
