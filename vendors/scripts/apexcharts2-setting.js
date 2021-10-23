let jsonProdDashboard = {};

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    // new Promise()
    major();

});

async function major() {

    console.log("Major Invoked.");
    console.log("Loading Production Dashboard.");

    if (await testConnectionFailure()) return;

    await initializeJsonProductionChartData();

    await initializeProductionCharts();

    console.log('Production Dashboard Loaded.');


}

async function initializeJsonProductionChartData() {

    //  Initialize jsonProdDashboard chart keys with empty data
    jsonProdDashboard = {
        "chart1": {},
        "chart2": {},
        "chart7": {
            "data1stClass": {},
            "data2ndClass": {},
        },
    }

    //  Make GET REST API call to fetch all production chart data
    await loadDataChart1();

    await loadDataChart2();

    await loadDataChart7();

    //  Mock API call
    // mockChart1Data();

}

async function loadDataChart1() {

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

    jsonProdDashboard["chart1"]["data"] = data;
    console.log('Chart 1 Data - loaded successfully.');

}

async function loadDataChart2() {

    //  Load data for Chart 2 - Total Production Based on Type of Goods
    //  Make GET REST API Call to fetch all production charts data in json
    let strYearAndMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    let url = "http://localhost:8066/corrugation/daily/each-item-type/" + strYearAndMonth;
    let jsonResponse = JSON.parse(await fetchJsonFromUrl(url));

    // let arrItemTypes = ["Seng Kaki", "Seng Lebar", "Galvalum", "Spandeck", "Coil"];
    /*
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
        //  Iterate list of daily production for given itemType
        for (let productionPojo of jsonResponse[itemType]) {
            let temp = {
                "x": productionPojo["epochMilliSecond"],
                "y": productionPojo["productionAmount"]
            };
            data.push(temp);
            // console.log(temp);
        }
        if (data.length !== 0) jsonProdDashboard["chart2"][itemType] = data;

        // console.log("Item Type: " + itemType);
        // console.log(JSON.stringify(tempData2[itemType]));

    }

    // console.log(JSON.stringify(jsonProdDashboard));
    console.log('Chart 2 Data - loaded successfully.');


}

async function loadDataChart7() {

    //  Load data for Chart 1 - Total Production
    //  Make GET REST API Call to fetch all production charts data in json
    let url = "http://localhost:8066/production/daily/2nd-class/";
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

    jsonProdDashboard.chart7.data2ndClass = data;
    console.log('Chart 7 Data - loaded successfully.');

}

function initializeProductionCharts() {

    // console.log(jsonProdDashboard["chart1"]["data"]);

    initChart1();

    initializeChart2();

    initChart3();

    initChart7();

}

function initChart1() {

    //  Chart 1 - Total Production
    //  -----------------------------------------------------------------------------

    let options1 = {
        series: [{
            name: 'Daily Production',
            // data: mockChart1Data()
            data: jsonProdDashboard.chart1.data
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
            text: 'Total  Production',
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
                text: 'Total Production',
            },
        }
    };

    let chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
    chart1.render();

    /*
        //  Chart 5
        //  -----------------------------------------------------------------------------
        let options5 = {
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
        let chart5 = new ApexCharts(document.querySelector("#chart5"), options5);
        chart5.render();
    */

    /*
        //  Chart 6
        //  -----------------------------------------------------------------------------
        let options6 = {
            series: [{
                name: 'Estimasi Januari',
                data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
            }, {
                name: 'Realisasi Januari',
                data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 20, 20, 20, 20, 20, 20, 20, 20]
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
                categories: ["01/02/2020", "01/03/2020", "01/04/2020", "01/05/2020", "01/06/2020", "01/07/2020", "01/08/2020", "01/09/2020", "01/10/2020", "01/11/2020",
                    "01/12/2020", "01/13/2020", "01/14/2020", "01/15/2020", "01/16/2020", "01/17/2020", "01/18/2020", "01/19/2020", "01/20/2020", "01/21/2020",
                    "01/22/2020", "01/23/2020", "01/24/2020", "01/25/2020", "01/26/2020", "01/27/2020", "01/28/2020", "01/29/2020", "01/30/2020", "01/31/2020", "02/01/2020"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy'
                },
            },
        };
        let chart6 = new ApexCharts(document.querySelector("#chart6"), options6);
        chart6.render();
    */

}

