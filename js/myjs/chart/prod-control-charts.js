
//  Initialize json prod control - shared data among functions
let jsonProdControl = {
    "connectionFailure": false,
    "monthlyChart": {
        "est": [],
        "rea": []
    },
    "yearlyChartData": {}
}

jQuery(document).ready(function () {

    //  Apply on click listener to select month element
    let elementSelectMonth = $("#prod-control-select-monthly-report");
    elementSelectMonth.change(function () {
        monthChanged(this.value).then();
    });

    initMonthlyReportChart();
    initYearlyReportChart();

    //  Switch to current Month
    monthChanged(getCurrentMonthAsString()).then();

    //  Update current month in select element
    elementSelectMonth.val(getCurrentMonthAsString());

    function getCurrentMonthAsString() {
        let currentMonthNum = new Date().getMonth() + 1 + "";
        return (currentMonthNum < 10)
            ? "0" + currentMonthNum
            : currentMonthNum;
    }

});

async function monthChanged(month) {

    // console.log("Month Changed - " + month);

    if (await testConnectionFailure()) {
        console.log("Test Connection Failure.");
        jsonProdControl.connectionFailure = true;

        let options = jsonProdControl.monthlyChart.options;
        options.noData.text = "Unable to establish connection with Back-end REST API.";
        options.series = [];

        //  On Connection Failure - Update Chart Options with empty series & text
        // jsonProdControl.monthlyChart.chart.updateSeries([]);
        jsonProdControl.monthlyChart.chart.updateOptions(options);
        return;
    }

    await loadMonthlyChartData(month);

    //  Update Series with Chart Data
    jsonProdControl.monthlyChart.chart.updateSeries([{
        name: 'Estimate',
        data: jsonProdControl.monthlyChart.est
        // data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    }, {
        name: 'Realised',
        data: jsonProdControl.monthlyChart.rea
        // data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 20, 20, 20, 20, 20, 20, 20, 20]
    }]);

    console.log("Monthly Chart Updated.");

}

async function loadMonthlyChartData(month) {

    //  Load data for Monthly Report Chart
    //  Make GET REST API Call to fetch target data for specified month in json
    let estMonthlyData = [];
    let reaMonthlyData = [];
    let strYearAndMonth = "2021-" + month;

    //  Load Estimate Data - target amount for all types
    let url = "http://localhost:8066/target/p/year-month/" + strYearAndMonth;
    let targetList = JSON.parse(await fetchJsonFromUrl(url));

    for (let dailyTarget of targetList) {
        let temp = {
            "x": dailyTarget["epochMilliSecond"],
            "y": dailyTarget["dailyTargetAmount"]
        };
        estMonthlyData.push(temp);
    }

    //  Load Realised Data - 1st class production data for all types
    url = "http://localhost:8066/production/monthly/all/";
    let productionList = JSON.parse(await fetchJsonFromUrl(url + strYearAndMonth));

    for (let dailyProduction of productionList)
        reaMonthlyData.push({
            "x": dailyProduction["epochMilliSecond"],
            "y": dailyProduction["dailyProductionAmount"]
        });

    jsonProdControl.monthlyChart.est = estMonthlyData;
    jsonProdControl.monthlyChart.rea = reaMonthlyData;
    // console.log(JSON.stringify(jsonProdControl.monthlyChart));

}

function initMonthlyReportChart() {

    let options = {
        series: [{
            name: 'Estimate',
            data: jsonProdControl.monthlyChart.est
            // data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
        }, {
            name: 'Realised',
            data: jsonProdControl.monthlyChart.rea
            // data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 20, 20, 20, 20, 20, 20, 20, 20]
        }],
        noData: {
            text: "Loading Data.",
            // text: "Unable to establish connection with Back-end REST API.",
        },
        chart: {
            height: 350,
            type: 'area',
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
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            },
        },
    };
    let chart = new ApexCharts(document.querySelector("#prod-control-monthly-report-chart"), options);
    chart.render();

    jsonProdControl.monthlyChart.chart = chart;
    jsonProdControl.monthlyChart.options = options;

}

function initYearlyReportChart() {
    let options = {
        series: [{
            name: 'Realization 2019',
            type: 'column',
            data: [300, 330, 300, 330, 300, 330, 300, 330, 300, 330, 300, 330]
        }, {
            name: 'Estimation 2020',
            type: 'area',
            data: [300, 330, 300, 330, 300, 330, 300, 330, 300, 330, 300, 330]
        }, {
            name: 'Realization 2020',
            type: 'line',
            data: [300, 330, 300, 330, 300, 330, 300, 330, 300, 330, 300, 330]
        }],
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
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
            width: [0, 2, 5],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '20%'
            }
        },

        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: ['01/01/2020', '02/01/2020', '03/01/2020', '04/01/2020', '05/01/2020', '06/01/2020', '07/01/2020',
            '08/01/2020', '09/01/2020', '10/01/2020', '11/01/2020', '12/01/2020'
        ],
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            title: {
                text: 'Ton',
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " ton";
                    }
                    return y;

                }
            }
        }
    };
    let chart = new ApexCharts(document.querySelector("#prod-control-yearly-report-chart"), options);
    chart.render();
}

async function loadYearlyChartData() {

    //  Load data for Monthly Report Chart
    //  Make GET REST API Call to fetch target data for specified month in json

}
