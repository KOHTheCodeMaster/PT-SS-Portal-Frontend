//  Production Form
$(".tab-wizard").steps({
    headerTag: "h5",
    bodyTag: "section",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: "Submit"
    },
    onStepChanging: function (event, currentIndex, newIndex) {

        //  Allow user to go back to previous tab
        if (currentIndex > newIndex) return true;

        //  Validate current index prod form
        return validateProdForm(currentIndex);
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
        // $('.steps .current').prevAll().addClass('disabled');
        // console.log("Clicked! Current Index: " + currentIndex);
    },
    onFinished: function (event, currentIndex) {
        onProductionSubmitBtnClick()
            .then($('#success-modal').modal('show'));
    }
});

$("#1tab-wizard").steps({
    // Disables the finish button (required if pagination is enabled)
    enableFinishButton: false,
    // Disables the next and previous buttons (optional)
    enablePagination: false,
    // Enables all steps from the begining
    enableAllSteps: true,
    // Removes the number from the title
    titleTemplate: "#title#",

    onStepChanged: function (event, currentIndex, priorIndex) {
    },
    onStepChanging: function (event, currentIndex, newIndex) {
        return false;
    }


});

//  Selling Form
$(".tab-wizard2").steps({
    headerTag: "h5",
    bodyTag: "section",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> <span class="info">#title#</span>',
    labels: {
        finish: "Submit",
        next: "Next",
        previous: "Previous",
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
        $('.steps .current').prevAll().addClass('disabled');
    },
    onFinished: function (event, currentIndex) {
        $('#success-modal-btn').trigger('click');
    }
});
