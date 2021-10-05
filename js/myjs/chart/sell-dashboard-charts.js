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

    let strMsg = "Loading Data...";
    updateChartOptions(jsonSellDashboard.chart1, strMsg);

    await loadAllChartsData();

    console.log('Sales Dashboard Loaded.');


}

function initializeSalesCharts() {

    //  Initialize jsonProdDashboard chart keys with empty data
    jsonSellDashboard = {
        "chart1": {},
        "chart2": {},
        "connectionFailure": false,
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
