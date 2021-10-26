let jsonDashboard = {};
let listOfTypeOfGoods = ['Seng Kaki', 'Seng Lebar', 'Spandeck', 'Galvalum', 'Coil'];

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    // console.log("Test - Time Stamp: " + new Date());

    init().then();

});


async function init() {

    let currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser === null) window.location.href = '/PT-SS-Portal-Frontend/login.html';

    // console.log(currentUser.userRole);
    updateLeftSideBar();

    jsonDashboard = {
        chart1: {
            targetData: [],
            prodData: []
        },
        chart2: {data: []},
        chart3: {data: []},
        chart4: {
            chart: {},
            data: []
        },
        chart5: {data: []}
    }


    await loadChartData();

    initChart1();
    initChart2();
    initChart3();
    initChart4();
    initChart5();

    // console.log(JSON.stringify(jsonDashboard.chart1.prodData));

}

async function loadChartData() {

    await loadDataChart1();
    await loadDataChart2And4();
    await loadDataChart3();
    await loadDataChart5();

    console.log('All Charts loaded successfully.');

}

function initChart1() {

    //  Chart 1 - Total Production Against Production Target
    //  -----------------------------------------------------------------------------

    let options1 = {
        series: [{
            name: 'Target',
            data: jsonDashboard.chart1.targetData
        }, {
            name: 'Production',
            data: jsonDashboard.chart1.prodData
        }],
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
            categories: ['1/2/2021', '1/3/2021', '1/4/2021', '1/5/2021', '1/6/2021', '1/7/2021', '1/8/2021', '1/9/2021', '1/10/2021', '1/11/2021', '1/12/2021', '1/13/2021', '1/14/2021', '1/15/2021', '1/16/2021', '1/17/2021', '1/18/2021', '1/19/2021'],
        },
        title: {
            text: 'Total Production Against Production Target',
            align: 'left',
            style: {
                fontSize: "16px",
                color: '#666'
            }
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            },
        },
        yaxis: {
            title: {
                text: 'Production Amount',
            },
        }
    };
    let chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
    chart1.render();

}

