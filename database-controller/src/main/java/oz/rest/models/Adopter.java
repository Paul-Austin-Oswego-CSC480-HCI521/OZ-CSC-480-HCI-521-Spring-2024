package oz.rest.models;

import jakarta.validation.constraints.Email;

public class Adopter {
    private String name;

    // TODO: implement location
    // private Location location;

    @Email
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

}
