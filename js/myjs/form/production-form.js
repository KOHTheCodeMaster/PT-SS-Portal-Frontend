let supervisorNameList = [];
let sizeList;

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    //  Unable to load Current User from localStorage due to pre-loader-box

    major()
        .then(() => console.log("Production-form -> Major method complete."))
        .then(() => quickFill());

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

    //  Initialize lists
    supervisorNameList = await fetchJsonFromUrl(supervisorUrl).then(json => JSON.parse(json));
    sizeList = await fetchJsonFromUrl(sizeUrl).then(json => JSON.parse(json));

    displayList();

    //  Update select elements with list values
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

    // document.getElementById("a").addEventListener('a', (event) => {
    //
    // });

    return JSON.stringify(json);

}

function displayList() {

    console.log(supervisorNameList);
    console.log(sizeList);

}

async function onProductionSubmitBtnClick() {

    // console.log("Daily Production Submitted.");

    let production;

    //  Initialize production from form input
    production = initializeProductionFromForm();
    // console.log(production);

    //  Validate production for empty values
    if (!emptyValidateProduction(production)) console.log("Invalid Production!");
    console.log("Production is valid.");

    //  Save production in DB
    console.log("Saving Production in DB.");
    let url = 'http://localhost:8066/production'
    let strResponse = await reqPostCall(url, production);

    console.log("Response: " + strResponse);

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
        'startTime': sessionStorage.getItem('startTime'),
        'endTime': sessionStorage.getItem('endTime'),
        'totalTime': sessionStorage.getItem('totalTime'),
        'prodAmount1stClass': $('#prod-input-1st-prod-amount').val(),
        'prodAmount2ndClass': $('#prod-input-2nd-prod-amount').val(),
        'notes': $('#prod-input-notes').val()

    });

}

function emptyValidateProduction(production) {

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

function quickFill() {

    console.log('quick fill');

    //  Valid production object
    let jsonProd = {
        "supervisorName": "Syam",
        "nameOfReporter": "Tanto",
        "shift": "C",
        "productionDate": "2021-02-01",
        "cardNumber": 2337,
        "coilNumber": "2-797",
        "weight": 5050,
        "size": "1829 x 0,2 x 762",
        "startTime": '04:10 pm',
        "endTime": '04:20 pm',
        "totalTime": 0.086805556,
        "productionAmount1stClass": 3624,
        "productionAmount2ndClass": 1426,
        "notes": "abc 123"
    }

    $('#prod-select-supervisor').val(jsonProd.supervisorName);
    $('#prod-input-reporter').val(jsonProd.nameOfReporter);
    $('#prod-select-shift').val(jsonProd.shift);
    $('#prod-select-prod-date').val(jsonProd.productionDate);
    $('#prod-input-card-number').val(jsonProd.cardNumber);
    $('#prod-input-coil-number').val(jsonProd.coilNumber);
    $('#prod-input-weight').val(jsonProd.weight);
    $('#prod-select-size').val(jsonProd.size);
    $('#prod-input-start-time').val(jsonProd.startTime);
    $('#prod-input-end-time').val(jsonProd.endTime);
    $('#prod-input-1st-prod-amount').val(jsonProd.productionAmount1stClass);
    $('#prod-input-2nd-prod-amount').val(jsonProd.productionAmount2ndClass);
    $('#prod-input-notes').val(jsonProd.notes);

}

/**
 * Invoke POST Method REST API Call to the given url with the given body
 * @param url   url for the post request
 * @param body  json object containing data for the post body
 * @returns string Text response from the server
 */
async function reqPostCall(url, body) {

    return await fetch(url, {
        method: 'POST',
        body: body,
        headers: {'Content-Type': 'application/json'}
    }).then(function (response) {

        // The API call was successful!
        if (response.ok) return response.text();

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

