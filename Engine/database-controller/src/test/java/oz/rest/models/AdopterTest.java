package oz.rest.models;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

public class AdopterTest {

    private final ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
    private final Validator validator = validatorFactory.getValidator();

    @Test
    public void testGetName() {
        Adopter adopter = new Adopter();
        adopter.setName("John Doe");
        assertEquals("John Doe", adopter.getName());
    }

    @Test
    public void testGetEmailAddress() {
        Adopter adopter = new Adopter();
        adopter.setEmailAddress("john.doe@example.com");
        assertEquals("john.doe@example.com", adopter.getEmailAddress());
    }

    @Test
    public void testEmailAddressValidation() {
        Adopter adopter = new Adopter();
        adopter.setEmailAddress("invalid_email");
        assertFalse(validator.validateProperty(adopter, "emailAddress").isEmpty());
    }
}