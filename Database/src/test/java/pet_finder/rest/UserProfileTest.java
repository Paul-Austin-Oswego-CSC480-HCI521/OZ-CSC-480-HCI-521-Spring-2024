package pet_finder.rest;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserProfileTest {

    @Test
    public void testGetName() {
        UserProfile userProfile = new UserProfile();
        userProfile.setName("John Doe");
        assertEquals("John Doe", userProfile.getName());
    }

    @Test
    public void testGetLocation() {
        UserProfile userProfile = new UserProfile();
        userProfile.setLocation("New York");
        assertEquals("New York", userProfile.getLocation());
    }

    @Test
    public void testSetName() {
        UserProfile userProfile = new UserProfile();
        userProfile.setName("Jane Smith");
        assertEquals("Jane Smith", userProfile.getName());
    }

    @Test
    public void testSetLocation() {
        UserProfile userProfile = new UserProfile();
        userProfile.setLocation("Los Angeles");
        assertEquals("Los Angeles", userProfile.getLocation());
    }

    // Add more tests as needed

}