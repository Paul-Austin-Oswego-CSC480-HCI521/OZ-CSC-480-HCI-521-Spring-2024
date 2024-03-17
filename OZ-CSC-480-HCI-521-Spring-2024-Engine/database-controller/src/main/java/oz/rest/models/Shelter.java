package oz.rest.models;

import java.util.ArrayList;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;

// import org.bson.codecs.pojo.annotations.BsonProperty;
import jakarta.validation.constraints.NotEmpty;
// import jakarta.validation.constraints.Pattern;

public class Shelter extends AbstractModel {
    // SRS says name as primary key, but should probably be email
    @NotEmpty(message = "Shelter name must not be empty")
    @BsonId()
    private String name;

    @NotEmpty(message = "Password must not be left empty")
    private String password;

    // TODO: Implement location
    // private String location;

    // TODO: this should almost definitely store strings instead of entire
    // pet records
    @BsonProperty("available_pets")
    private ArrayList<Pet> availablePets;

    // TODO: idk how to insert the regex that is in the SRS
    // @Pattern(regexp = "")
    // @BsonProperty("phone_number")
    // private String phoneNumber;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ArrayList<Pet> getAvailablePets() {
        return availablePets;
    }

    public void setAvailablePets(ArrayList<Pet> availablePets) {
        this.availablePets = availablePets;
    }

    //TODO - Add the method to update available pets
    public void addAvailablePets(ArrayList<Pet> newPets){
        this.availablePets.addAll(newPets);
    }

    public void removeAvailablePets(Pet toRemove){
        this.availablePets.remove(toRemove);
    }
}
