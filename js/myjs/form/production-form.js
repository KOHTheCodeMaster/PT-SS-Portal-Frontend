let supervisorNameList = [];
let sizeList;

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    major()
        .then(() => console.log("Production-form -> Major method complete."))
        .then(() => quickFill());

});

async function major() {

    //  Test Connection with Back-end REST API
    if (await testConnectionFailure()) {

        //  Initialize supervisor & size lists with dummy options in case of connection failure
        // console.log('Unable to make connection with Back-end REST API.');
        initializeListsWithDummyOptions();
        return;
    }

    await init();

    console.log("\n-----------------------------------------------\n");

}

async function init() {

    function listsInitializedFromSessionStorage() {

        //  Get lists from session storage if available
        let temp1 = sessionStorage.getItem('supervisorNameList');
        let temp2 = sessionStorage.getItem('sizeList');

        //  Initialize lists
        if (temp1 != null && temp2 != null) {
            console.log('Initializing lists from session storage.');
            supervisorNameList = JSON.parse(temp1);
            sizeList = JSON.parse(temp2);
            return true;
        }

        return false;
    }

    if (!listsInitializedFromSessionStorage()) {

        console.log('Initializing Lists from Back-end REST API.');

        //  Initialize Data members
        let supervisorUrl = 'https://pt-ss-portal-backend-1.herokuapp.com/production/list/supervisor'
        let sizeUrl = 'https://pt-ss-portal-backend-1.herokuapp.com/production/list/size'

        //  Initialize lists
        supervisorNameList = await fetchJsonFromUrl(supervisorUrl).then(json => JSON.parse(json));
        sizeList = await fetchJsonFromUrl(sizeUrl).then(json => JSON.parse(json));

        //  Set lists in session storage to be used as cache next time
        sessionStorage.setItem('supervisorNameList', JSON.stringify(supervisorNameList));
        sessionStorage.setItem('sizeList', JSON.stringify(sizeList));

    }

    //  Update select elements with list values
    await updateProdFormInput();

}

/**
 * Initialize #prod-select-supervisor, #prod-select-size elements with Dummy Options
 * due to connection failure with Back-end REST API.
 */
function initializeListsWithDummyOptions() {

    console.log('Initializing select elements with dummy options')
    let htmlOptionElement, elementSelect;

    //  Create dummy option for supervisor
    htmlOptionElement = document.createElement("option");
    htmlOptionElement.text = 'Syam';
    //  Add the dummy option for supervisor
    elementSelect = document.querySelector('#prod-select-supervisor');
    elementSelect.add(htmlOptionElement);
    // elementSelect.value = htmlOptionElement.value;
    // $('#prod-select-supervisor').val('Syam');    //  Not working

    //  Create dummy option for size
    htmlOptionElement = document.createElement("option");
    htmlOptionElement.text = '1829 x 0,2 x 762';
    //  Add the dummy option for size
    elementSelect = document.querySelector('#prod-select-size');
    elementSelect.add(htmlOptionElement);
    // elementSelect.value = htmlOptionElement.value;
    // $('#prod-select-supervisor').val('Syam');    //  Not working
    // elementSelect.setAttribute('value', htmlOptionElement.text); //  Not working

}

/**
 * Update the options for select elements using the supervisorNameList & sizeList
 */
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

async function onSubmitProductionForm() {

    // console.log("Daily Production Submitted.");

    //  Disable Submit btn. to prevent multiple submission
    disableSubmitFormBtn();

    let production;

    //  Initialize production from form input
    production = initializeProductionFromForm();
    // console.log(production);

    //  Validate production for empty values
    // if (!emptyValidateProduction(production)) console.log("Invalid Production!");
    // console.log("Production is valid.");

    //  Save production in DB
    // console.log("Saving Production in DB.");
    let url = 'https://pt-ss-portal-backend-1.herokuapp.com/production'
    let strResponse = await reqPostCall(url, production);

    //  Enable Submit btn. after form submit response received
    enableSubmitFormBtn();

    console.log("Response: " + strResponse);
    return strResponse !== undefined && strResponse !== null;

}

function initializeProductionFromForm() {

    // console.log("Initializing Production");

    /*
        let prodJson = {
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

    return JSON.stringify({

        'supervisorName': $('#prod-select-supervisor').val().trim(),
        'nameOfReporter': $('#prod-input-reporter').val().trim(),
        'shift': $('#prod-select-shift').val().trim(),
        'productionDate': $('#prod-select-prod-date').val().trim(),
        'cardNumber': $('#prod-input-card-number').val().trim(),
        'coilNumber': $('#prod-input-coil-number').val().trim(),
        'weight': $('#prod-input-weight').val().trim(),
        'size': $('#prod-select-size').val().trim(),
        'startTime': sessionStorage.getItem('startTime'),
        'endTime': sessionStorage.getItem('endTime'),
        'totalTime': sessionStorage.getItem('totalTime'),
        'productionAmount1stClass': $('#prod-input-1st-prod-amount').val().trim(),
        'productionAmount2ndClass': $('#prod-input-2nd-prod-amount').val().trim(),
        'notes': $('#prod-input-notes').val().trim()

    });

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
