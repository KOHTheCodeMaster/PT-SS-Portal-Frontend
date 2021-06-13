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
    onFinished: async function (event, currentIndex) {
        // onProductionSubmitBtnClick()
        //     .then($('#success-modal').modal('show'));

        //  Attempt to save in DB
        let saveSuccessful = await onSubmitProductionForm();

        if (saveSuccessful) $('#success-modal').modal('show')
        else $('#failure-modal').modal('show')

    }
});

//  Selling Form
$(".tab-wizard-sell").steps({
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
        return validateStep1();
    },
    onFinished: async function (event, currentIndex) {
        if (validateStep2()) {

            //  Attempt to save in DB
            let saveSuccessful = await onSubmitSellingForm();

            if (saveSuccessful) $('#success-modal').modal('show')
            else $('#failure-modal').modal('show')

        }
    }
});
