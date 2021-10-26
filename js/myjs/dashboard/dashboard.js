let currentUser;
let jsonDashboard;

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    // console.log("Test - Time Stamp: " + new Date());

    init();

});


async function init() {

    currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser === null) window.location.href = '/PT-SS-Portal-Frontend/login.html';

    // console.log(currentUser.userRole);
    updateLeftSideBar();

    //  Update User details on Dashboard
    updateUserDetails();

    jsonDashboard = {
        chart1: 0,
        chart2: 0,
        chart3: 0,
        chart4: 0,
        chart5: {
            productionData: [],
            sellingData: []
        }
    }

    await loadChartData();

    initChart1234();

    initializeChart5And6();

}

function initializeChart5And6() {

    let options5 = {
        series: [{
            name: 'In Progress',    //  Production
            data: jsonDashboard.chart5.productionData
        }, {
            name: 'Complete',       //  Selling
            data: jsonDashboard.chart5.sellingData
        }],
        chart: {
            height: 350,
            type: 'bar',
            parentHeightOffset: 0,
            fontFamily: 'Poppins, sans-serif',
            toolbar: {
                show: false,
            },
        },
        colors: ['#1b00ff', '#f56767'],
        grid: {
            borderColor: '#c7d2dd',
            strokeDashArray: 5,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '25%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: {
                    colors: ['#353535'],
                    fontSize: '16px',
                },
            },
            axisBorder: {
                color: '#8fa6bc',
            }
        },
        yaxis: {
            title: {
                text: ''
            },
            labels: {
                style: {
                    colors: '#353535',
                    fontSize: '16px',
                },
            },
            axisBorder: {
                color: '#f00',
            }
        },
        legend: {
            horizontalAlign: 'right',
            position: 'top',
            fontSize: '16px',
            offsetY: 0,
            labels: {
                colors: '#353535',
            },
            markers: {
                width: 10,
                height: 10,
                radius: 15,
            },
            itemMargin: {
                vertical: 0
            },
        },
        fill: {
            opacity: 1

        },
        tooltip: {
            style: {
                fontSize: '15px',
                fontFamily: 'Poppins, sans-serif',
            },
            y: {
                formatter: function (val) {
                    return val
                }
            }
        }
    }

    let chart5 = new ApexCharts(document.querySelector("#chart5"), options5);
    chart5.render();

}

function initDataTable() {
    $('.data-table').DataTable({
        scrollCollapse: true,
        autoWidth: true,
        responsive: true,
        searching: false,
        bLengthChange: false,
        bPaginate: false,
        bInfo: false,
        columnDefs: [{
            targets: "datatable-nosort",
            orderable: false,
        }],
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "language": {
            "info": "_START_-_END_ of _TOTAL_ entries",
            searchPlaceholder: "Search",
            paginate: {
                next: '<i class="ion-chevron-right"></i>',
                previous: '<i class="ion-chevron-left"></i>'
            }
        },
    });
}

