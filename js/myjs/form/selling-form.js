//  Wait for the html content to be loaded
jQuery(document).ready(function () {

    let elementSelectItemType = $('#sell-select-item-type');
    let elementSelectItemSize = $('#sell-select-item-size');
    let elementSelectColour = $('#sell-select-colour');
    // let elementSubmitBtn = $('#corru-input-submit');

    //  Initially Disable select colour & corrugation type elements - enable only after item type is changed
    elementSelectColour.prop('disabled', true);
    elementSelectItemSize.prop('disabled', true);

    elementSelectItemType.change(function () {

        // console.log('Selected - ' + this.value);

        //  Disable & return if user selects 'Choose' default option
        if (this.value.length === 0) {
            elementSelectColour.prop('disabled', true);
            elementSelectItemSize.prop('disabled', true);
            return;
        }

        //  Enable select colour & corrugation type elements
        elementSelectColour.prop('disabled', false);
        elementSelectItemSize.prop('disabled', false);

        updateItemSize(elementSelectItemType.val().trim(), elementSelectItemSize);
        updateColour(elementSelectItemType.val().trim(), elementSelectColour);

    });


    function updateItemSize(strItemType, elementSelectItemSize) {

        //  Delete all existing options from select element
        // elementSelectItemSize.find('option').remove();
        elementSelectItemSize.empty();

        switch (strItemType) {
            case 'Seng Kaki':
                // elementSelectItemSize.append($("<option></option>").attr("value", 'Gelombang Besar').text('Gelombang Besar').trigger('change'));
                elementSelectItemSize.append(new Option( '1524 x 0,2',  '1524 x 0,2')).trigger('change');
                elementSelectItemSize.append(new Option( '1829 x 0,2',  '1829 x 0,2')).trigger('change');
                elementSelectItemSize.append(new Option( '2134 x 0,2',  '2134 x 0,2')).trigger('change');
                elementSelectItemSize.append(new Option( '2438 x 0,2',  '2438 x 0,2')).trigger('change');
                elementSelectItemSize.append(new Option( '2743 x 0,2',  '2743 x 0,2')).trigger('change');
                elementSelectItemSize.append(new Option( '3048 x 0,2',  '3048 x 0,3')).trigger('change');
                break;
            case 'Seng Lebar':
                elementSelectItemSize.append(new Option( '1829 x 0,2',  '1829 x 0,2')).trigger('change');
                elementSelectItemSize.append(new Option( '1829 x 0,25',  '1829 x 0,25')).trigger('change');
                elementSelectItemSize.append(new Option( '1829 x 0,3',  '1829 x 0,3')).trigger('change');
                elementSelectItemSize.append(new Option( '1829 x 0,35',  '1829 x 0,35')).trigger('change');
                elementSelectItemSize.append(new Option( '1829 x 0,3',  '1829 x 0,3')).trigger('change');
                break;
            case 'Galvalum':
                elementSelectItemSize.append(new Option('1829 x 0,3', '1829 x 0,3')).trigger('change');
                break;
            case 'Spandeck':
                elementSelectItemSize.append(new Option( '1829 x 0,25',  '1829 x 0,25')).trigger('change');
                elementSelectItemSize.append(new Option( '1829 x 0,3',  '1829 x 0,3')).trigger('change');
                elementSelectItemSize.append(new Option( '1829 x 0,35',  '1829 x 0,35')).trigger('change');
                break;
            case 'Coil':
                elementSelectItemSize.append(new Option('1829 x 0,2', '1829 x 0,2')).trigger('change');
                break;
            default:
                break;
        }

    }

    function updateColour(strItemType, elementSelectColour) {

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


async function onSubmitSellingForm() {

    // console.log("Daily Sales Submitted.");

    //  Disable Submit btn. to prevent multiple submission
    disableSubmitFormBtn();

    let sales;

    //  Initialize sales from selling form
    sales = initializeSalesFromForm();
    // console.log(sales);

    //  Validate production for empty values
    // if (!emptyValidateProduction(production)) console.log("Invalid Production!");
    // console.log("Sales is valid.");

    //  Save production in DB
    // console.log("Saving Sales in DB.");
    let url = 'http://sermanisteel.co.id:8066/sales'
    let strResponse = await reqPostCall(url, sales);

    //  Enable Submit btn. after form submit response received
    enableSubmitFormBtn();

    console.log("Response: " + strResponse);
    return strResponse !== undefined && strResponse !== null;

}

function initializeSalesFromForm() {

    // console.log("Initializing Sales from Selling Form");

    /*
        let salesJson = {
            "buyerName": "1",
            "buyerPhoneNumber": "22",
            "buyerAddress": "null",
            "itemType": "seng_kaki",
            "colour": "silver",
            "itemSize": "762 x 1524 x 0,2",
            "salesDate": "2021-06-10",
            "amountOfItem": "124",
            "payment": "90hari",
            "salesName": "Coki S"
        }
     */

    return JSON.stringify({

        'buyerName': $('#sell-input-buyer-name').val().trim(),
        'buyerPhoneNumber': $('#sell-input-buyer-phone').val().trim(),
        'buyerAddress': $('#sell-input-buyer-address').val().trim(),
        'itemType': $('#sell-select-item-type').val().trim(),
        'colour': $('#sell-select-colour').val().trim(),
        'itemSize': $('#sell-select-item-size').val().trim(),
        'salesDate': $('#sell-select-date').val().trim(),
        'amountOfItem': $('#sell-select-amount-of-item').val().trim(),
        'payment': $('#sell-select-payment').val().trim(),
        'salesName': $('#sell-select-sales-name').val().trim(),

    });

}

