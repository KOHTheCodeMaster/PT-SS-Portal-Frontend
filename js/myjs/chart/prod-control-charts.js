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

    //  Month Report
    //  Initialize Monthly Report Chart
    initMonthlyReportChart();
    //  Update current month in select element
    elementSelectMonth.val(getCurrentMonthNumberAsString());
    //  On Month Refresh Click event
    onMonthRefreshBtnClick(elementSelectMonth);


    //  Year Report
    //  Load & Initialize Yearly Report Chart
    initYearlyReportChart();
    //  Load Yearly Chart Data & Initialize Yearly Report Table
    onYearRefreshBtnClick();


    //  Utility Method
    function getCurrentMonthNumberAsString() {
        let currentMonthNum = new Date().getMonth() + 1 + "";
        return (currentMonthNum < 10)
            ? "0" + currentMonthNum
            : currentMonthNum;
    }

});

//  Refresh Btn. Clicks
//  -------------------

async function onMonthRefreshBtnClick(elementSelectMonth) {

    let elementRefreshBtn = $("#prod-control-month-refresh-btn");

    elementRefreshBtn.click(async function () {
        await monthChanged(elementSelectMonth.val());
    });

    elementRefreshBtn.trigger('click');

}

function onYearRefreshBtnClick() {

    let elementRefreshBtn = $("#prod-control-year-refresh-btn");
    elementRefreshBtn.click(async function () {

        //  Disable Submit btn. to prevent multiple clicks
        disableBtn('#prod-control-year-refresh-btn', 'Refresh');

        let strMsg = "Loading Data...";
        updateChartOptions(jsonProdControl.yearlyChart, strMsg);

        //  Year Report
        //  Load & Initialize Yearly Report Chart
        await loadYearlyChartData();
        //  Wait for 300 ms to load yearly report chart data in background
        await new Promise(resolve => setTimeout(resolve, 300));
        //  Initialize Yearly Report Table
        initYearlyReportTable();

        enableBtn('#prod-control-year-refresh-btn', 'Refresh');
    });

    elementRefreshBtn.trigger('click');

}

