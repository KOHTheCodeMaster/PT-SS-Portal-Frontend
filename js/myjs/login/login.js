//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    test();

});

function test() {
    console.log("Test - Time Stamp: " + new Date());
}

//  document is the root element of all the objects model for every html page
async function onSignIn() {

    //  Fetch emailId & password from the input form
    let emailId = document.getElementById("emailId").value;
    let password = document.getElementById("password").value;
    // console.log("User Name: " + emailId);
    // console.log("Password: " + password);

    // await demoGetRESTCall();

    //  Authenticate User
    let isLoginSuccessful = await authenticateUser(emailId, password);

    if (isLoginSuccessful) {
        console.log("Login Successful!");
        window.location = 'http://localhost:63342/PT%20XYZ/dashboard.html';
    }
    else console.log("Login Failed...");

}

async function authenticateUser(emailId, password) {

    let userDTOJson = {'emailId': emailId, 'password': password};
    let url = 'http://localhost:8066/login';
    let body = JSON.stringify(userDTOJson);

    //  The response of this POST request to /login is a plain-text boolean value
    return await reqPostCall(url, body);

}

/**
 * Invoke POST Method REST API Call to the given url with the given body
 * @param url   url for the post request
 * @param body  json object containing data for the post body
 * @returns {Promise<Response>} Json response from the server
 */
async function reqPostCall(url, body) {

    return await fetch(url, {
        method: 'POST',
        body: body,
        headers: {'Content-Type': 'application/json'}
    }).then(function (response) {

        // The API call was successful!
        if (response.ok) return response.json();

        //  Reject in case of failed response
        return Promise.reject(response);

    }).then(function (data) {

        // This is the JSON from our response
        return data;

    }).catch(function (err) {

        // There was an error
        console.warn('Something went wrong.', err);

    });

}

//  Unused Methods
//  --------------

async function demoGetRESTCall() {

    // let url = 'https://jsonplaceholder.typicode.com/todos/1';
    let url = 'http://localhost:8066/user/rudys@sermanisteel.co.id';
    let json = await fetchJsonFromUrl(url);

    console.log("Response: " + json);

}

async function fetchJsonFromUrl(url) {

    return await fetch(url)
        .then(response => response.json())

}
