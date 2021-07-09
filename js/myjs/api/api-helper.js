
/**
 * Test connection with Back-end REST API.
 * @returns {Promise<boolean>} true when connection failure with Back-end REST API, otherwise false.
 */
async function testConnectionFailure() {

    console.log("Test Connection Request - Time Stamp: " + new Date());

    //  Test connection by making GET request for productionId 1
    let url = 'http://localhost:8066/test/'
    let responseProd = await fetch(url)
        .then(response => {
            // The API call was successful!
            if (response.ok) return response.text();

            //  Reject in case of failed response
            return Promise.reject(response);
        }).catch(function (err) {

            // There was an error
            console.warn('Failed to establish connection with Back-end REST API.\n', err);
            return null;
        });
    return responseProd == null;

}

/**
 * Invoke POST Method REST API Call to the given url with the given body
 * @param url   url for the post request
 * @param body  json object containing data for the post body
 * @returns string Text response from the server
 */
async function reqPostCall(url, body) {

    return await fetch(url, {
        method: 'POST',
        body: body,
        headers: {'Content-Type': 'application/json'}
    }).then(function (response) {

        // The API call was successful!
        if (response.ok) return response.text();

        //  Reject in case of failed response
        return Promise.reject(response);

    }).then(function (data) {

        // This is the JSON from our response
        return data;

    }).catch(function (err) {

        // There was an error
        console.warn('Something went wrong.', err);

    });

}

/**
 * Make GET REST API Call to given url
 * Note: Throws error if connection failure to given url
 * @param url URL for GET request
 * @returns {Promise<string>} JSON Response received from the given url
 */
async function fetchJsonFromUrl(url) {

    let json = await fetch(url)
        .then(response => {
            // The API call was successful!
            if (response.ok) return response.json();

            //  Reject in case of failed response
            return Promise.reject(response);
        }).catch(function (err) {

            // There was an error
            console.warn('Failed to establish connection with Back-end REST API.\n', err);
            return null;
        });

    return JSON.stringify(json);

}


//  Unused Methods
//  --------------

async function demoGetRESTCall() {

    // let url = 'https://jsonplaceholder.typicode.com/todos/1';
    let url = 'http://localhost:8066/user/rudys@sermanisteel.co.id';
    let json = await fetchJsonFromUrl(url);

    console.log("Response: " + json);

}