//  Month
//  -----
async function monthChanged(month) {

    // console.log("Month Changed - " + month);
    let strMsg = "Loading Data...";
    updateChartOptions(jsonProdControl.monthlyChart, strMsg);

    //  Disable Refresh & Select Month elements to prevent multiple clicks
    let elementSelectMonth = $('#prod-control-select-monthly-report');
    disableBtn('#prod-control-month-refresh-btn', 'Refresh');
    elementSelectMonth.attr('disabled', 'disabled');

    if (await testConnectionFailure()) {
        // console.log("Test Connection Failure.");
        jsonProdControl.connectionFailure = true;

        let strMsg = "Unable to establish connection with Back-end REST API.";
        updateChartOptions(jsonProdControl.monthlyChart, strMsg);

        //  Enable Refresh & Select Month elements
        enableBtn('#prod-control-month-refresh-btn', 'Refresh');
        elementSelectMonth.removeAttr('disabled');
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

    updateMonthlyReportTable().then("Monthly Report Table Updated.");

    //  Enable Refresh & Select Month elements
    enableBtn('#prod-control-month-refresh-btn', 'Refresh');
    elementSelectMonth.removeAttr('disabled');

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
            text: "Loading Data...",
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

async function updateMonthlyReportTable() {

    //  Wait for 500 ms to load yearly report chart data in background
    await new Promise(resolve => setTimeout(resolve, 500));

    //  Add new td element cells in each row of yearly report table

    let classList = ['pr-0', 'text-center'];
    let est = jsonProdControl.monthlyChart.est;
    let rea = jsonProdControl.monthlyChart.rea;
    let monthNum = $('#prod-control-select-monthly-report').val();
    let lengthOfMonth = new Date(2021, monthNum, 0).getDate();

    // console.log(JSON.stringify(jsonProdControl.monthlyChart.rea));

    //  Header
    let elementRowHeader = $('#prod-control-table-monthly-header');
    elementRowHeader.empty();

    elementRowHeader.append(createNewCell('th', '', classList));
    for (let i = 1; i <= lengthOfMonth; i++)
        elementRowHeader.append(createNewCell('th', i, classList));
    //  Add Total Header Element
    elementRowHeader.append(createNewCell('th', 'Total', classList));

    //  EST
    let elementRowEst = $('#prod-control-table-monthly-est');
    elementRowEst.empty();

    let totalEst = 0;
    elementRowEst.append(createNewCell('td', 'Est', classList));
    for (let i = 1; i <= lengthOfMonth; i++) {
        let strValue = est[i - 1] !== undefined ? est[i - 1]["y"] : "-";
        elementRowEst.append(createNewCell('td', strValue, classList));
        totalEst += strValue;
    }
    elementRowEst.append(createNewCell('td', totalEst, classList));

    //  Rea
    let elementRowRea = $('#prod-control-table-monthly-rea');
    elementRowRea.empty();
    let totalRea = 0;
    elementRowRea.append(createNewCell('td', 'Rea', classList));
    for (let i = 1; i <= lengthOfMonth; i++) {
        let strValue = rea[i - 1] !== undefined ? rea[i - 1]["y"] : "-";
        elementRowRea.append(createNewCell('td', strValue, classList));
        totalRea += strValue !== "-" ? strValue : 0;
    }
    totalRea = totalRea === 0 ? '-' : totalRea;
    elementRowRea.append(createNewCell('td', totalRea, classList));

    console.log("Monthly Report Table Initialized successfully.");

}

//  Year
//  -----
function initYearlyReportChart() {
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
            text: "Loading Data...",
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

    console.log("Initialized Yearly Chart.");

}

async function loadYearlyChartData() {

    //  Load data for Monthly Report Chart
    //  Make GET REST API Call to fetch target data for specified month in json
    let est2021Data = [];
    let rea2021Data = [];
    let rea2020Data = [];
    let url, targetList, productionList;

    if (await testConnectionFailure()) {
        // console.log("Test Connection Failure.");
        jsonProdControl.connectionFailure = true;

        let strMsg = "Unable to establish connection with Back-end REST API.";
        updateChartOptions(jsonProdControl.yearlyChart, strMsg);
        return;
    }

    //  Load Estimate 2021 Data - target amount for all months of 2021
    url = "http://localhost:8066/target/p/year/2021";
    targetList = JSON.parse(await fetchJsonFromUrl(url));
    // console.log(JSON.stringify(targetList));
    for (let i = 0; i < 12; i++) {
        let temp = targetList[i] !== undefined ? targetList[i]["targetAmount"] : '-';
        est2021Data.push(temp);
    }
    // for (let targetPojo of targetList) est2021Data.push(targetPojo["targetAmount"]);

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

    console.log("Yearly Chart Loaded successfully.");

}

function initYearlyReportTable() {

    //  Wait for 500 ms to load yearly report chart data in background
    // await new Promise(resolve => setTimeout(resolve, 500));

    let classList = ['text-center'];

    //  Add new td element cells in each row of yearly report table
    let elementRowEst21 = $('#prod-control-table-est21');
    elementRowEst21.empty();
    elementRowEst21.append(createNewCell('td', 'Est 21', classList));
    for (let i = 0; i < 12; i++)
        elementRowEst21.append(createNewCell('td', jsonProdControl.yearlyChart.est2021[i], classList));
    elementRowEst21.append(createNewTotalElementTD(jsonProdControl.yearlyChart.est2021));

    let elementRowRea21 = $('#prod-control-table-rea21');
    elementRowRea21.empty();
    elementRowRea21.append(createNewCell('td', 'Rea 21', classList));
    for (let i = 0; i < 12; i++)
        elementRowRea21.append(createNewCell('td', jsonProdControl.yearlyChart.rea2021[i], classList));
    elementRowRea21.append(createNewTotalElementTD(jsonProdControl.yearlyChart.rea2021));

    let elementRowRea20 = $('#prod-control-table-rea20');
    elementRowRea20.empty();
    elementRowRea20.append(createNewCell('td', 'Rea 20', classList));
    for (let i = 0; i < 12; i++)
        elementRowRea20.append(createNewCell('td', jsonProdControl.yearlyChart.rea2020[i], classList));
    elementRowRea20.append(createNewTotalElementTD(jsonProdControl.yearlyChart.rea2020));

    console.log("Yearly Report Table Initialized successfully.");

}

//  Utility Methods
//  ---------------

function createNewCell(tagName, strValue, classList) {
    let elementNewCell = document.createElement(tagName);
    elementNewCell.classList.add(...classList);
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

