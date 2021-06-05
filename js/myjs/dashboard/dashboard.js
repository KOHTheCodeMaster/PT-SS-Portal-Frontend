let currentUser;

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    //  Unable to load Current User from localStorage due to pre-loader-box

    test();
    init();

});

function init() {

    //  Initialize Current Authenticated User
    currentUser = localStorage.getItem('user');

    //  Update User details on Dashboard
    updateUserDetails();

}

function updateUserDetails() {

    console.log("Update User Details on Dashboard");
    document.querySelector('.user-full-name').textContent = currentUser.name;
    document.querySelector('.user-first-name').textContent = currentUser.name;

}

function test() {

    console.log("Test - Time Stamp: " + new Date());
    console.log("User: " + JSON.stringify(currentUser));

}
