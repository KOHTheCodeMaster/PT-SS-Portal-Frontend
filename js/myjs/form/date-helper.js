jQuery(document).ready(function() {

    // date picker
    $('.date-picker').datepicker({
        language: 'en',
        autoClose: true,
        dateFormat: 'yyyy-mm-dd',
        onSelect: function() {
            $('.date-picker').removeClass('invalid-input');
        }
    });

    $("input, select").change(function(){
        this.classList.remove('invalid-input');
    });

});

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

function generateCurrentMonthAndYear() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
        month: 'full', year: 'numeric'
    });//.replace(/ /g, '-');
    console.log(formattedDate);
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

