package oz.rest.models;

import org.eclipse.microprofile.openapi.annotations.media.Schema;

import jakarta.validation.constraints.Email;
// import org.bson.codecs.pojo.annotations.BsonProperty;
import jakarta.validation.constraints.NotEmpty;

public class Shelter extends AbstractModel {
    // SRS says name as primary key, but should probably be email
    @NotEmpty(message = "Shelter name must not be empty")
    // can't figure out how to make unique fields....
    // @Column(name = "name", unique = true)
    private String name;

    @NotEmpty(message = "Password must not be left empty")
    @Schema(writeOnly = true)
    private String password;

    // TODO: Implement location
    // private String location;

    // @BsonProperty("available_pet_ids")
    // private Set<String> availablePetIds;

    // TODO: idk how to insert the regex that is in the SRS
    // @Pattern(regexp = "")
    // @BsonProperty("phone_number")
    // private String phoneNumber;

    private String description;

    @Email
    @NotEmpty(message = "Email address must not be empty")
    private String emailAddress;

    private String phoneNumber;

    private String city;
    private String state;
    private String zipcode;

    // public String getUsername() {
    // return username;
    // }

    // public void setUsername(String username) {
    // this.username = username;
    // }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // public Set<String> getAvailablePetIds() {
    // return availablePetIds;
    // }

    // public void setAvailablePetIds(Set<String> availablePetIds) {
    // this.availablePetIds = availablePetIds;
    // }

    // public void addAvailablePetId(String newPetIds) {
    // this.availablePetIds.add(newPetIds);
    // }

    // public void removeAvailablePetId(String toRemove) {
    // this.availablePetIds.remove(toRemove);
    // }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    // likely not needed, i think we always add pets one at a time rather than in
    // bulk

    // public void addAvailablePetIds(ArrayList<String> newPetIds) {
    // this.availablePetIds.addAll(newPetIds);
    // }

    // public void removeAvailablePetIds(ArrayList<String> toRemove) {
    // this.availablePetIds.removeAll(toRemove);
    // }
}
