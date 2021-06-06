var supervisorNameList = [];
var sizeList;

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    //  Unable to load Current User from localStorage due to pre-loader-box

    major().then(() => console.log("Production-form -> Major method complete."));

});


async function major() {

    test();

    await init();

    console.log("\n-----------------------------------------------\n");

}

function test() {

    console.log("Test - Time Stamp: " + new Date());

}

async function init() {

    //  Initialize Data members
    let supervisorUrl = 'http://localhost:8066/production/list/supervisor'
    let sizeUrl = 'http://localhost:8066/production/list/size'
    supervisorNameList = await fetchJsonFromUrl(supervisorUrl)
        .then(json => JSON.parse(json));
    sizeList = await fetchJsonFromUrl(sizeUrl)
        .then(json => JSON.parse(json));

    //  Update User details on Dashboard
    displayList();

    await updateProdFormInput();

}

function updateProdFormInput() {

    // console.log("Update Prod Form Input.");

    //  Select elements by id
    let elementSelectSupervisor = document.querySelector('#prod-select-supervisor');
    let elementSelectSize = document.querySelector('#prod-select-size');

    //  Update options for supervisorNameList
    supervisorNameList.forEach(value => {
        let htmlOptionElement = document.createElement("option");
        htmlOptionElement.text = value
        elementSelectSupervisor.add(htmlOptionElement);
    });

    //  Update options for sizeList
    sizeList.forEach(value => {
        let htmlOptionElement = document.createElement("option");
        htmlOptionElement.text = value
        elementSelectSize.add(htmlOptionElement);
    });

}

async function fetchJsonFromUrl(url) {

    let json = await fetch(url)
        .then(response => response.json())

    return JSON.stringify(json);

}

function displayList() {

    console.log(supervisorNameList);
    console.log(sizeList);

}

async function onProductionSubmitBtnClick() {

    console.log("Daily Production Submitted.");

    let production;

    //  Initialize production from form input
    production = initializeProductionFromForm();
    console.log(production);

    //  Validate production
    if (!validateProduction(production)) console.log("Invalid Production!");
    console.log("Production is valid.");

    //  Save production in DB
    console.log("Saving Production in DB.");
    let url = 'http://localhost:8066/production'
    // let jsonResponse = await reqPostCall(url, production);

    // console.log("Response: " + jsonResponse);
    // console.log("Response: " + JSON.stringify(jsonResponse));

}

function initializeProductionFromForm() {

    console.log("Initializing Production");

    return JSON.stringify({

        'supervisorName': $('#prod-select-supervisor').val(),
        'nameOfReporter': $('#prod-input-reporter').val(),
        'Shift': $('#prod-select-shift').val(),
        'Date': $('#prod-select-prod-date').val(),
        'cardNumber': $('#prod-input-card-number').val(),
        'coilNumber': $('#prod-input-coil-number').val(),
        'weight': $('#prod-input-weight').val(),
        'size': $('#prod-select-size').val(),
        'startTime': $('#prod-input-start-time').val(),
        'endTime': $('#prod-input-end-time').val(),
        'totalTime': 0,
        'prodAmount1stClass': $('#prod-input-1st-prod-amount').val(),
        'prodAmount2ndClass': $('#prod-input-2nd-prod-amount').val(),
        'notes': $('#prod-input-notes').val()

    });

}

function validateProduction(production) {

/*
    //  Valid production object
    {
        "supervisorName": "Syam",
        "nameOfReporter": "Tanto",
        "shift": "C",
        "productionDate": "2021-02-01",
        "cardNumber": 2337,
        "coilNumber": "2-797",
        "weight": 5050,
        "size": "1829 x 0,2 x 762",
        "startTime": 0,
        "endTime": 0.086805556,
        "totalTime": 0.086805556,
        "productionAmount1stClass": 3624,
        "productionAmount2ndClass": 1426,
        "notes": "abc 123"
    }
 */

    //  Check for length > 0
    for (let key in production) {
        if (production.hasOwnProperty(key) && production[key].length === 0)
            return false;
    }

    return true;

}