function initializeChart2() {

    // chart 2 - Total Production Based on Type of Goods
    Highcharts.chart('chart2', {
        title: {
            text: 'Total Production Based on Type of Goods'
        },
        subtitle: {
            text: 'January 2021'
        },
        series: [
            {name: 'Seng Kaki (762)', data: jsonProdDashboard.chart2["Seng Kaki"]},
            {name: 'Seng Lebar (914)', data: jsonProdDashboard.chart2["Seng Lebar"]},
            {name: 'Spandeck', data: jsonProdDashboard.chart2["Spandeck"]},
            {name: 'Galvanum', data: jsonProdDashboard.chart2["Galvanum"]},
            {name: 'Coil', data: jsonProdDashboard.chart2["Coil"]}
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
                text: 'Total Production'
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

function initChart3() {

    //  Chart 3 - Total Production Against Production Target
    //  -----------------------------------------------------------------------------

    let options3 = {
        series: [{
            name: 'Target',
            data: [31, 40, 28, 51, 42, 31, 40, 28, 51, 42, 51, 42, 31, 40, 31, 40, 28, 25]
        }, {
            name: 'Production',
            data: [14, 13, 20, 19, 29, 19, 22, 19, 12, 17, 19, 15, 13, 19, 17, 12, 17, 15]
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
                text: 'Total Production',
            },
        }
    };
    let chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
    chart3.render();

}

function initChart7() {

    //  Chart 7 - Production Class Comparison
    //  -----------------------------------------------------------------------------
    let options7 = {
        series: [{
            name: '1st Class Production',
            type: 'column',
            data: jsonProdDashboard.chart1.data
            // data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        }, {
            name: '2nd Class Production',
            type: 'area',
            data: jsonProdDashboard.chart7.data2ndClass
            // data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
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
        labels: ["01/02/2020", "01/03/2020", "01/04/2020", "01/05/2020", "01/06/2020", "01/07/2020", "01/08/2020", "01/09/2020", "01/10/2020", "01/11/2020",
            "01/12/2020"
        ],
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            title: {
                text: 'Total Production',
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;

                }
            },
            x: {
                format: 'dd MMM yyyy'
            },
        }
    };
    let chart7 = new ApexCharts(document.querySelector("#chart7"), options7);
    chart7.render();
}

function mockChart1Data() {

    let data = [];

    let categories = [
        '2/1/2021 GMT', '2/2/2021 GMT', '2/3/2021 GMT', '2/4/2021 GMT', '2/5/2021 GMT', '2/6/2021 GMT', '2/7/2021 GMT',
        '2/8/2021 GMT', '2/9/2021 GMT', '2/10/2021 GMT', '2/11/2021 GMT', '2/12/2021 GMT', '2/13/2021 GMT',
        '2/14/2021 GMT', '2/15/2021 GMT', '2/16/2021 GMT', '2/17/2021 GMT', '2/18/2021 GMT', '2/19/2021 GMT',
        '2/20/2021 GMT', '2/21/2021 GMT', '2/22/2021 GMT', '2/23/2021 GMT', '2/24/2021 GMT', '2/25/2021 GMT',
        '2/26/2021 GMT', '2/27/2021 GMT', '2/28/2021 GMT'//, '2/29/2021 GMT', '2/30/2021 GMT', '2/31/2021 GMT'
    ];

    let yData = [
        14, 13, 20, 19, 29, 19, 22, 19, 12, 17,
        19, 15, 13, 19, 17, 12, 17, 15, 14, 13,
        20, 19, 29, 19, 22, 19, 12, 17, 19, 15,
        27
    ];

    for (let i = 0; i < categories.length; i++) {

        let strDate = categories[i];
        let tempTimeMs = Date.parse(strDate);   //  Convert GMT Date into milliseconds

        let temp = {"x": tempTimeMs, "y": yData[i]};
        // console.log(temp);
        data.push(temp);
    }

    // console.log(data);

    return data;

}

function mockChart7Data() {

    let data1stClass = [];
    let data2ndClass = [];

    let categories = [
        '2/1/2021 GMT', '2/2/2021 GMT', '2/3/2021 GMT', '2/4/2021 GMT', '2/5/2021 GMT', '2/6/2021 GMT', '2/7/2021 GMT',
        '2/8/2021 GMT', '2/9/2021 GMT', '2/10/2021 GMT', '2/11/2021 GMT', '2/12/2021 GMT', '2/13/2021 GMT',
        '2/14/2021 GMT', '2/15/2021 GMT', '2/16/2021 GMT', '2/17/2021 GMT', '2/18/2021 GMT', '2/19/2021 GMT',
        '2/20/2021 GMT', '2/21/2021 GMT', '2/22/2021 GMT', '2/23/2021 GMT', '2/24/2021 GMT', '2/25/2021 GMT',
        '2/26/2021 GMT', '2/27/2021 GMT', '2/28/2021 GMT'//, '2/29/2021 GMT', '2/30/2021 GMT', '2/31/2021 GMT'
    ];

    let yData = [
        14, 13, 20, 19, 29, 19, 22, 19, 12, 17,
        19, 15, 13, 19, 17, 12, 17, 15, 14, 13,
        20, 19, 29, 19, 22, 19, 12, 17, 19, 15,
        27
    ];
    let yData2 = [46,43,66,63,96,63,73,63,40,56,63,50,43,63,56,40,56,50,46,43,66,63,96,63,73,63,40,56,63,50,90];

    console.log(yData2.toString())

    for (let i = 0; i < categories.length; i++) {

        let strDate = categories[i];
        let tempTimeMs = Date.parse(strDate);   //  Convert GMT Date into milliseconds

        let temp = {"x": tempTimeMs, "y": yData[i]};
        let temp2 = {"x": tempTimeMs, "y": yData2[i]};
        // console.log(temp);
        data1stClass.push(temp);
        data2ndClass.push(temp2);
    }

    // console.log(data1stClass);
    // console.log(data2ndClass);

    jsonProdDashboard.chart7.data1stClass = data1stClass;
    jsonProdDashboard.chart7.data2ndClass = data2ndClass;

    return data1stClass;

}
