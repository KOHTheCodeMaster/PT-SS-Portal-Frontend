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

    // document.getElementById("a").addEventListener('a', (event) => {
    //
    // });

    return JSON.stringify(json);

}

/**
 * Validate production form everytime user clicks on next btn.
 * onClick for next btn. is linked via steps-settings.js
 * @param stepNumber Index value (0-3) indicating current step of form.
 * @returns {boolean} true when all elements for given step number are valid, otherwise false.
 */
function validateProdForm(stepNumber) {

    let isValid = true;

    if (stepNumber === 0) {

        let listOfInput = [
            $('#prod-select-supervisor'),
            $('#prod-input-reporter'),
            $('#prod-select-shift'),
            $('#prod-select-prod-date')
        ];

        isValid = validateListOfElements(listOfInput) && validateProdDate();

    } else if (stepNumber === 1) {

        let listOfInput = [
            $('#prod-input-card-number'),
            $('#prod-input-coil-number'),
            $('#prod-input-weight'),
            $('#prod-select-size')
        ];

        isValid = validateListOfElements(listOfInput);
    } else if (stepNumber === 2) {

        let listOfInput = [
            $('#prod-input-start-time'),
            $('#prod-input-end-time'),
            $('#prod-input-1st-prod-amount'),
            $('#prod-input-2nd-prod-amount')
        ];

        isValid = validateListOfElements(listOfInput);
    }

    return isValid;

    //  Local inner method used only by validateProdForm()
    function validateListOfElements(listOfElements) {

        let result = true;

        //  Check for element's value is not empty.
        listOfElements.forEach(element => {

            element.removeClass('invalid-input');

            if (element.val().length < 1 || element.val().length > 50) {
                // element.attr('placeholder', 'Enter valid supervisor name');
                element.addClass('invalid-input');
                result = false;
            }

        });

        return result;

    }

    //  Update production date to show from 'yyyy-mm-dd' to 'dd MM yyyy' format
    function validateProdDate() {

        let elementDatePicker = $('.date-picker');
        let strDate = elementDatePicker.val();

        //  Regex for pattern -> '####-[01]#-[0123]#'
        let regexDate = new RegExp('^\\d{4}-[01]\\d-[0-3]\\d$');
        // let regexDate = new RegExp('\\d{4}-\\d{2}-\\d{2}');

        //  Test if input date is in correct format i.e. yyyy-mm-dd
        if (regexDate.test(strDate)) {
            // let strShortMonthDate = convertToShortMonthDate(strDate);
            // elementDatePicker.val(strShortMonthDate);
            return true;
        }

        elementDatePicker.addClass('invalid-input');
        return false;
    }

    /**
     * Convert the given date from 'yyyy-mm-dd' -> 'dd MM yyyy' format
     * @param strDate string date value in this format -> 'yyyy-mm-dd'
     * @returns {string} date in this format -> 'dd MM yyyy'    |   where MM is short month name
     */
    function convertToShortMonthDate(strDate) {
        //  Split strDate by '-'
        let dateArr = strDate.split("-");
        let monthName = extractMonthFromStrDate(strDate);
        return dateArr[2] + ' ' + monthName + ' ' + dateArr[0];
    }

    function extractMonthFromStrDate(strDate) {

        //  strDate format -> 'yyyy-mm-dd'
        //  Split strDate by '-' and pick 1 index of that array to get month value from strDate
        let monthValue = strDate.split("-")[1];
        //  parse month value from string to integer and subtract 1 for 0-based index in months array
        let month_index = parseInt(monthValue, 10) - 1;

        //  Initialize months array
        let monthsFull = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        let monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        console.log("The current month is " + monthsShort[month_index]);
        return monthsShort[month_index];
    }

    //  Testing purpose method for log message
    function testInput(re, str) {
        let midstring;
        if (re.test(str)) {
            midstring = 'contains';
        } else {
            midstring = 'does not contain';
        }
        console.log(`${str} ${midstring} ${re.source}`);
    }

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
