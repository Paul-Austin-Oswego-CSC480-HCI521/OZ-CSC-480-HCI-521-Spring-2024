package oz.rest.models;

import jakarta.validation.constraints.NotEmpty;
// import jakarta.validation.constraints.Pattern;

public class Shelter {
    @NotEmpty
    private String name;

    // TODO: Implement location as such
    // private String location;

    // private Pet[] availablePets;

    // TODO: idk how to insert the regex that is in the SRS
    // @Pattern(regexp = "")
    // private String phoneNumber;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
