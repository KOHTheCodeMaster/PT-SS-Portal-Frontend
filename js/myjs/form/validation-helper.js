
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


//  Button Disable/Enable
//  ---------------------

function disableBtn(strElementId, strBtnValue) {
    // console.log('Disable');
    let elementSubmitBtn = $(strElementId);
    elementSubmitBtn.prop('disabled', true);
    elementSubmitBtn.prop('value', strBtnValue);
    elementSubmitBtn.css('cursor', 'default');

}

function enableBtn(strElementId, strBtnValue) {
    // console.log('Enable');
    let elementSubmitBtn = $(strElementId);
    elementSubmitBtn.prop('disabled', false);
    elementSubmitBtn.prop('value', strBtnValue);
    elementSubmitBtn.css('cursor', 'pointer');

}


