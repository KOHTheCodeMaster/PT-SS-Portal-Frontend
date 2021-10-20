function isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user')) === null;
}

function redirectToRelativeUrl(relativeUrl) {

    console.log('Redirecting to URL - ' + relativeUrl);
    window.location.href = relativeUrl;    //  Parent relative url
    // console.log(window.location.pathname);   //  Current page relative url

    // window.location.href = '/PT-SS-Portal-Frontend/login.html';    //  Parent relative url

}

function updateLeftSideBar() {

    let currentUser = JSON.parse(localStorage.getItem('user'));

    //  If No user logged in, redirect to login.html
    if (currentUser === null) window.location.href = '/PT-SS-Portal-Frontend/login.html';

    console.log('Role - ' + currentUser.userRole);
    let elementList = [
        $('.left-side-bar-selling'), $('.left-side-bar-selling-control'),
        $('.left-side-bar-production'), $('.left-side-bar-production-control')
    ]

    switch (currentUser.userRole) {
        // case 'CEO':
        // case 'MANAGER':
        case 'ProductionManager':
            elementList[0].hide();
            break;
        case 'SellingManager':
            elementList[2].hide();
            break;
        case 'ProductionStaff':
            elementList[0].hide();
            elementList[3].hide();
            break;
        case 'SellingStaff':
            elementList[1].hide();
            elementList[2].hide();
            break;
    }

}
