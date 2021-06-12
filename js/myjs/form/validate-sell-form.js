
/**
 * Validate Selling Form - Step 1 every time user clicks on next btn.
 * onClick for next btn. is linked via steps-settings.js
 * Validation of Buyer Name & Buyer Phone Number
 * @returns {boolean} true when input passes all validations, otherwise false
 */
function validateStep1() {

    let listOfInput = [
        $('#sell-input-buyer-name'),
        $('#sell-input-buyer-phone'),
        $('#sell-input-buyer-address')
    ];
    let isValid = false, element, regex;

    // console.log('Validate Selling Form Step 1.');
    isValid = emptyValidationListOfElements(listOfInput);

    //  Validate buyer name
    regex = new RegExp('^\\w([ \\w]{0,49})$');    //  Regex pattern -> 'a[ a]'
    isValid &= validateElement(listOfInput[0], regex);

    //  Validate buyer phone number
    regex = new RegExp('^\\d{1,11}$');    //  Regex pattern -> '#{1-11}'
    isValid &= validateElement(listOfInput[1], regex);

    return isValid;

}

/**
 * Validate Selling Form - Step 2
 * Validation of Buyer Name & Buyer Phone Number
 * @returns {boolean} true when input passes all validations, otherwise false
 */
function validateStep2() {

    let listOfInput = [
        $('#sell-select-item-type'),
        $('#sell-select-colour'),
        $('#sell-select-item-size'),
        $('#sell-select-date'),
        $('#sell-select-amount-of-item'),
        $('#sell-select-payment'),
        $('#sell-select-sales-name')
    ];

    //  Validate amount of item - no negative value allowed
    let element = listOfInput[4];
    let regex = new RegExp('^\\d{1,9}$');    //  Regex pattern -> '#{1-9}'

    return emptyValidationListOfElements(listOfInput) & validateElement(element, regex) & validateDate(listOfInput[3]);

    // return emptyValidationListOfElements(listOfInput) & validateDate(listOfInput[3]);

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

