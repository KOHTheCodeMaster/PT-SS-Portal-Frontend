
function isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user')) === null;
}

function redirectToRelativeUrl(relativeUrl) {

    console.log('Redirecting to URL - ' + relativeUrl);
    window.location.href = relativeUrl;    //  Parent relative url
    // console.log(window.location.pathname);   //  Current page relative url

    // window.location.href = '/PT-SS-Portal-Frontend/login.html';    //  Parent relative url

}
