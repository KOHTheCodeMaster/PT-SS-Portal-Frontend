jQuery(document).ready(function() {

// date picker
    $('.date-picker').datepicker({
        language: 'en',
        autoClose: true,
        dateFormat: 'yyyy-mm-dd',
    });

    $("input, select").change(function(){
        this.classList.remove('invalid-input');
        console.log('1');
    });

});
