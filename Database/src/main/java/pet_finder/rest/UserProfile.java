package pet_finder.rest;

import jakarta.validation.constraints.*;

public class UserProfile {

    @NotEmpty(message = "All users must have a name")
    private String name;

    private String location;

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getLocation(){
        return location;
    }

    public void setLocation(String location){
        this.location = location;
    }

}
