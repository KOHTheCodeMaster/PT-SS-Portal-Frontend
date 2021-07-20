//  Initialize json prod control - shared data among functions
let jsonProdControl = {
    "connectionFailure": false,
    "monthlyChart": {
        "est": [],
        "rea": []
    },
    "yearlyChart": {
        "est2021": [],
        "rea2021": [],
        "rea2020": [],
    }
}

jQuery(document).ready(function () {

    //  Apply on click listener to select month element
    let elementSelectMonth = $("#prod-control-select-monthly-report");
    elementSelectMonth.change(function () {
        monthChanged(this.value).then();
    });

    //  Year Report
    //  Load & Initialize Yearly Report Chart
    initYearlyReportChart().then(() => console.log("Initialized Yearly Chart."));
    loadYearlyChartData().then(() => console.log("Yearly Chart Loaded successfully."));

    //  Initialize Yearly Report Table
    initYearlyReportTable().then(() => console.log("Initialized Yearly Report Table."));

    //  Month Report
    //  Initialize Monthly Report Chart
    initMonthlyReportChart();

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
            "y": dailyTarget["targetAmount"]
        };
        estMonthlyData.push(temp);
    }

    //  Load Realised Data - 1st class production data for all types
    url = "http://localhost:8066/production/daily/all/";
    let productionList = JSON.parse(await fetchJsonFromUrl(url + strYearAndMonth));

    for (let productionPojo of productionList)
        reaMonthlyData.push({
            "x": productionPojo["epochMilliSecond"],
            "y": productionPojo["productionAmount"]
        });

    jsonProdControl.monthlyChart.est = estMonthlyData;
    jsonProdControl.monthlyChart.rea = reaMonthlyData;
    // console.log(estMonthlyData);
    // console.log(reaMonthlyData);

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
                format: 'dd MMM yyyy'
            },
        },
    };
    let chart = new ApexCharts(document.querySelector("#prod-control-monthly-report-chart"), options);
    chart.render();

    jsonProdControl.monthlyChart.chart = chart;
    jsonProdControl.monthlyChart.options = options;

}

async function initYearlyReportChart() {
    let options = {
        series: [{
            name: 'Estimation 2021',
            type: 'area',
            data: jsonProdControl.yearlyChart.est2021
            // data: [300, 330, 300, 330, 300, 330, 300, 330, 300, 330, 300, 330]
        }, {
            name: 'Realization 2021',
            type: 'line',
            data: jsonProdControl.yearlyChart.rea2021
            // data: [300, 330, 300, 330, 300, 330, 300, 330, 300, 330, 300, 330]
        }, {
            name: 'Realization 2020',
            type: 'column',
            data: jsonProdControl.yearlyChart.rea2020
            // data: [300, 330, 300, 330, 300, 330, 300, 330, 300, 330, 300, 330]
        }],
        noData: {
            text: "Loading Data.",
        },
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
            // width: [0, 2, 5],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '20%'
            }
        },
        /*        fill: {
                    opacity: [0.85, 0.25, 1],
                    gradient: {
                        inverseColors: false,
                        shade: 'light',
                        type: "vertical",
                        opacityFrom: 0.85,
                        opacityTo: 0.55,
                        stops: [0, 100, 100, 100]
                    }
                },*/
        markers: {
            size: 0
        },
        xaxis: {
            // type: 'datetime',
            type: 'category',
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December',]
        },
        yaxis: {
            title: {
                text: 'Ton',
            },
            // min: 0
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

    jsonProdControl.yearlyChart.chart = chart;
    jsonProdControl.yearlyChart.options = options;

}

