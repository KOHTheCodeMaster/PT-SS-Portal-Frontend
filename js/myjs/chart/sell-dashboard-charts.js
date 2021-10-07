let jsonSellDashboard = {};

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    // new Promise()
    major().then();

});

async function major() {

    console.log("Major Invoked.");
    console.log("Loading Selling Dashboard.");

    await initializeSalesCharts();

    if (await testConnectionFailure()) jsonSellDashboard.connectionFailure = true;

    console.log("Connection Failure: " + jsonSellDashboard.connectionFailure);

    updateChartOptions(jsonSellDashboard.chart1, "Loading Data...");

    await loadAllChartsData();

    await initializeStatusTable();

    onStatusChangeEvent();

    console.log('Sales Dashboard Loaded.');


}

function onStatusChangeEvent() {

    let elementSaveStatusButton = $('#sell-dashboard-status-update-btn');

    //  Change listener on each select status elements
    $('.sell-dashboard-select-status').change(e => {
        let elementSelect = $(e.target);
        let elementRow = elementSelect.parent().parent();
        let index = parseInt(elementRow.children('.sell-dashboard-serial-id').text()) - 1;

        //  Update CSS Classes according to the new status
        elementSelect.removeClass('badge-secondary');
        elementSelect.removeClass('badge-primary');
        elementSelect.removeClass('badge-success');
        elementSelect.addClass(getCssClass(elementSelect.val()));

        //  Update status in local json status table data
        jsonSellDashboard.statusTable.data[index].status = elementSelect.val();

        //  Add the index in changedStatusIndexList which will be used later for updating the status in DB
        jsonSellDashboard.statusTable.changedStatusIndexList.add(index);
        /*
                let str = '';
                jsonSellDashboard.statusTable.changedStatusIndexList.forEach(value => str += value + ' ');
                console.log('Changed Status List - ' + str);
        */
    });

    elementSaveStatusButton.click(() => {
        console.log('Saving Status Table.');
        let temp1 = [];

        for (let x of jsonSellDashboard.statusTable.changedStatusIndexList.values()) {
            temp1.push({
               'id' : jsonSellDashboard.statusTable.data[x].id,
               'status' : jsonSellDashboard.statusTable.data[x].status
            });
        }
        console.log(JSON.stringify(temp1));

        //  Todo: Save data to update in DB using Back-end REST API

        //  Todo: Remove the row in case of status is DONE & then Fetch new row from DB

    });

}

async function initializeStatusTable() {

    console.log("Initializing Status Table");
    //  Todo: Load latest 5 entry data from Back-end REST API

    let data = [
        {
            'id': '10',
            'buyerName': 'A1',
            'salesName': 'S1',
            'payment': 'CASH',
            'status': 'Unsent',
        }, {
            'id': '20',
            'buyerName': 'A2',
            'salesName': 'S2',
            'payment': '30 days',
            'status': 'Unsent',
        }, {
            'id': '30',
            'buyerName': 'A3',
            'salesName': 'S3',
            'payment': '90 days',
            'status': 'Unsent',
        }, {
            'id': '40',
            'buyerName': 'A4',
            'salesName': 'S4',
            'payment': '180 days',
            'status': 'Unsent',
        }, {
            'id': '50',
            'buyerName': 'A5',
            'salesName': 'S5',
            'payment': '360 days',
            'status': 'Unsent',
        },
    ]
    jsonSellDashboard['statusTable']['data'] = data;

    /*
        <tr>
            <td><span class="font-20 sell-dashboard-serial-id">1</span></td>
            <td><span class="font-20">Buyer Name ABC</span></td>
            <td><span class="font-20">Sales Name XYZ</span></td>
            <td><span class="font-16 badge badge-primary">Cash</span></td>
            <td><span class="font-16 badge badge-secondary">Unsent</span></td>
        </tr>
     */
    let elementBody = $('#selling-dashboard-status-table-body');

    //  Iterate 5 rows loaded from DB
    data.forEach((value, index) => {
        //  Create an empty new row <Tr>
        let elementNewRow = document.createElement('tr');

        // console.log(JSON.stringify(current));
        /*
                let temp = {
                    'serialId': index + 1,
                    'buyerName': value.buyerName,
                    'salesName': value.salesName,
                    'payment': value.payment,
                    'status': value.status,
                }
        */

        //  Populate the row with values
        // let classList = ['badge'];
        // elementNewRow.append(createNewCell('td', index + 1 + "", 'sell-dashboard-serial-id'));

        //  Serial Id
        let tempElement = document.createElement('td');
        tempElement.append(createNewCell('span', index + 1 + ''));
        tempElement.classList.add('sell-dashboard-serial-id');
        elementNewRow.append(tempElement);

        //  Buyer Name
        tempElement = document.createElement('td');
        tempElement.append(createNewCell('span', value.buyerName));
        elementNewRow.append(tempElement);

        //  Sales Name
        tempElement = document.createElement('td');
        tempElement.append(createNewCell('span', value.salesName));
        elementNewRow.append(tempElement);

        //  Add Payment element
        tempElement = document.createElement('td');
        let tempSpanElement = createNewCell('span', value.payment);
        tempSpanElement.classList.add(getCssClass(value.payment));
        tempSpanElement.classList.add('badge');
        tempSpanElement.classList.remove('font-20');
        tempSpanElement.classList.add('font-16');
        tempElement.append(tempSpanElement);
        elementNewRow.append(tempElement);

        //  Add Select Status element
        tempElement = document.createElement('td');
        let elementSelectStatus = createNewCell('select', '');
        elementSelectStatus.classList.add('sell-dashboard-select-status');
        for (let option of ['Unsent', 'Sent', 'Done'])
            elementSelectStatus.append(createNewCell('option', option));
        //  Update CSS Classes for select & option elements
        elementSelectStatus.classList.add(getCssClass(value.status));
        elementSelectStatus.classList.add('badge');
        elementSelectStatus.classList.remove('font-20');
        elementSelectStatus.classList.add('font-16');
        tempElement.append(elementSelectStatus);
        elementNewRow.append(tempElement);

        //  Append the row to elementBody
        elementBody.append(elementNewRow);

    });

    function createNewCell(tagName, strValue) {
        let elementNewCell = document.createElement(tagName);
        elementNewCell.classList.add('font-20');
        elementNewCell.classList.add('text-center');
        elementNewCell.innerText = strValue !== undefined ? strValue : "-";
        return elementNewCell;
    }

}

