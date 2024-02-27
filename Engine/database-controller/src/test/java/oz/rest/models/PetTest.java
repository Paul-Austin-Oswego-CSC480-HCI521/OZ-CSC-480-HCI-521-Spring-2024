package oz.rest.models;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

public class PetTest {

    private final ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
    private final Validator validator = validatorFactory.getValidator();

    @Test
    public void testSetName() {
        Pet pet = new Pet();
        pet.setName("Max");
        assertEquals("Max", pet.getName());
    }

    @Test
    public void testSetPetType() {
        Pet pet = new Pet();
        pet.setPetType("Dog");
        assertEquals("Dog", pet.getPetType());
    }

    @Test
    public void testSetAge() {
        Pet pet = new Pet();
        pet.setAge(3);
        assertEquals(3, pet.getAge());
    }

    @Test
    public void testValidation() {
        Pet pet = new Pet();
        pet.setName("");
        pet.setPetType("InvalidType");
        pet.setAge(-1);

        var violations = validator.validate(pet);
        assertEquals(3, violations.size());
    }
}