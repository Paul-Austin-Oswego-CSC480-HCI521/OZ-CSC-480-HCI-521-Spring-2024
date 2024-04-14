import { getCookie } from './CookieUtils';

export async function checkJWT() {
    // Retrieve the current user that is logged in and the cookies associated with them
    var currentUser = getCookie("currentUser");
    var currentUserJWT = getCookie(currentUser + "JWT");
    var currentUserID = getCookie(currentUser + "ID");

    // Make a call to the backend that includes the current user, their JWT, and their Shelter ID
    const response = await fetch("http://localhost:9080/database-controller/api/shelter/auth?jwt=" + currentUserJWT + "&user=" + currentUser + "&userID=" + currentUserID, {
        method: "GET",
    })
        .catch(error => {
            console.error('Error:', error);
        });

    return response;
}