package oz.rest.models;

import org.bson.codecs.pojo.annotations.BsonProperty;

import jakarta.validation.constraints.NotEmpty;
// import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;

public class Pet extends AbstractModel {
    @NotEmpty(message = "Pet name must not be empty")
    private String name;

    // TODO: embed JPEGs
    // private JPEG[] petPhotos;

    private String currentShelterId;

    // @Pattern(regexp = "(Dog|Cat|Other)")
    @BsonProperty("pet_type")
    private String petType;

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

    public String getPetType() {
        return petType;
    }

    public void setPetType(String petType) {
        this.petType = petType;
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
