package oz.rest.models;

import java.util.ArrayList;

import org.bson.codecs.pojo.annotations.BsonCreator;
import org.bson.codecs.pojo.annotations.BsonProperty;

import jakarta.json.bind.annotation.JsonbCreator;
import jakarta.json.bind.annotation.JsonbProperty;
import jakarta.validation.constraints.NotEmpty;
// import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;

public class Pet extends AbstractModel {
    // @JsonbCreator
    // @BsonCreator
    // public Pet(@JsonbProperty("name") String name,
    // @JsonbProperty("current_shelter_id") String currentShelterId,
    // @JsonbProperty("petType") String petType,
    // @JsonbProperty("breed") String breed,
    // @JsonbProperty("color") String color,
    // @JsonbProperty("health") String health,
    // @JsonbProperty("age") Integer age,
    // @JsonbProperty("sex") String sex) {
    // this.name = name;
    // this.age = age;
    // this.currentShelterId = currentShelterId;
    // this.petType = petType;
    // this.breed = breed;
    // this.color = color;
    // this.health = health;
    // this.age = age;
    // this.sex = sex;
    // }

    @NotEmpty(message = "Pet name must not be empty")
    private String name;

    // TODO: embed JPEGs
    // private JPEG[] petPhotos;

    private String currentShelterId;

    private ArrayList<String> images;

    // @Pattern(regexp = "(Dog|Cat|Other)")
    private String type;

    private String breed;

    private String color;

    private String health;

    @PositiveOrZero(message = "Pet age must be at least 0")
    private Integer age;

    private String sex;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // // TODO: implement JPEGs
    // // public JPEG[] getPetPhotos() {
    // // return petPhotos;
    // // }

    public String getCurrentShelterId() {
        return currentShelterId;
    }

    public void setCurrentShelterId(String currentShelterId) {
        this.currentShelterId = currentShelterId;
    }

    public ArrayList<String> getImages() {
        return images;
    }

    public void setImages(ArrayList<String> images) {
        this.images = images;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getHealth() {
        return health;
    }

    public void setHealth(String health) {
        this.health = health;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

}
