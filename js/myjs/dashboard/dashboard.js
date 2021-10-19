let currentUser;

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    // console.log("Test - Time Stamp: " + new Date());

    init();

});

function init() {

    currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser === null) window.location.href = '/PT-SS-Portal-Frontend/login.html';

    //  Update User details on Dashboard
    updateUserDetails();

}

function updateUserDetails() {

    console.log("Update User Details on Dashboard");
    // document.querySelector('.user-full-name').textContent = currentUser.name;
    $('.user-full-name').text(currentUser.name);
    document.querySelector('.user-first-name').textContent = currentUser.name;

}
