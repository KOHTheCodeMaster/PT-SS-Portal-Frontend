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