function initChart2() {

    let options2 = {
        // series: [44, 55, 31, 27],
        series: jsonDashboard.chart2.data,
        chart: {
            type: 'donut',
        },
        labels: listOfTypeOfGoods,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    let chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
    chart2.render();
    jsonDashboard.chart2.chart = chart2;

}

function initChart3() {

    let options3 = {
        series: jsonDashboard.chart3.data,
        chart: {
            type: 'donut',
        },
        labels: listOfTypeOfGoods,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    let chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
    chart3.render();
    jsonDashboard.chart3.chart = chart3;

}

function initChart4() {

    // chart 2 - Total Production Based on Type of Goods
    jsonDashboard.chart4.chart = Highcharts.chart('chart4', {
        title: {
            text: 'Amount of Incoming Goods on Type of Goods'
        },
        subtitle: {
            text: generateCurrentFullMonthAndYear()
        },
        series: [
            {name: 'Seng Kaki', data: jsonDashboard.chart4.data["Seng Kaki"]},
            {name: 'Seng Lebar', data: jsonDashboard.chart4.data["Seng Lebar"]},
            {name: 'Spandeck', data: jsonDashboard.chart4.data["Spandeck"]},
            {name: 'Galvalum', data: jsonDashboard.chart4.data["Galvalum"]},
            {name: 'Coil', data: jsonDashboard.chart4.data["Coil"]}
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
                text: 'Amount of Incoming Goods'
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

function initChart5() {

    //  Chart 5 - Amount of Available Goods
    //  -----------------------------------------------------------------------------
    let options5 = {
        series: [{
            name: 'Amount of Available Goods',
            // data: mockChart1Data()
            data: jsonDashboard.chart5.data
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
            text: 'Amount of Available Goods',
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
                text: 'Amount of Available Goods',
            },
        }
    };

    let chart5 = new ApexCharts(document.querySelector("#chart5"), options5);
    chart5.render();

}

async function loadDataChart1() {

    //  Load data for Chart 1 - Total Production Against Production Target
    //  Make GET REST API Call to fetch all production charts data in json
    let strYearAndMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    let url = "http://localhost:8066/target/p/year-month/" + strYearAndMonth;
    let targetList = JSON.parse(await fetchJsonFromUrl(url));
    let data = [];

    //  Iterate targetList & add dailyTarget to data array
    for (let dailyTarget of targetList) {
        let temp = {
            "x": dailyTarget["epochMilliSecond"],
            "y": dailyTarget["targetAmount"]
        };
        data.push(temp);
    }
    jsonDashboard.chart1.targetData = data;

    //  Load data for Chart 1 - Total Production
    //  Make GET REST API Call to fetch all production charts data in json
    url = "http://localhost:8066/production/daily/all/";
    // strYearAndMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    let prodList = JSON.parse(await fetchJsonFromUrl(url + strYearAndMonth));
    // prodList = JSON.parse(prodList);

    data = [];
    for (let productionPojo of prodList) {
        let temp = {
            "x": productionPojo["epochMilliSecond"],
            "y": productionPojo["productionAmount"]
        };
        data.push(temp);
    }
    jsonDashboard.chart1.prodData = data;

    // console.log(jsonDashboard.chart1.data);
    // console.log('Chart 1 Data - loaded successfully.');

}

async function loadDataChart3() {

    //  Load data for Chart 3 - Total Sales Based on Type of Goods
    //  Make GET REST API Call to fetch all sales charts data in json
    // let strYearAndMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    let strYearAndMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    let url = "http://localhost:8066/sales/daily/each-item-type/" + strYearAndMonth;
    let jsonResponse = JSON.parse(await fetchJsonFromUrl(url));
    let arr = {};
    let totalGoodsSold = 0;

    //  Iterate over keys of Json i.e. itemType
    for (let itemType in jsonResponse) {
        let goodsCount = 0;
        //  Check json has own property
        if (!jsonResponse.hasOwnProperty(itemType)) continue;

        //  Iterate list of daily sales for given itemType
        for (let salesPojo of jsonResponse[itemType]) {
            goodsCount += salesPojo["salesAmount"];
            // console.log(temp);
        }
        arr[itemType] = goodsCount;
        totalGoodsSold += goodsCount;
        // console.log("Item Type: " + itemType + ' | length: ' + arr[itemType]);
    }
    // console.log(JSON.stringify(arr));

    for (let itemType of listOfTypeOfGoods)
        jsonDashboard.chart3.data.push(arr[itemType]);

    // console.log('Chart 3 Data - loaded successfully.');

}

async function loadDataChart2And4() {

    //  Load data for Chart 2 - Total Production Based on Type of Goods
    //  Make GET REST API Call to fetch all production charts data in json
    let strYearAndMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    let url = "http://localhost:8066/corrugation/daily/each-item-type/" + strYearAndMonth;
    let jsonResponse = JSON.parse(await fetchJsonFromUrl(url));
    let totalCount = 0;
    let arr = {};

    //  Iterate over keys of Json i.e. itemType
    for (let itemType in jsonResponse) {

        let count = 0;
        //  Check json has own property
        if (!jsonResponse.hasOwnProperty(itemType)) continue;

        let data = [];
        //  Iterate list of daily production for given itemType
        for (let productionPojo of jsonResponse[itemType]) {
            let temp = {
                "x": productionPojo["epochMilliSecond"],
                "y": productionPojo["productionAmount"]
            };
            data.push(temp);
            count += temp.y;
            // console.log(temp);
        }
        if (data.length !== 0) jsonDashboard.chart4.data[itemType] = data;
        arr[itemType] = count;
        totalCount += count;

        // console.log("Item Type: " + itemType + ' - ' + count);
    }

    for (let itemType of listOfTypeOfGoods)
        jsonDashboard.chart2.data.push(arr[itemType]);

    //  Update Chart 4
    /*    jsonDashboard.chart4.chart.update({
            series: [
                {name: 'Seng Kaki', data: jsonDashboard.chart4.data["Seng Kaki"]},
                {name: 'Seng Lebar', data: jsonDashboard.chart4.data["Seng Lebar"]},
                {name: 'Spandeck', data: jsonDashboard.chart4.data["Spandeck"]},
                {name: 'Galvalum', data: jsonDashboard.chart4.data["Galvalum"]},
                {name: 'Coil', data: jsonDashboard.chart4.data["Coil"]}
            ]
        });*/

    // console.log(JSON.stringify(jsonDashboard));
    // console.log('Chart 4 Data - loaded successfully.');


}

async function loadDataChart5() {

    //  Load data for Chart 1 - Total Production
    //  Make GET REST API Call to fetch all production charts data in json
    let url = "http://localhost:8066/production/daily/all/";
    let strYearAndMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    let jsonResponse = JSON.parse(await fetchJsonFromUrl(url + strYearAndMonth));
    // jsonResponse = JSON.parse(jsonResponse);

    let data = [];
    for (let productionPojo of jsonResponse) {
        let temp = {
            "x": productionPojo["epochMilliSecond"],
            "y": productionPojo["productionAmount"]
        };
        data.push(temp);
        // console.log(temp);
    }
    // console.log(jsonResponse);

    jsonDashboard.chart5.data = data;
    // console.log('Chart 5 Data - loaded successfully.');

}