function initChart1234() {

    $('.current-year').text(new Date().getFullYear());
    $('.full-month-year').text(generateCurrentFullMonthAndYear());

    //  Chart 1 - % completion of Monthly Production against Target
    let options1 = {
        series: [jsonDashboard.chart1],
        grid: {
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        },
        chart: {
            height: 100,
            width: 70,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '50%',
                },
                dataLabels: {
                    name: {
                        show: false,
                        color: '#fff'
                    },
                    value: {
                        show: true,
                        color: '#333',
                        offsetY: 5,
                        fontSize: '15px'
                    }
                }
            }
        },
        colors: ['#ecf0f4'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'diagonal1',
                shadeIntensity: 0.8,
                gradientToColors: ['#1b00ff'],
                inverseColors: false,
                opacityFrom: [1, 0.2],
                opacityTo: 1,
                stops: [0, 100],
            }
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            active: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
        }
    };

    //  Chart 2 - % completion of Monthly Selling against Target
    let options2 = {
        series: [jsonDashboard.chart2],
        grid: {
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        },
        chart: {
            height: 100,
            width: 70,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '50%',
                },
                dataLabels: {
                    name: {
                        show: false,
                        color: '#fff'
                    },
                    value: {
                        show: true,
                        color: '#333',
                        offsetY: 5,
                        fontSize: '15px'
                    }
                }
            }
        },
        colors: ['#ecf0f4'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'diagonal1',
                shadeIntensity: 1,
                gradientToColors: ['#009688'],
                inverseColors: false,
                opacityFrom: [1, 0.2],
                opacityTo: 1,
                stops: [0, 100],
            }
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            active: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
        }
    };

    //  Chart 3 - % completion of Annual Production against Target
    let options3 = {
        series: [jsonDashboard.chart3],
        grid: {
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        },
        chart: {
            height: 100,
            width: 70,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '50%',
                },
                dataLabels: {
                    name: {
                        show: false,
                        color: '#fff'
                    },
                    value: {
                        show: true,
                        color: '#333',
                        offsetY: 5,
                        fontSize: '15px'
                    }
                }
            }
        },
        colors: ['#ecf0f4'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'diagonal1',
                shadeIntensity: 0.8,
                gradientToColors: ['#f56767'],
                inverseColors: false,
                opacityFrom: [1, 0.2],
                opacityTo: 1,
                stops: [0, 100],
            }
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            active: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
        }
    };

    //  Chart 4 - % completion of Annual Selling against Target
    let options4 = {
        series: [jsonDashboard.chart4],
        grid: {
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        },
        chart: {
            height: 100,
            width: 70,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '50%',
                },
                dataLabels: {
                    name: {
                        show: false,
                        color: '#fff'
                    },
                    value: {
                        show: true,
                        color: '#333',
                        offsetY: 5,
                        fontSize: '15px'
                    }
                }
            }
        },
        colors: ['#ecf0f4'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'diagonal1',
                shadeIntensity: 0.8,
                gradientToColors: ['#2979ff'],
                inverseColors: false,
                opacityFrom: [1, 0.5],
                opacityTo: 1,
                stops: [0, 100],
            }
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            active: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
        }
    };

    //  Render Charts
    new ApexCharts(document.querySelector("#chart1"), options1).render();
    new ApexCharts(document.querySelector("#chart2"), options2).render();
    new ApexCharts(document.querySelector("#chart3"), options3).render();
    new ApexCharts(document.querySelector("#chart4"), options4).render();

}

async function loadChartData() {

    await loadDailyProdChartData();
    await loadDailySellingChartData();
    await loadMonthlyProductionChartData();
    await loadMonthlySellingChartData();

}

async function loadDailyProdChartData() {

    //  Load data for Monthly Production %
    //  Make GET REST API Call to fetch target data for specified month in json
    let totalEstMonthlyData = 0;
    let totalReaMonthlyData = 0;
    let strYearAndMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);

    //  Load Estimate Data - target amount for all types
    let url = "http://localhost:8066/target/p/year-month/" + strYearAndMonth;
    let targetList = JSON.parse(await fetchJsonFromUrl(url));

    //  Process total monthly target data
    for (let dailyTarget of targetList) totalEstMonthlyData += parseInt(dailyTarget["targetAmount"]);

    //  Load Realised Data - 1st class production data for all types
    url = "http://localhost:8066/production/daily/all/";
    let productionList = JSON.parse(await fetchJsonFromUrl(url + strYearAndMonth));

    //  Process total monthly production realised data
    for (let productionPojo of productionList) totalReaMonthlyData += parseInt(productionPojo["productionAmount"]);

    //  Percentage -> (Total Rea / Total Target) * 100
    jsonDashboard.chart1 = parseInt(totalReaMonthlyData * 100 / totalEstMonthlyData);

}

