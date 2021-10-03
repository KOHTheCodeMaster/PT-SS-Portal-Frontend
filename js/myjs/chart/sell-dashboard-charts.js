let jsonSellDashboard = {};

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    // new Promise()
    major().then();

});

async function major() {

    console.log("Major Invoked.");
    console.log("Loading Selling Dashboard.");

    initializeJsonSalesChartData();

    if (await testConnectionFailure()) jsonSellDashboard.connectionFailure = true;

    console.log("Connection Failure: " + jsonSellDashboard.connectionFailure);

    await loadAllChartsData();

    await initializeSalesCharts();

    console.log('Sales Dashboard Loaded.');


}

function initializeJsonSalesChartData() {

    //  Initialize jsonProdDashboard chart keys with empty data
    jsonSellDashboard = {
        "chart1": {},
        "chart2": {},
        "connectionFailure": false,
    }

}

async function loadAllChartsData() {

    //  Reset all chart data to 0 on connection failure
    if (jsonSellDashboard.connectionFailure) {
        jsonSellDashboard.chart1.data = [0];
        jsonSellDashboard.chart2.data = [0];
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
    let url = "http://localhost:8066/sales/daily/all/", strYearAndMonth = "2021-02";
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
    console.log('Chart 1 Data - loaded successfully.');

}

async function loadDataChart2() {

    //  Load data for Chart 2 - Total Sales Based on Type of Goods
    //  Make GET REST API Call to fetch all sales charts data in json
    let strYearAndMonth = "2021-02";
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
        // console.log(JSON.stringify(tempData2[itemType]));

    }

    // console.log(JSON.stringify(jsonProdDashboard));
    console.log('Chart 2 Data - loaded successfully.');


}

function initializeSalesCharts() {

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
            data: jsonSellDashboard.chart1.data
        }],
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
            text: 'Total  Sales',
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

}

function initializeChart2() {


    //  October 2021
    const strCurrentMonthAndYear = new Date().toLocaleDateString('en-GB', {
        month: 'long', year: 'numeric'
    });//.replace(/ /g, '-');
    // console.log(strCurrentMonthAndYear);

    // chart 2 - Total Sales Based on Type of Goods
    Highcharts.chart('chart2', {
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

// -----------------

/*

<!-- Chart 1 - Daily Selling -->
var options = {
    series: [{
        name: 'Total Selling',
        data: [14, 13, 30, 19, 29, 19, 22, 19, 12, 17, 29, 15, 13, 19, 27, 12, 17, 25]
    }],
    chart: {
        height: 350,
        type: 'line',
        toolbar: {
            show: false,
        }
    },
    grid: {
        show: false,
        padding: {
            left: 0,
            right: 0
        }
    },
    stroke: {
        width: 7,
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: ['1/2/2021', '1/3/2021', '1/4/2021', '1/5/2021', '1/6/2021', '1/7/2021', '1/8/2021', '1/9/2021', '1/10/2021', '1/11/2021', '1/12/2021', '1/13/2021', '1/14/2021', '1/15/2021', '1/16/2021','1/17/2021' ,'1/18/2021' ,'1/19/2021'],
    },
    title: {
        text: 'Daily Selling',
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
            gradientToColors: [ '#1b00ff'],
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
    yaxis: {
        min: -10,
        max: 40,
        title: {
            text: 'Total Selling',
        },
    }
};
var chart = new ApexCharts(document.querySelector("#chart1"), options);
chart.render();

<!-- Chart 2 - Total Sales by Type of Goods -->
Highcharts.chart('chart2', {
    title: {
        text: 'Total Sales by Type of Goods!'
    },
    subtitle: {
        text: 'January 2021'
    },
    yAxis: {
        title: {
            text: 'Total Selling'
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
    series: [{
        name: 'Seng Kaki (762)',
        data: [5, 6, 10, 8, 14, 5, 6, 1, 8, 4, 7, 3, 15, 6, 10, 8, 14, 11]
    }, {
        name: 'Seng Lebar (914)',
        data: [3, 2, 1, 6, 2, 5, 6, 1, 8, 4, 7, 2, 1, 6, 2, 4, 1, 2]
    }, {
        name: 'Spandeck',
        data: [2, 2, 2, 4, 2, 3, 2, 1, 2, 4, 1, 2, 1, 2, 5, 1, 3, 0]
    }, {
        name: 'Galvalum',
        data: [3, 2, 4, 1, 0, 2, 4, 2, 3, 2, 1, 2, 4, 1, 0, 0, 2, 4 ]
    }, {
        name: 'Coil',
        data: [1, 1, 3, 0, 0, 2, 4, 2, 3, 0, 0, 2, 4, 0, 2, 4, 2, 1]
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            }
        }]
    }
});
*/
