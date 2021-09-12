jQuery(document).ready(function () {

    let elementSelectItemType = $('#corru-select-item-type');
    let elementSelectCorrugationType = $('#corru-select-corrugation-type');
    let elementSelectColour = $('#corru-select-colour');

    //  Initially Disable select colour & corrugation type elements - enable only after item type is changed
    elementSelectColour.prop('disabled', true);
    elementSelectCorrugationType.prop('disabled', true);
    //  Disable Submit btn. to prevent empty form submission
    // disableBtn('#corru-input-submit', 'Submit');

    elementSelectItemType.change(function () {

        // console.log('Selected - ' + this.value);

        //  Disable & return if user selects 'Choose' default option
        if (this.value.length === 0) {
            elementSelectColour.prop('disabled', true);
            elementSelectCorrugationType.prop('disabled', true);
            return;
        }

        //  Enable select colour & corrugation type elements
        elementSelectColour.prop('disabled', false);
        elementSelectCorrugationType.prop('disabled', false);
        //  Enable Submit btn.
        // enableBtn('#corru-input-submit', 'Submit');

        updateCorrugationType(elementSelectItemType.val().trim(), elementSelectCorrugationType);
        updateCorrugationColour(elementSelectItemType.val().trim(), elementSelectColour);

    });


    function updateCorrugationType(strItemType, elementSelectCorrugationType) {

        //  Delete all existing options from select element
        // elementSelectCorrugationType.find('option').remove();
        elementSelectCorrugationType.empty();

        switch (strItemType) {
            case 'Seng Kaki':
            case 'Seng Lebar':
                // elementSelectCorrugationType.append($("<option></option>").attr("value", 'Gelombang Besar').text('Gelombang Besar').trigger('change'));
                elementSelectCorrugationType.append(new Option('Gelombang Besar', 'Gelombang Besar')).trigger('change');
                elementSelectCorrugationType.append(new Option('Gelombang Kecil', 'Gelombang Kecil')).trigger('change');
                break;
            case 'Galvalum':
                elementSelectCorrugationType.append(new Option('Kanal C', 'Kanal C')).trigger('change');
                elementSelectCorrugationType.append(new Option('Reng', 'Reng')).trigger('change');
                elementSelectCorrugationType.append(new Option('Hollow', 'Hollow')).trigger('change');
                break;
            case 'Spandeck':
                elementSelectCorrugationType.append(new Option('Spandeck', 'Spandeck')).trigger('change');
                break;
            case 'Coil':
                elementSelectCorrugationType.append(new Option('Coil', 'Coil')).trigger('change');
                break;
            default:
                break;
        }

    }

    function updateCorrugationColour(strItemType, elementSelectColour) {

        //  Delete all existing options from select element
        // elementSelectColour.find('option').remove();
        elementSelectColour.empty();

        switch (strItemType) {
            case 'Seng Kaki':
            case 'Seng Lebar':
            case 'Galvalum':
                // elementSelectColour.append($("<option></option>").attr("value", 'Silver').text('Silver').trigger('change'));
                elementSelectColour.append(new Option('Silver', 'Silver')).trigger('change');
                break;
            case 'Spandeck':
            case 'Coil':
                elementSelectColour.append(new Option('Silver', 'Silver')).trigger('change');
                elementSelectColour.append(new Option('Merah Merapi', 'Merah Merapi')).trigger('change');
                elementSelectColour.append(new Option('Hijau Borneo', 'Hijau Borneo')).trigger('change');
                elementSelectColour.append(new Option('Biru Bromo', 'Biru Bromo')).trigger('change');
                break;
            default:
                break;
        }

    }

});


/**
 * On Submit corrugation form,
 * Firstly, validate the form input values
 * Once, all validations are passed
 * Attempt to save the form in DB and show success popup
 * Otherwise, show failure popup
 */
async function onSubmitCorrugationForm() {

    if (!validateCorrugationForm()) return;
    console.log('Submitting.');

    //  Disable Submit btn. to prevent multiple clicks
    disableBtn('#corru-input-submit', 'Submitting');

    // console.log("Corrugation Form Submit.");

    let corrugation;

    //  Initialize corrugation from the form
    corrugation = initializeCorrugationFromForm();
    // console.log(corrugation);

    //  Save production in DB
    // console.log("Saving Corrugation in DB.");
    let url = 'http://sermanisteel.co.id:8066/corrugation'
    let strResponse = await reqPostCall(url, corrugation);

    console.log("Response: " + strResponse);
    let saveSuccessful = strResponse !== undefined && strResponse !== null;

    if (saveSuccessful) $('#success-modal').modal('show')
    else $('#failure-modal').modal('show')

    //  Enable Submit btn. after form submit response received
    enableBtn('#corru-input-submit', 'Submit');

}

/**
 * Validate Corrugation Form
 * @returns {boolean} true when input passes all validations, otherwise false
 */
function validateCorrugationForm() {

    // console.log('Validate Corrugation Form.');

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

    // console.log("Initializing Corrugation from the Form");

    /*
        //  Sample valid corrugation json
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