function getCssClass(payment) {
    switch (payment) {
        case 'CASH':
            return 'badge-primary';
        case '30 days':
            return 'badge-warning';
        case '90 days':
            return 'badge-warning';
        case '180 days':
            return 'badge-warning';
        case '360 days':
            return 'badge-warning';
        //  ---------   Status  ------------
        case 'Unsent' :
            return 'badge-secondary';
        case 'Sent' :
            return 'badge-primary';
        case 'Done' :
            return 'badge-success';
        default:
            console.log('Invalid Payment Found : ' + payment);
    }
}


function initializeSalesCharts() {

    //  Initialize jsonProdDashboard chart keys with empty data
    jsonSellDashboard = {
        "chart1": {},
        "chart2": {},
        "connectionFailure": false,
        "statusTable": {
            "changedStatusIndexList": new Set(),
            "data": []
        },
    }

    // console.log(jsonProdDashboard["chart1"]["data"]);

    initChart1();

    initializeChart2();

}

function initChart1() {

    //  Chart 1 - Total Sales
    //  -----------------------------------------------------------------------------

    let options1 = {
        series: [{
            name: 'Daily Sales',
            // data: mockChart1Data()
            data: []//jsonSellDashboard.chart1.data
        }],
        noData: {
            text: "Loading Data...",
            // text: "Unable to establish connection with Back-end REST API.",
        },
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false,
            }
        },
        grid: {
            show: true,
            padding: {
                left: 10,
                right: 10
            }
        },
        stroke: {
            width: 7,
            curve: 'smooth'
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        title: {
            text: 'Daily Sales',
            align: 'left',
            style: {
                fontSize: "16px",
                color: '#666'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#1b00ff'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
            },
        },
        markers: {
            size: 4,
            colors: ["#FFA41B"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
                size: 7,
            }
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            title: {
                text: 'Total Sales',
            },
        }
    };

    let chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
    chart1.render();

    jsonSellDashboard.chart1.chart = chart1;
    jsonSellDashboard.chart1.options = options1;

}

