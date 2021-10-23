
function generateCurrentFullMonthAndYear() {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
        month: 'long', year: 'numeric'
    });//.replace(/ /g, '-');
}
