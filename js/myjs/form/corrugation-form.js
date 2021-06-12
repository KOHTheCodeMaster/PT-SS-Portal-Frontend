
/**
 * On Submit corrugation form,
 * Firstly, validate the form input values
 * Once, all validations are passed
 * Attempt to save the form in DB and show success popup
 * Otherwise, show failure popup
 */
async function onSubmitCorrugationForm() {

    if (!validateCorrugationForm()) return;

    // console.log("Corrugation Form Submit.");

    let corrugation;

    //  Initialize corrugation from the form
    corrugation = initializeCorrugationFromForm();
    console.log(corrugation);

    //  Save production in DB
    console.log("Saving Corrugation in DB.");
    let url = 'http://localhost:8066/corrugation'
    let strResponse = await reqPostCall(url, corrugation);

    console.log("Response: " + strResponse);
    let saveSuccessful = strResponse !== undefined && strResponse !== null;

    if (saveSuccessful) $('#success-modal').modal('show')
    else $('#failure-modal').modal('show')

}

/**
 * Validate Corrugation Form
 * @returns {boolean} true when input passes all validations, otherwise false
 */
function validateCorrugationForm() {

    console.log('Validate Corrugation Form.');

    let listOfInput = [
        $('#corru-input-date'),
        $('#corru-select-item-type'),
        $('#corru-select-colour'),
        $('#corru-select-corrugation-type'),
        $('#corru-select-amount')
    ];

    // console.log('Validate Corrugation Form.');
    let isValid = emptyValidationListOfElements(listOfInput);

    //  Validate corrugation amount - no negative value allowed
    let element = listOfInput[4];
    let regex = new RegExp('^\\d{1,9}$');    //  Regex pattern -> '#{1-9}'
    isValid &= validateElement(element, regex);

    //  Validate corrugation date
    isValid &= validateDate(listOfInput[0]);

    return isValid;

}

function initializeCorrugationFromForm() {

    console.log("Initializing Corrugation from the Form");

    /*
        let corrugationJson = {
            "corrugationDate": "2021-12-31",
            "itemType": "Seng Kaki",
            "colour": "Silver",
            "corrugationType": "Coil",
            "amount": "100"
        }
     */

    return JSON.stringify({

        'corrugationDate': $('#corru-input-date').val().trim(),
        'itemType': $('#corru-select-item-type').val().trim(),
        'colour': $('#corru-select-colour').val().trim(),
        'corrugationType': $('#corru-select-corrugation-type').val().trim(),
        'amount': $('#corru-select-amount').val().trim()

    });

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

