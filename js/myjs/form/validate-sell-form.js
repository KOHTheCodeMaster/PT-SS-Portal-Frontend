
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
