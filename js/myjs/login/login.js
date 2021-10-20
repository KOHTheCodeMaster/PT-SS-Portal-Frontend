//  document is the root element of all the objects model for every html page
//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    // console.log("Test - Time Stamp: " + new Date());

    if (JSON.parse(localStorage.getItem('user')) !== null)
        window.location.href = '/PT-SS-Portal-Frontend/dashboard.html';

    // testAlreadyLoggedIn();

});

function testAlreadyLoggedIn() {

/*
    //  Initialize Current Authenticated User
    let currentUser = JSON.parse(localStorage.getItem('user'));

    //  When currentUser doesn't exists, then Redirect to dashboard.html
    if (currentUser !== null) {
        console.log('Redirecting to Dashboard Page.');
        // console.log(window.location.pathname);   //  Current page relative url
        window.location.href = '/PT-SS-Portal-Frontend/dashboard.html';
    }
*/

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

    //  Skip Login on connection failure.
    if (await testConnectionFailure()) {

        // Display Network Connection Failure popup
        $('#failure-modal').modal('show');
        //  Enable Submit btn. after form submit response received
        enableBtn('#login-input-submit', 'Sign In');

        return;
    }

    //  Authenticate User
    let isLoginSuccessful = await authenticateUser(emailId, password);

    if (isLoginSuccessful) {

        //  Fetch user details json
        let userJson = await fetchJsonFromUrl("http://localhost:8066/user/" + emailId);

        // console.log('Logging in userJson - ' + userJson);
        // console.log('Logging in JSON.stringify(userJson) - ' + JSON.stringify(userJson));
        // console.log('Logging in JSON.parse(userJson) - ' + JSON.parse(userJson));

        //  Set userJson in localStorage for dashboard.js
        localStorage.setItem('user', userJson);

        // await sleepNow(500000);

        //  Submit Form and to navigate user to dashboard
        $('#login-form').submit();
        return;

    }

    // console.log('invalid Credentials.');
    $('#invalid-credentials-modal').modal('show');

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
