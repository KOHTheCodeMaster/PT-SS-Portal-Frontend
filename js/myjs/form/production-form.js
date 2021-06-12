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

/**
 * Test connection with Back-end REST API.
 * @returns {Promise<boolean>} true when connection failure with Back-end REST API, otherwise false.
 */
async function testConnectionFailure() {

    console.log("Test - Time Stamp: " + new Date());

    //  Test connection by making GET request for productionId 1
    let url = 'http://localhost:8066/production/1'
    let responseProd = await fetchJsonFromUrl(url).then(json => JSON.parse(json));
    return responseProd == null;

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
        let supervisorUrl = 'http://localhost:8066/production/list/supervisor'
        let sizeUrl = 'http://localhost:8066/production/list/size'

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

async function onProductionSubmitBtnClick() {

    // console.log("Daily Production Submitted.");

    let production;

    //  Initialize production from form input
    production = initializeProductionFromForm();
    // console.log(production);

    //  Validate production for empty values
    // if (!emptyValidateProduction(production)) console.log("Invalid Production!");
    console.log("Production is valid.");

    //  Save production in DB
    console.log("Saving Production in DB.");
    let url = 'http://localhost:8066/production'
    let strResponse = await reqPostCall(url, production);

    console.log("Response: " + strResponse);
    return strResponse !== undefined && strResponse !== null;

}

function initializeProductionFromForm() {

    console.log("Initializing Production");

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


//  API Helper Methods
//  -------------------------
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

/**
 * Make GET REST API Call to given url
 * Note: Throws error if connection failure to given url
 * @param url URL for GET request
 * @returns {Promise<string>} JSON Response received from the given url
 */
async function fetchJsonFromUrl(url) {

    let json = await fetch(url)
        .then(response => {
            // The API call was successful!
            if (response.ok) return response.json();

            //  Reject in case of failed response
            return Promise.reject(response);
        }).catch(function (err) {

            // There was an error
            console.warn('Failed to establish connection with Back-end REST API.\n', err);
            return null;
        });

    return JSON.stringify(json);

}


//  Validation Helper Methods
//  -------------------------
/**
 * Validate date - Check format -> 'yyyy-mm-dd'
 * @returns {boolean} true when input passes all validations, otherwise false
 */
function validateDate(elementDate) {

    //  Regex for pattern -> '####-[01]#-[0123]#'
    let regexDate = new RegExp('^\\d{4}-[01]\\d-[0-3]\\d$');

    //  validate if input date is in correct format i.e. yyyy-mm-dd
    return validateElement(elementDate, regexDate);

}

/**
 * Validate given element's value with the regex provided.
 * Add/remove 'invalid-input' CSS class when value is invalid/valid respectively.
 * @param element Element whose value needs to be validated
 * @param regex Regex pattern which contains the rules for validation
 * @returns {boolean} true when input passes all validations, otherwise false
 */
function validateElement(element, regex) {

    let str = element.val();

    //  Test if input date is in correct format i.e. yyyy-mm-dd
    if (regex.test(str)) {
        // let strShortMonthDate = convertToShortMonthDate(str);
        // element.val(strShortMonthDate);
        element.removeClass('invalid-input');
        return true;
    }

    element.addClass('invalid-input');
    return false;

}

/**
 * Check for value of given list of input elements whether its empty or not.
 * Add/remove 'invalid-input' CSS class when value is invalid/valid respectively.
 * This method is Common, used by both validateSellForm() & validateProdForm()
 * @param listOfElements List of input elements whose value needs to be checked for emptiness
 * @returns {boolean} true when all the elements have some value i.e. not blank, otherwise false
 */
function emptyValidationListOfElements(listOfElements) {

    let result = true;

    //  Check for element's value is not empty.
    listOfElements.forEach(element => {

        element.removeClass('invalid-input');

        if (element.val().trim().length < 1 || element.val().trim().length > 50) {
            // element.attr('placeholder', 'Enter valid supervisor name');
            element.addClass('invalid-input');
            result = false;
        }

    });

    return result;

}

