package pet_finder.rest.util;

import jakarta.faces.context.FacesContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import jakarta.faces.context.ExternalContext;
import java.lang.reflect.Method;

public class SessionUtilsTest {

    private HttpSession session;
    private HttpServletRequest request;

    @BeforeEach
    public void setUp() {
        session = mock(HttpSession.class);
        request = mock(HttpServletRequest.class);
        FacesContext facesContext = mock(FacesContext.class);
        ExternalContext externalContext = mock(ExternalContext.class);
        when(facesContext.getExternalContext()).thenReturn(externalContext); // Remove the cast
        when(facesContext.getExternalContext().getSession(false)).thenReturn(session);
        when(facesContext.getExternalContext().getRequest()).thenReturn(request);
        
        try {
            Method setCurrentInstanceMethod = FacesContext.class.getDeclaredMethod("setCurrentInstance", FacesContext.class);
            setCurrentInstanceMethod.setAccessible(true);
            setCurrentInstanceMethod.invoke(null, facesContext);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testGetSession() {
        HttpSession result = SessionUtils.getSession();
        assertEquals(session, result);
    }

    @Test
    public void testGetRequest() {
        HttpServletRequest result = SessionUtils.getRequest();
        assertEquals(request, result);
    }

    @Test
    public void testGetJwtToken() {
        String jwtToken = "dummyToken";
        when(session.getAttribute("jwt")).thenReturn(jwtToken);
        String result = SessionUtils.getJwtToken();
        assertEquals(jwtToken, result);
    }
}