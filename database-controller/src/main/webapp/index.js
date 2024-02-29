// document.getElementById("loginForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Get form data
//     const formData = new FormData(event.target);

//     // Create JSON object
//     const jsonObject = {};
//     formData.forEach((value, key) => {
//         jsonObject[key] = value;
//     });

//     // console.log('JSON Object ', jsonObject)

//     // Convert JSON to Blob
//     // const jsonBlob = new Blob([JSON.stringify(jsonObject, null, 2)], { type: "application/json" });

//     // Create a link element
//     // const downloadLink = document.createElement("a");
//     // downloadLink.href = URL.createObjectURL(jsonBlob);
//     // downloadLink.download = "data.json";

//     // // Append the link to the body
//     // document.body.appendChild(downloadLink);

//     // // Programmatically click the link to trigger the download
//     // downloadLink.click();

//     // // Clean up
//     // URL.revokeObjectURL(downloadLink.href);
//     // document.body.removeChild(downloadLink);
// });

// ^^^ Downloaded json file to test the functionality of json object and json file

// Need URL to post the data to backend 

// vvv

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(event.target);

    // Create JSON object
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    // Send JSON object to backend 
    fetch("http://localhost:9080/database-controller/api/shelter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObject)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Handle response from backend
    })
    .catch(error => {
        console.error('Error:', error);
    });
});