document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(event.target);
    const username = formData.get("name")
    const password = formData.get("password")

    // Create JSON object from form data
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    // Check to see if the user exists in the database
    const response = await fetch("http://localhost:9080/database-controller/api/shelter/login?name=" + username + "&password=" + password, {
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
        // Retrieve the JWT from the Response
        const jwt = await response.text();

        // Calculate the expiration date of the JWT
        const jwtExpirationDate = new Date();
        jwtExpirationDate.setDate(jwtExpirationDate.getDate() + 1);

        // Create two cookies: One that represents the current user logged in and one that represents the current user's JWT
        document.cookie = "currentUser=" + username + "; expires=" + jwtExpirationDate + "; path=/";
        document.cookie = username + "=" + jwt + "; expires=" + jwtExpirationDate + "; path=/";
    
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