async function loadDailySellingChartData() {

    let totalEstMonthlyData = 0;
    let totalReaMonthlyData = 0;
    let strYearAndMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);

    //  Load data for Monthly Selling %
    //  Make GET REST API Call to fetch target data for specified month in json
    let url = "http://localhost:8066/target/s/year-month/" + strYearAndMonth;
    let targetList = JSON.parse(await fetchJsonFromUrl(url));

    //  Process total monthly target data
    for (let dailyTarget of targetList) totalEstMonthlyData += parseInt(dailyTarget["targetAmount"]);

    //  Load Realised Data - 1st class selling data for all types
    url = "http://localhost:8066/sales/daily/all/";
    let sellingList = JSON.parse(await fetchJsonFromUrl(url + strYearAndMonth));

    //  Process total monthly selling realised data
    for (let sellingPojo of sellingList) totalReaMonthlyData += parseInt(sellingPojo["salesAmount"]);

    //  Percentage -> (Total Rea / Total Target) * 100
    jsonDashboard.chart2 = parseInt(totalReaMonthlyData * 100 / totalEstMonthlyData);

}

async function loadMonthlyProductionChartData() {

    let totalEstMonthlyData = 0;
    let totalReaMonthlyData = 0;
    let strYear = new Date().getFullYear();

    if (await testConnectionFailure()) {
        // console.log("Test Connection Failure.");
        jsonDashboard.connectionFailure = true;

        // let strMsg = "Unable to establish connection with Back-end REST API.";
        // updateChartOptions(jsonProdControl.yearlyChart, strMsg);
        return;
    }

    //  Load data for Annual Production %
    //  Make GET REST API Call to fetch target data for specified month in json
    let url = "http://localhost:8066/target/p/year/";
    let targetList = JSON.parse(await fetchJsonFromUrl(url + strYear));

    //  Process total monthly target data
    for (let dailyTarget of targetList) totalEstMonthlyData += parseInt(dailyTarget["targetAmount"]);

    //  Load Realised Data - 1st class selling data for all types
    url = "http://localhost:8066/production/monthly/";
    let productionList = JSON.parse(await fetchJsonFromUrl(url + strYear));

    //  Process total monthly selling realised data
    for (let productionPojo of productionList) {
        let currentProdData = parseInt(productionPojo["productionAmount"]);
        let month = productionPojo["productionDate"].split('-')[1];
        
        // jsonDashboard.chart5.productionData[month] = currentProdData;
        totalReaMonthlyData += currentProdData;
    }

    //  Percentage -> (Total Rea / Total Target) * 100
    jsonDashboard.chart3 = parseInt(totalReaMonthlyData * 100 / totalEstMonthlyData);

}

async function loadMonthlySellingChartData() {

    //  Load data for Yearly Selling %
    //  Make GET REST API Call to fetch target data for specified month in json
    let totalEstAnnualData = 0;
    let totalReaAnnualData = 0;
    let url, targetList, sellingList;
    let strYear = new Date().getFullYear();

    if (await testConnectionFailure()) {
        // console.log("Test Connection Failure.");
        jsonDashboard.connectionFailure = true;

        // let strMsg = "Unable to establish connection with Back-end REST API.";
        // updateChartOptions(jsonSellControl.yearlyChart, strMsg);
        return;
    }

    //  Load Estimate 2021 Data - target amount for all months of 2021
    url = "http://localhost:8066/target/s/year/" + strYear;
    targetList = JSON.parse(await fetchJsonFromUrl(url));
    // console.log(JSON.stringify(targetList));
    /*for (let i = 0; i < 12; i++) {
        let temp = targetList[i] !== undefined ? targetList[i]["targetAmount"] : 0;
        totalEstAnnualData += parseInt(temp);
    }*/
    for (let targetPojo of targetList) totalEstAnnualData += parseInt(targetPojo["targetAmount"]);

    //  Load Realization 2021 Data - selling amount for all months of 2021
    url = "http://localhost:8066/sales/monthly/" + strYear;
    sellingList = JSON.parse(await fetchJsonFromUrl(url));
    for (let sellingPojo of sellingList) totalReaAnnualData += parseInt(sellingPojo["salesAmount"]);

    jsonDashboard.chart4 = parseInt((totalReaAnnualData * 100 / totalEstAnnualData));
    console.log("Yearly Chart Loaded successfully.");

}


function updateUserDetails() {

    console.log("Update User Details on Dashboard");
    // document.querySelector('.user-full-name').textContent = currentUser.name;
    $('.user-full-name').text(currentUser.name);
    document.querySelector('.user-first-name').textContent = currentUser.name;

}


