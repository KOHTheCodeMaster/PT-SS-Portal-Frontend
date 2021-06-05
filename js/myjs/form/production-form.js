
var supervisorNameList = [];
var sizeList;

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    //  Unable to load Current User from localStorage due to pre-loader-box

    major();

});


async function major() {

    test();

    await init();

    await displayList();

    console.log("\n-----------------------------------------------\n");

}

function test() {

    console.log("Test - Time Stamp: " + new Date());

}

async function init() {

    //  Initialize Data members
    supervisorNameList = await initializeSupervisorNameList();

    //  Update User details on Dashboard
    // updateUserDetails();

}

async function initializeSupervisorNameList() {

    let url = 'http://localhost:8066/production/list/supervisor'
    let json = await fetch(url)
        .then(response => response.json())

    return JSON.stringify(json);

}

async function displayList() {

    console.log(supervisorNameList);

}

/*
function updateUserDetails() {

    console.log("Update User Details on Dashboard");
    document.querySelector('.user-full-name').textContent = currentUser.name;
    document.querySelector('.user-first-name').textContent = currentUser.name;

}
*/