async function loadYearlyChartData() {

    //  Load data for Monthly Report Chart
    //  Make GET REST API Call to fetch target data for specified month in json
    let est2021Data = [];
    let rea2021Data = [];
    let rea2020Data = [];
    let url, targetList, productionList;

    if (await testConnectionFailure()) {
        console.log("Test Connection Failure.");
        jsonProdControl.connectionFailure = true;

        let options = jsonProdControl.yearlyChart.options;
        options.noData.text = "Unable to establish connection with Back-end REST API.";
        options.series = [];

        //  On Connection Failure - Update Chart Options with empty series & text
        // jsonProdControl.yearlyChart.chart.updateSeries([]);
        jsonProdControl.yearlyChart.chart.updateOptions(options);
        return;
    }

    //  Load Estimate 2021 Data - target amount for all months of 2021
    url = "http://localhost:8066/target/p/year/2021";
    targetList = JSON.parse(await fetchJsonFromUrl(url));
    // console.log(JSON.stringify(targetList));
    for (let targetPojo of targetList) est2021Data.push(targetPojo["targetAmount"]);

    //  Load Realization 2021 Data - production amount for all months of 2021
    url = "http://localhost:8066/production/monthly/2021";
    productionList = JSON.parse(await fetchJsonFromUrl(url));
    for (let productionPojo of productionList) rea2021Data.push(productionPojo["productionAmount"]);

    //  Load Realization 2020 Data - production amount for all months of 2020
    url = "http://localhost:8066/production/monthly/2020";
    productionList = JSON.parse(await fetchJsonFromUrl(url));
    for (let productionPojo of productionList) rea2020Data.push(productionPojo["productionAmount"]);

    // console.log(JSON.stringify(est2021Data));
    // console.log(JSON.stringify(rea2021Data));
    // console.log(JSON.stringify(rea2020Data));

    jsonProdControl.yearlyChart.est2021 = est2021Data;
    jsonProdControl.yearlyChart.rea2021 = rea2021Data;
    jsonProdControl.yearlyChart.rea2020 = rea2020Data;

    jsonProdControl.yearlyChart.chart.updateSeries([{
        name: 'Estimation 2021',
        type: 'area',
        data: jsonProdControl.yearlyChart.est2021
    }, {
        name: 'Realization 2021',
        type: 'line',
        data: jsonProdControl.yearlyChart.rea2021
    }, {
        name: 'Realization 2020',
        type: 'column',
        data: jsonProdControl.yearlyChart.rea2020
    }]);

}

async function initYearlyReportTable() {

    //  Wait for 500 ms to load yearly report chart data in background
    await new Promise(resolve => setTimeout(resolve, 500));

    //  Add new td element cells in each row of yearly report table
    let elementRowEst21 = $('#prod-control-table-est21');
    for (let i = 0; i < 12; i++) elementRowEst21.append(createNewElementTD(jsonProdControl.yearlyChart.est2021[i]));
    elementRowEst21.append(createNewTotalElementTD(jsonProdControl.yearlyChart.est2021));

    let elementRowRea21 = $('#prod-control-table-rea21');
    for (let i = 0; i < 12; i++) elementRowRea21.append(createNewElementTD(jsonProdControl.yearlyChart.rea2021[i]));
    elementRowRea21.append(createNewTotalElementTD(jsonProdControl.yearlyChart.rea2021));

    let elementRowRea20 = $('#prod-control-table-rea20');
    for (let i = 0; i < 12; i++) elementRowRea20.append(createNewElementTD(jsonProdControl.yearlyChart.rea2020[i]));
    elementRowRea20.append(createNewTotalElementTD(jsonProdControl.yearlyChart.rea2020));

    console.log("Yearly Report Table Initialized successfully.");

}

function createNewElementTD(strValue) {
    let elementNewCell = document.createElement("td");
    elementNewCell.classList.add("text-center");
    elementNewCell.innerText = strValue !== undefined ? strValue : "-";
    return elementNewCell;
}

function createNewTotalElementTD(amountArr) {
    let total = 0;
    for (let amount of amountArr) total += amount;

    //  Create new element for total
    let elementTotal = document.createElement("td");
    elementTotal.classList.add("text-center");
    elementTotal.innerText = total.toString();
    return elementTotal;
}
