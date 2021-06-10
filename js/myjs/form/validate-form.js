
/**
 * Validate production form everytime user clicks on next btn.
 * onClick for next btn. is linked via steps-settings.js
 * @param currentIndex Index value (0-3) indicating current step of form.
 * @returns {boolean} true when all elements for given step number are valid, otherwise false.
 */
function validateProdForm(currentIndex) {

    let stepNumber = currentIndex + 1;
    let isValid = true;

    if (stepNumber === 1) {

        let listOfInput = [
            $('#prod-select-supervisor'),
            $('#prod-input-reporter'),
            $('#prod-select-shift'),
            $('#prod-select-prod-date')
        ];

        isValid = emptyValidationListOfElements(listOfInput);

        //  Validate prod date
        let isValidDate = validateProdDate();

        return isValid && isValidDate;

    } else if (stepNumber === 2) {

        let listOfInput = [
            $('#prod-input-card-number'),
            $('#prod-input-coil-number'),
            $('#prod-input-weight'),
            $('#prod-select-size')
        ];

        isValid = emptyValidationListOfElements(listOfInput);

        //  Validate Step 2 elements individually
        let isValid2 = validateStep2();

        return isValid && isValid2;

    } else if (stepNumber === 3) {

        let listOfInput = [
            $('#prod-input-start-time'),
            $('#prod-input-end-time'),
            $('#prod-input-1st-prod-amount'),
            $('#prod-input-2nd-prod-amount')
        ];

        isValid = emptyValidationListOfElements(listOfInput) & validateStep3();
    }

    return isValid;

}

//  Local inner method used only by validateProdForm()
function emptyValidationListOfElements(listOfElements) {

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

function validateStep2() {

    let isValid = true, element, regex;
    // console.log('Validate card number.');

    //  Validate card number
    element = $('#prod-input-card-number');
    regex = new RegExp('^\\d{1,9}$');    //  Regex pattern -> '#{1-9}'
    isValid &= validateElement(element, regex);

/*
        //  Validate coil number
        element = $('#prod-input-coil-number');
        regex = new RegExp('^\\d-\\d{3}$');    //  Regex pattern -> '#-###'
        validateElement(element, regex);
*/

    //  Validate weight
    element = $('#prod-input-weight');
    regex = new RegExp('^\\d{1,9}$');    //  Regex pattern -> '#{1-9}'
    isValid &= validateElement(element, regex);

    return isValid;

}
function validateStep3() {

    let isValid = true, element, regex;

    //  Validate 1st prod amount
    element = $('#prod-input-1st-prod-amount');
    regex = new RegExp('^\\d{1,9}$');    //  Regex pattern -> '#{1-9}'
    isValid &= validateElement(element, regex);

    //  Validate 2nd prod amount
    element = $('#prod-input-2nd-prod-amount');
    regex = new RegExp('^\\d{1,9}$');    //  Regex pattern -> '#{1-9}'
    isValid &= validateElement(element, regex);

    //  Validate start time, end time & initialize total time if both valid
    isValid &= validateAndInitializeTotalTime();

    return isValid;

}

function validateAndInitializeTotalTime() {

    //  Nested local method for converting str time into json time object
    function covertStringToJsonTime(strTime) {

        //  Prefix time with 0 if its hour is single digit i.e. 4:10 pm -> 04:10 pm
        if (strTime.indexOf(':') === 1) strTime = '0' + strTime;

        //  Convert 12 Hr. to 24 Hr. when strTime ends with pm i.e. 04:10 pm -> 16:10
        let regexForPM = new RegExp('pm$');
        if (regexForPM.test(strTime)) {
            let tempHr = parseInt(strTime.substring(0, 2));
            tempHr += 12;
            strTime = tempHr + strTime.substring(2, 5);
        }

        //  return json object for time with hours (24) & minutes field
        return {
            hours: strTime.substring(0, 2),
            minutes: strTime.substring(3, 5)
        };
    }

    function convertJsonTimeToDate(jsonTime) {
        let tempStartDate = new Date();
        tempStartDate.setHours(jsonTime.hours);
        tempStartDate.setMinutes(jsonTime.minutes);
        return tempStartDate;
    }

    let strStartTime, strEndTime;
    let totalTime = -1; //  Total Time taken in ms
    // console.log('Validate time.');

    //  Validate card number
    strStartTime = $('#prod-input-start-time').val();
    strEndTime = $('#prod-input-end-time').val();

    let jsonStartTime = covertStringToJsonTime(strStartTime);
    let jsonEndTime = covertStringToJsonTime(strEndTime);

    //  Convert json time object to date instance
    let tempStartDate = convertJsonTimeToDate(jsonStartTime);
    let tempEndDate = convertJsonTimeToDate(jsonEndTime);

    //  Initialize total time taken in milliseconds
    let startTimeMilliSeconds = tempStartDate.getTime();
    let endTimeMilliSeconds = tempEndDate.getTime();
    totalTime = endTimeMilliSeconds - startTimeMilliSeconds;
    // console.log(totalTime);

    //  Invalid input if total time difference is negative i.e. start time is > end time
    if (totalTime < 0) {
        $('#prod-input-start-time').addClass('invalid-input')
        $('#prod-input-end-time').addClass('invalid-input')
        return false;
    }

    //  Save total time difference in session storage
    sessionStorage.setItem('startTime', startTimeMilliSeconds);
    sessionStorage.setItem('endTime', endTimeMilliSeconds);
    sessionStorage.setItem('totalTime', totalTime);
    return true;
}

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

//  Validate production date - Check format -> 'yyyy-mm-dd'
function validateProdDate() {

    // console.log('Validate prod date.');

    let elementDatePicker = $('.date-picker');

    //  Regex for pattern -> '####-[01]#-[0123]#'
    let regexDate = new RegExp('^\\d{4}-[01]\\d-[0-3]\\d$');

    //  validate if input date is in correct format i.e. yyyy-mm-dd
    return validateElement(elementDatePicker, regexDate);
}


//  Unused Methods
//  --------------

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