function initializeChart2() {

    //  October 2021
    const strCurrentMonthAndYear = generateCurrentFullMonthAndYear();

    /*
        const strCurrentMonthAndYear = new Date().toLocaleDateString('en-GB', {
            month: 'long', year: 'numeric'
        });//.replace(/ /g, '-');
        // console.log(strCurrentMonthAndYear);
    */

    // chart 2 - Total Sales Based on Type of Goods
    jsonSellDashboard.chart2.chart = Highcharts.chart('chart2', {
        title: {
            text: 'Total Sales Based on Type of Goods'
        },
        subtitle: {
            text: strCurrentMonthAndYear
        },
        series: [
            {name: 'Seng Kaki', data: jsonSellDashboard.chart2["Seng Kaki"]},
            {name: 'Seng Lebar', data: jsonSellDashboard.chart2["Seng Lebar"]},
            {name: 'Spandeck', data: jsonSellDashboard.chart2["Spandeck"]},
            {name: 'Galvalum', data: jsonSellDashboard.chart2["Galvalum"]},
            {name: 'Coil', data: jsonSellDashboard.chart2["Coil"]}
        ],
        tooltip: {
            xDateFormat: '%d %b %Y',    //  'DD-Mmm-YYYY'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function () {
                    // return Highcharts.dateFormat('%b/%e/%Y', this.value);
                    return Highcharts.dateFormat('%e %b', this.value);  //  'DD Mmm'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Total Sales'
            }
        },
        chart: {
            type: 'spline',
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1
            },
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                }
            }]
        }
    });


}

async function loadAllChartsData() {

    //  Reset all chart data to 0 on connection failure
    if (jsonSellDashboard.connectionFailure) {
        jsonSellDashboard.chart1.data = [0];
        jsonSellDashboard.chart2.data = [0];
        let strMsg = "Unable to establish connection with Back-end REST API.";
        updateChartOptions(jsonSellDashboard.chart1, strMsg);
        return;
    }

    //  Make GET REST API call to fetch all sales chart data
    await loadDataChart1();

    await loadDataChart2();

    //  Mock API call
    // mockChart1Data();

}

async function loadDataChart1() {

    //  Load data for Chart 1 - Total Sales
    //  Make GET REST API Call to fetch all sales charts data in json
    let url = "http://localhost:8066/sales/daily/all/";
    // let strYearAndMonth = "2021-02";
    let strYearAndMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);

    let jsonResponse = JSON.parse(await fetchJsonFromUrl(url + strYearAndMonth));
    // jsonResponse = JSON.parse(jsonResponse);

    let data = [];
    for (let salesPojo of jsonResponse) {
        let temp = {
            "x": salesPojo["epochMilliSecond"],
            "y": salesPojo["salesAmount"]
        };
        data.push(temp);
        // console.log(temp);
    }
    // console.log(jsonResponse);

    jsonSellDashboard["chart1"]["data"] = data;
    jsonSellDashboard.chart1.chart.updateSeries([{
        name: 'Daily Sales',
        // data: mockChart1Data()
        data: jsonSellDashboard.chart1.data
    }]);

    console.log('Chart 1 Data - loaded successfully.');

}

async function loadDataChart2() {

    //  Load data for Chart 2 - Total Sales Based on Type of Goods
    //  Make GET REST API Call to fetch all sales charts data in json
    // let strYearAndMonth = "2021-02";
    let strYearAndMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    let url = "http://localhost:8066/sales/daily/each-item-type/" + strYearAndMonth;
    let jsonResponse = JSON.parse(await fetchJsonFromUrl(url));

    // console.log(JSON.stringify(jsonResponse));

    /*
        // let arrItemTypes = ["Seng Kaki", "Seng Lebar", "Galvalum", "Spandeck", "Coil"];
            for (let itemType in jsonResponse) {
                console.log(itemType);
                console.log(jsonResponse[itemType]);
            }
    */

    //  Iterate over keys of Json i.e. itemType
    for (let itemType in jsonResponse) {

        //  Check json has own property
        if (!jsonResponse.hasOwnProperty(itemType)) continue;

        let data = [];
        //  Iterate list of daily sales for given itemType
        for (let salesPojo of jsonResponse[itemType]) {
            let temp = {
                "x": salesPojo["epochMilliSecond"],
                "y": salesPojo["salesAmount"]
            };
            data.push(temp);
            // console.log(temp);
        }
        if (data.length !== 0) jsonSellDashboard["chart2"][itemType] = data;

        // console.log("Item Type: " + itemType);
    }

    //  Update Chart2 Series
    jsonSellDashboard.chart2.chart.update({
        series: [
            {name: 'Seng Kaki', data: jsonSellDashboard.chart2["Seng Kaki"]},
            {name: 'Seng Lebar', data: jsonSellDashboard.chart2["Seng Lebar"]},
            {name: 'Spandeck', data: jsonSellDashboard.chart2["Spandeck"]},
            {name: 'Galvalum', data: jsonSellDashboard.chart2["Galvalum"]},
            {name: 'Coil', data: jsonSellDashboard.chart2["Coil"]}
        ]
    });

    console.log('Chart 2 Data - loaded successfully.');

}

function generateCurrentFullMonthAndYear() {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
        month: 'long', year: 'numeric'
    });//.replace(/ /g, '-');
}
