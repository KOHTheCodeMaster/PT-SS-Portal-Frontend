
//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    // major()
    //     .then(() => console.log("Selling Form -> Major method complete."))
    // .then(() => quickFill());

});


async function major() {
    console.log("\n-----------------------------------------------\n");
}

async function onSellingSubmitBtnClick() {

    // console.log("Daily Sales Submitted.");

    let sales;

    //  Initialize sales from selling form
    sales = initializeSalesFromForm();
    console.log(sales);

    //  Validate production for empty values
    // if (!emptyValidateProduction(production)) console.log("Invalid Production!");
    // console.log("Sales is valid.");

    //  Save production in DB
    console.log("Saving Sales in DB.");
    let url = 'http://localhost:8066/sales'
    let strResponse = await reqPostCall(url, sales);

    console.log("Response: " + strResponse);
    return strResponse !== undefined && strResponse !== null;

}

function initializeSalesFromForm() {

    console.log("Initializing Sales from Selling Form");

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
