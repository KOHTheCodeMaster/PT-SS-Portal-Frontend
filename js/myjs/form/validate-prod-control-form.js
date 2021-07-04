jQuery(document).ready(function () {

    $("input").change(function () {
        this.classList.remove('invalid-input');
    });

});

/**
 * Validate & Submit Production Control Target Form
 * @returns {Promise<void>}
 */
async function submitProdControlForm() {

    if (!validateProdControlInputTargetAmount()) return;
    console.log('Submitting.');

    //  Disable Submit btn. to prevent multiple clicks
    disableBtn('#prod-control-submit-btn', 'Submitting');

    if (await testConnectionFailure()) {
        $('#failure-modal').modal('show');
        enableBtn('#prod-control-submit-btn', 'Submit');
        return;
    }

    // console.log("Production Control Target Form Submit.");

    let jsonTargetInput;

    //  Initialize jsonTargetInput from the form
    jsonTargetInput = {
        'type': 'P',
        'year': $('#prod-control-select-year').val().trim(),
        'month': $('#prod-control-select-month').val().trim(),
        'targetAmount': $('#prod-control-input-target-amount').val().trim()
    }
    // console.log(jsonTargetInput);

    //  Save jsonTargetInput in DB
    // console.log("Saving Corrugation in DB.");
    let url = 'http://localhost:8066/target/'
    let strResponse = await reqPostCall(url, jsonTargetInput);

    console.log("Response: " + strResponse);
    let saveSuccessful = strResponse !== undefined && strResponse !== null;

    if (saveSuccessful) $('#success-modal').modal('show')
    else $('#failure-modal').modal('show')

    //  Enable Submit btn. after form submit response received
    enableBtn('#prod-control-submit-btn', 'Submit');

}

/**
 * Validate input target amount of production control form everytime user clicks on submit.
 * @returns {boolean} true when input target amount is valid, otherwise false.
 */
function validateProdControlInputTargetAmount() {

    //  Initialize input target amount element
    let element = $('#prod-control-input-target-amount');

    //  Validate input target amount
    let regex = new RegExp('^\\d{1,9}$');    //  Regex pattern -> '#{1-9}'

    return validateElement(element, regex);

}


