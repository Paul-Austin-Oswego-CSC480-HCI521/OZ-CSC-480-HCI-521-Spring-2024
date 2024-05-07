document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(event.target);
    const email = formData.get("emailAddress")
    const password = formData.get("password")

    // Create JSON object
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    // Check to see if the user exists in the database
    const response = await fetch("http://localhost:9080/database-controller/api/shelter/login?" + new URLSearchParams(jsonObject), {
        // mode: "no-cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObject)
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // If the user does exist
    if(response.ok)
    {       
        const responseText = await response.text();

        // Extract both the JWT and the Shelter ID from the Response
        const jwt = responseText.substring(0, responseText.indexOf(":"));
        const shelter_id = responseText.substring(responseText.indexOf(":") + 1);

        // Calculate the expiration date of the JWT
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);

        // Create three cookies: One that represents the current user logged in, one that represents the current user's JWT, and one that represents the current user's ID
        document.cookie = "currentUser=" + email + "; expires=" + expirationDate + "; path=/";
        document.cookie = email + "JWT=" + jwt + "; expires=" + expirationDate + "; path=/";
        document.cookie = email + "ID=" + shelter_id + "; expires=" + expirationDate + "; path=/";
    
        // Redirect user to another page
        window.location.href = '/database-controller/success.html';
    }

    // If the user doesn't exist
    else
    {
        // Display an error message
        alert("***LOGIN FAILED***\nYou've entered an incorrect username and/or password. Please try again.")
    }
});