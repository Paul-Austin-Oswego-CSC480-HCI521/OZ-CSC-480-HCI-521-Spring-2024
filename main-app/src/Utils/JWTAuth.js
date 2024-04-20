import { getCookie } from './CookieUtils';

export async function checkJWT() {
    // Retrieve the ID of the Shelter that is logged in and the JWT associated with the shelter
    var shelterID = getCookie("shelterID");
    var jwt = getCookie("JWT");

    // Make a call to the backend that includes the Shelter ID and the Shelter's JWT
    const response = await fetch("http://localhost:9080/database-controller/api/shelter/auth?id=" + shelterID + "&jwt=" + jwt, {
        method: "GET",
    })
        .catch(error => {
            console.error('Error:', error);
        });

    return response;
}