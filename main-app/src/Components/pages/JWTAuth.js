export class JWTAuth
{
    constructor()
    {
        // No need for a Constructor in this Class
    }

    // Function to retrieve a specific cookie
    getCookie(cname) 
    {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');

        for(var i = 0; i <ca.length; i++) 
        {
            var c = ca[i];

            while (c.charAt(0) == ' ') 
            {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) 
            {
                return c.substring(name.length, c.length);
            }
        }

        return "";
    }

    async checkJWT()
    {
        // Retrieve the current user that is logged in and the cookies associated with them
        var currentUser = this.getCookie("currentUser");
        var currentUserJWT = this.getCookie(currentUser + "JWT");
        var currentUserID = this.getCookie(currentUser + "ID");
    
        // Make a call to the backend that includes the current user, their JWT, and their Shelter ID
        const response = await fetch("http://localhost:9080/database-controller/api/shelter/auth?jwt=" + currentUserJWT + "&user=" + currentUser + "&userID=" + currentUserID, {
        method: "GET",
        })
        .catch(error => 
        {
            console.error('Error:', error);
        });

        return response;
    }
}