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
        const responseTxt = await response.text();
        
        // const sessionCookie = responseTxt.substring(responseTxt.indexOf("Session Cookie: ") + 16, responseTxt.indexOf(", JWT: "));
        const jwt = responseTxt.substring(responseTxt.indexOf(", JWT: ") + 6);
        // console.log(jwt);

        document.cookie = "username=John Doe; expires=Thu, 18 Dec 2033 12:00:00 UTC; path=/";
        document.cookie = "user=" + username + "; jwt=" + jwt + "; expires=Thu, 18 Dec 2033 12:00:00 UTC; path=/";
        console.log(document.cookie.split(';'));
    
        // window.location.href = '/database-controller/success.html';
    }

    // If the user doesn't exist
    else
    {
        // Display an error message
        alert("***LOGIN FAILED***\n You've entered an incorrect username and/or password. Please try again.")
    }
});