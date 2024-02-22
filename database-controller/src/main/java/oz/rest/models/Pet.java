package oz.rest.models;

import jakarta.validation.constraints.NotEmpty;

public class Pet {
    @NotEmpty
    private String name;

    // TODO: embed JPEGs
    // private JPEG[] petPhotos;

    // private Shelter currentShelter;

    // // possibly use an enum instead of string?
    // private String petType;

    // private String breed;

    // private String color;

    // private String health;

    // private Integer age;

    // private String sex;

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

    // public Shelter getCurrenShelter() {
    // return currentShelter;
    // }

    // public void setCurrentShelter(Shelter currentShelter) {
    // this.currentShelter = currentShelter;
    // }

    // public String getPetType() {
    // return petType;
    // }

    // public void setPetType(String petType) {
    // this.petType = petType;
    // }

    // public String getBreed() {
    // return breed;
    // }

    // public void setBreed(String breed) {
    // this.breed = breed;
    // }

    // public String getColor() {
    // return color;
    // }

    // public void setColor(String color) {
    // this.color = color;
    // }

    // public String getHealth() {
    // return health;
    // }

    // public void setHealth(String health) {
    // this.health = health;
    // }

    // public Integer get_age() {
    // return age;
    // }

    // public void setAge(Integer age) {
    // this.age = age;
    // }

    // public String getSex() {
    // return sex;
    // }

    // public void setSex(String sex) {
    // this.sex = sex;
    // }

}
