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

        isValid = emptyValidationListOfElements(listOfInput) & validateDate(listOfInput[3]);

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

