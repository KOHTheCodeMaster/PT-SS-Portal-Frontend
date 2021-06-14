//  document is the root element of all the objects model for every html page
//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    test();

});

function test() {
    console.log("Test - Time Stamp: " + new Date());
}

async function onSignIn() {

    //  Fetch emailId & password from the input form
    let emailId = document.getElementById("emailId").value;
    let password = document.getElementById("password").value;
    // console.log("User Name: " + emailId);
    // console.log("Password: " + password);

    //  Skip Login if form fails to pass empty validation
    if (!emptyValidationListOfElements([$('#emailId'), $('#password')])) {
        // console.log('Empty Form');
        return;
    }

    //  Disable Submit btn. to prevent multiple clicks
    disableBtn('#login-input-submit', 'Signing In');

    //  Authenticate User
    let isLoginSuccessful = await authenticateUser(emailId, password);

    if (isLoginSuccessful) {
        console.log("Login Successful!");

        let userJson = await fetchJsonFromUrl("http://localhost:8066/user/" + emailId);

        //  Enable Submit btn. after form submit response received
        enableBtn('#login-input-submit', 'Sign In');

        //  Set userJson in localStorage for dashboard.js
        localStorage.setItem('user', JSON.stringify(userJson));
        // window.location = 'http://localhost:63342/PT%20XYZ/dashboard.html';
        $('#login-form').submit();

    } else console.log("Login Failed...");

    //  Enable Submit btn. after form submit response received
    enableBtn('#login-input-submit', 'Sign In');


}

async function authenticateUser(emailId, password) {

    let userDTOJson = {'emailId': emailId, 'password': password};
    let url = 'http://localhost:8066/login';
    let body = JSON.stringify(userDTOJson);

    //  The response of this POST request to /login is a plain-text boolean value
    let strResponse = 'false';
    await reqPostCall(url, body).then(value => strResponse = value);

    console.log("Response: " + strResponse);

    await sleepNow(200);
    return strResponse === 'true';

}

async function sleepNow(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//  Unused Method for testing purpose.
//  Wait on form submit btn. click, wait for any task & then explicitly submit the form
async function onFormSubmitAndWait(strFormId) {

    console.log('submit clicked.');

    console.log('1');
    await sleepNow(200);
    console.log('2');

    $(strFormId).submit();
    console.log('form submitted.');
    return false;
}
