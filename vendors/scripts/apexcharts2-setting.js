let jsonProdDashboard;

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    // new Promise()
    major()
        .then(() => console.log('Loading Production Dashboard.'))
        .then(intializeJsonProductionChartData())
        .then(initializeProductionCharts())
        .then(() => console.log('Production Dashboard Loaded.'));

});

async function major() {
    console.log('Major Invoked.');
}

function intializeJsonProductionChartData() {

    //  Make Post request to production API to fetch all production chart data
    requestProductionChartsData();

    //  Mock API call
    let jsonChart1 = {
        "data": mockChart1Data(),
    };
    jsonProdDashboard = {
        "chart1": jsonChart1
    }

}

function requestProductionChartsData() {

    //  Make POST REST API Call to fetch all production charts data in json
    // let url = "", body = "";
    // jsonProdDashboard = reqPostCall(url, body);

}

function mockChart1Data() {

    let data = [];

    let categories = [
        '1/1/2021 GMT', '1/2/2021 GMT', '1/3/2021 GMT', '1/4/2021 GMT', '1/5/2021 GMT', '1/6/2021 GMT', '1/7/2021 GMT',
        '1/8/2021 GMT', '1/9/2021 GMT', '1/10/2021 GMT', '1/11/2021 GMT', '1/12/2021 GMT', '1/13/2021 GMT',
        '1/14/2021 GMT', '1/15/2021 GMT', '1/16/2021 GMT', '1/17/2021 GMT', '1/18/2021 GMT', '1/19/2021 GMT',
        '1/20/2021 GMT', '1/21/2021 GMT', '1/22/2021 GMT', '1/23/2021 GMT', '1/24/2021 GMT', '1/25/2021 GMT',
        '1/26/2021 GMT', '1/27/2021 GMT', '1/28/2021 GMT', '1/29/2021 GMT', '1/30/2021 GMT', '1/31/2021 GMT'
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

    return data;

}

function initializeProductionCharts() {
    apexChartsSetup();
}

function apexChartsSetup() {

    //  Chart 1 - Total Production
    //  -----------------------------------------------------------------------------

    /*let options1 = {
        series: [{
            name: 'Daily Production',
            data: jsonProdDashboard.chart1.data
            /!*
                        data: [
                            /!*
                                        [1486684800000, 1],
                                        [1486771200000, 2],
                                        [1486857600000, 3] ,
                                        [1486944000000, 4],
                                        [1487030400000, 5],
                                        [1487116800000, 6],
                            *!/
                            // [1486684800000, 1],
                            // [1486665000000

                            [1610217000000, 10],
                            [1610303900000, 11],
                            [1610389800000, 12],
                            [1610649000000, 13],
                            // [1610217000000, 10],
                        ]
            *!/
            /!*
                    data: [
                        10, 20, 30, 10, 20, 30, 10,
                        // 14, 13, 20, 19, 29, 19, 22, 19, 12, 17, 19, 15, 13, 19, 17, 12, 17, 15,
                        // 14, 13, 20, 19, 29, 19, 22, 19, 12, 17, 19, 15
                    ]
            *!/
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
                left: 10,
                right: 0
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
            type: 'date',
            // min: '01 Jan 2021',  //  invalid as type is datetime
            // max: '21 Jan 2021',  //  time in ms required | date is not a valid type
            // min: new Date('11 Jan 2021').getTime(),  //  valid
            // max: new Date('21 Jan 2021').getTime(),
            // max: Date.now(),
            // max: new Date('31 Jan 2021').getTime(),

            // categories: [
            //     // '1/1/2021', '1/2/2021', '1/3/2021', '1/4/2021', '1/5/2021', '1/6/2021', '1/7/2021', '1/8/2021', '1/9/2021',
            //     '1/10/2021', '1/11/2021', '1/12/2021', '1/13/2021', '1/14/2021', '1/15/2021', '1/16/2021', '1/17/2021',
            //     // '1/18/2021', '1/19/2021', '1/21/2021', '1/22/2021', '1/23/2021', '1/24/2021', '1/25/2021', '1/26/2021',
            //     // '1/27/2021', '1/28/2021', '1/29/2021', '1/30/2021', '1/31/2021'
            // ],
            /!*labels: {
                formatter: function (value) {
                    // The formatter function overrides format property
                    let options1 = {month: 'short', day: 'numeric'};
                    return new Date(value).toLocaleDateString("en-US", options1);
                },
            }*!/
        },
        yaxis: {
            min: -10,
            max: 40,
            title: {
                text: 'Total Production',
            },
        }
    };*/
    let options1 = {
        series: [{
            name: 'Daily Production',
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
            show: false,
            padding: {
                left: 10,
                right: 0
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
        /*
                xaxis: {
                    type: 'datetime',
                    // min: '01 Jan 2021',  //  invalid as type is datetime
                    // max: '21 Jan 2021',  //  time in ms required | date is not a valid type
                    // min: new Date('11 Jan 2021').getTime(),  //  valid
                    // max: new Date('21 Jan 2021').getTime(),
                    // max: Date.now(),
                    // max: new Date('31 Jan 2021').getTime(),
                    // categories: [
                    //     // '1/1/2021', '1/2/2021', '1/3/2021', '1/4/2021', '1/5/2021', '1/6/2021', '1/7/2021', '1/8/2021', '1/9/2021',
                    //     '1/10/2021', '1/11/2021', '1/12/2021', '1/13/2021', '1/14/2021', '1/15/2021', '1/16/2021', '1/17/2021',
                    //     // '1/18/2021', '1/19/2021', '1/21/2021', '1/22/2021', '1/23/2021', '1/24/2021', '1/25/2021', '1/26/2021',
                    //     // '1/27/2021', '1/28/2021', '1/29/2021', '1/30/2021', '1/31/2021'
                    // ],
                    /!*labels: {
                        formatter: function (value) {
                            // The formatter function overrides format property
                            let options1 = {month: 'short', day: 'numeric'};
                            return new Date(value).toLocaleDateString("en-US", options1);
                        },
                    }*!/
                },
        */
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            min: -10,
            max: 40,
            title: {
                text: 'Total Production',
            },
        }
    };

    let chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
    chart1.render();

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

    //  Chart 7 - Production Class Comparison
    //  -----------------------------------------------------------------------------
    let options7 = {
        series: [{
            name: '1st Class Production',
            type: 'column',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        }, {
            name: '2nd Class Production',
            type: 'area',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
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
            }
        }
    };
    let chart7 = new ApexCharts(document.querySelector("#chart7"), options7);
    chart7.render();

}

function f2() {

    var options = {
        series: [{
            data: [
                [1327359600000, 30.95],
                [1327446000000, 31.34],
                [1327532400000, 31.18],
                [1327618800000, 31.05],
                [1327878000000, 31.00],
                [1327964400000, 30.95],
                [1328050800000, 31.24],
                [1328137200000, 31.29],
                [1328223600000, 31.85],
                [1328482800000, 31.86],
                [1328569200000, 32.28],
                [1328655600000, 32.10],
                [1328742000000, 32.65],
                [1328828400000, 32.21],
                [1329087600000, 32.35],
                [1329174000000, 32.44],
                [1329260400000, 32.46],
                [1329346800000, 32.86],
                [1329433200000, 32.75],
                [1329778800000, 32.54],
                [1329865200000, 32.33],
                [1329951600000, 32.97],
                [1330038000000, 33.41],
                [1330297200000, 33.27],
                [1330383600000, 33.27],
                [1330470000000, 32.89],
                [1330556400000, 33.10],
                [1330642800000, 33.73],
                [1330902000000, 33.22],
                [1330988400000, 31.99],
                [1331074800000, 32.41],
                [1331161200000, 33.05],
                [1331247600000, 33.64],
                [1331506800000, 33.56],
                [1331593200000, 34.22],
                [1331679600000, 33.77],
                [1331766000000, 34.17],
                [1331852400000, 33.82],
                [1332111600000, 34.51],
                [1332198000000, 33.16],
                [1332284400000, 33.56],
                [1332370800000, 33.71],
                [1332457200000, 33.81],
                [1332712800000, 34.40],
                [1332799200000, 34.63],
                [1332885600000, 34.46],
                [1332972000000, 34.48],
                [1333058400000, 34.31],
                [1333317600000, 34.70],
                [1333404000000, 34.31],
                [1333490400000, 33.46],
                [1333576800000, 33.59],
                [1333922400000, 33.22],
                [1334008800000, 32.61],
                [1334095200000, 33.01],
                [1334181600000, 33.55],
                [1334268000000, 33.18],
                [1334527200000, 32.84],
                [1334613600000, 33.84],
                [1334700000000, 33.39],
                [1334786400000, 32.91],
                [1334872800000, 33.06],
                [1335132000000, 32.62],
                [1335218400000, 32.40],
                [1335304800000, 33.13],
                [1335391200000, 33.26],
                [1335477600000, 33.58],
                [1335736800000, 33.55],
                [1335823200000, 33.77],
                [1335909600000, 33.76],
                [1335996000000, 33.32],
                [1336082400000, 32.61],
                [1336341600000, 32.52],
                [1336428000000, 32.67],
                [1336514400000, 32.52],
                [1336600800000, 31.92],
                [1336687200000, 32.20],
                [1336946400000, 32.23],
                [1337032800000, 32.33],
                [1337119200000, 32.36],
                [1337205600000, 32.01],
                [1337292000000, 31.31],
                [1337551200000, 32.01],
                [1337637600000, 32.01],
                [1337724000000, 32.18],
                [1337810400000, 31.54],
                [1337896800000, 31.60],
                [1338242400000, 32.05],
                [1338328800000, 31.29],
                [1338415200000, 31.05],
                [1338501600000, 29.82],
                [1338760800000, 30.31],
                [1338847200000, 30.70],
                [1338933600000, 31.69],
                [1339020000000, 31.32],
                [1339106400000, 31.65],
                [1339365600000, 31.13],
                [1339452000000, 31.77],
                [1339538400000, 31.79],
                [1339624800000, 31.67],
                [1339711200000, 32.39],
                [1339970400000, 32.63],
                [1340056800000, 32.89],
                [1340143200000, 31.99],
                [1340229600000, 31.23],
                [1340316000000, 31.57],
                [1340575200000, 30.84],
                [1340661600000, 31.07],
                [1340748000000, 31.41],
                [1340834400000, 31.17],
                [1340920800000, 32.37],
                [1341180000000, 32.19],
                [1341266400000, 32.51],
                [1341439200000, 32.53],
                [1341525600000, 31.37],
                [1341784800000, 30.43],
                [1341871200000, 30.44],
                [1341957600000, 30.20],
                [1342044000000, 30.14],
                [1342130400000, 30.65],
                [1342389600000, 30.40],
                [1342476000000, 30.65],
                [1342562400000, 31.43],
                [1342648800000, 31.89],
                [1342735200000, 31.38],
                [1342994400000, 30.64],
                [1343080800000, 30.02],
                [1343167200000, 30.33],
                [1343253600000, 30.95],
                [1343340000000, 31.89],
                [1343599200000, 31.01],
                [1343685600000, 30.88],
                [1343772000000, 30.69],
                [1343858400000, 30.58],
                [1343944800000, 32.02],
                [1344204000000, 32.14],
                [1344290400000, 32.37],
                [1344376800000, 32.51],
                [1344463200000, 32.65],
                [1344549600000, 32.64],
                [1344808800000, 32.27],
                [1344895200000, 32.10],
                [1344981600000, 32.91],
                [1345068000000, 33.65],
                [1345154400000, 33.80],
                [1345413600000, 33.92],
                [1345500000000, 33.75],
                [1345586400000, 33.84],
                [1345672800000, 33.50],
                [1345759200000, 32.26],
                [1346018400000, 32.32],
                [1346104800000, 32.06],
                [1346191200000, 31.96],
                [1346277600000, 31.46],
                [1346364000000, 31.27],
                [1346709600000, 31.43],
                [1346796000000, 32.26],
                [1346882400000, 32.79],
                [1346968800000, 32.46],
                [1347228000000, 32.13],
                [1347314400000, 32.43],
                [1347400800000, 32.42],
                [1347487200000, 32.81],
                [1347573600000, 33.34],
                [1347832800000, 33.41],
                [1347919200000, 32.57],
                [1348005600000, 33.12],
                [1348092000000, 34.53],
                [1348178400000, 33.83],
                [1348437600000, 33.41],
                [1348524000000, 32.90],
                [1348610400000, 32.53],
                [1348696800000, 32.80],
                [1348783200000, 32.44],
                [1349042400000, 32.62],
                [1349128800000, 32.57],
                [1349215200000, 32.60],
                [1349301600000, 32.68],
                [1349388000000, 32.47],
                [1349647200000, 32.23],
                [1349733600000, 31.68],
                [1349820000000, 31.51],
                [1349906400000, 31.78],
                [1349992800000, 31.94],
                [1350252000000, 32.33],
                [1350338400000, 33.24],
                [1350424800000, 33.44],
                [1350511200000, 33.48],
                [1350597600000, 33.24],
                [1350856800000, 33.49],
                [1350943200000, 33.31],
                [1351029600000, 33.36],
                [1351116000000, 33.40],
                [1351202400000, 34.01],
                [1351638000000, 34.02],
                [1351724400000, 34.36],
                [1351810800000, 34.39],
                [1352070000000, 34.24],
                [1352156400000, 34.39],
                [1352242800000, 33.47],
                [1352329200000, 32.98],
                [1352415600000, 32.90],
                [1352674800000, 32.70],
                [1352761200000, 32.54],
                [1352847600000, 32.23],
                [1352934000000, 32.64],
                [1353020400000, 32.65],
                [1353279600000, 32.92],
                [1353366000000, 32.64],
                [1353452400000, 32.84],
                [1353625200000, 33.40],
                [1353884400000, 33.30],
                [1353970800000, 33.18],
                [1354057200000, 33.88],
                [1354143600000, 34.09],
                [1354230000000, 34.61],
                [1354489200000, 34.70],
                [1354575600000, 35.30],
                [1354662000000, 35.40],
                [1354748400000, 35.14],
                [1354834800000, 35.48],
                [1355094000000, 35.75],
                [1355180400000, 35.54],
                [1355266800000, 35.96],
                [1355353200000, 35.53],
                [1355439600000, 37.56],
                [1355698800000, 37.42],
                [1355785200000, 37.49],
                [1355871600000, 38.09],
                [1355958000000, 37.87],
                [1356044400000, 37.71],
                [1356303600000, 37.53],
                [1356476400000, 37.55],
                [1356562800000, 37.30],
                [1356649200000, 36.90],
                [1356908400000, 37.68],
                [1357081200000, 38.34],
                [1357167600000, 37.75],
                [1357254000000, 38.13],
                [1357513200000, 37.94],
                [1357599600000, 38.14],
                [1357686000000, 38.66],
                [1357772400000, 38.62],
                [1357858800000, 38.09],
                [1358118000000, 38.16],
                [1358204400000, 38.15],
                [1358290800000, 37.88],
                [1358377200000, 37.73],
                [1358463600000, 37.98],
                [1358809200000, 37.95],
                [1358895600000, 38.25],
                [1358982000000, 38.10],
                [1359068400000, 38.32],
                [1359327600000, 38.24],
                [1359414000000, 38.52],
                [1359500400000, 37.94],
                [1359586800000, 37.83],
                [1359673200000, 38.34],
                [1359932400000, 38.10],
                [1360018800000, 38.51],
                [1360105200000, 38.40],
                [1360191600000, 38.07],
                [1360278000000, 39.12],
                [1360537200000, 38.64],
                [1360623600000, 38.89],
                [1360710000000, 38.81],
                [1360796400000, 38.61],
                [1360882800000, 38.63],
                [1361228400000, 38.99],
                [1361314800000, 38.77],
                [1361401200000, 38.34],
                [1361487600000, 38.55],
                [1361746800000, 38.11],
                [1361833200000, 38.59],
                [1361919600000, 39.60],
            ]
        }],
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
                autoScaleYaxis: true
            }
        },
        annotations: {
            yaxis: [{
                y: 30,
                borderColor: '#999',
                label: {
                    show: true,
                    text: 'Support',
                    style: {
                        color: "#fff",
                        background: '#00E396'
                    }
                }
            }],
            xaxis: [{
                x: new Date('14 Nov 2012').getTime(),
                borderColor: '#999',
                yAxisIndex: 0,
                label: {
                    show: true,
                    text: 'Rally',
                    style: {
                        color: "#fff",
                        background: '#775DD0'
                    }
                }
            }]
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            type: 'datetime',
            min: new Date('01 Mar 2012').getTime(),
            tickAmount: 6,
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    };

    var chart = new ApexCharts(document.querySelector("#chart-timeline"), options);
    chart.render();


    var resetCssClasses = function (activeEl) {
        var els = document.querySelectorAll('button')
        Array.prototype.forEach.call(els, function (el) {
            el.classList.remove('active')
        })

        activeEl.target.classList.add('active')
    }

    document
        .querySelector('#one_month')
        .addEventListener('click', function (e) {
            resetCssClasses(e)

            chart.zoomX(
                new Date('28 Jan 2013').getTime(),
                new Date('27 Feb 2013').getTime()
            )
        })

    document
        .querySelector('#six_months')
        .addEventListener('click', function (e) {
            resetCssClasses(e)

            chart.zoomX(
                new Date('27 Sep 2012').getTime(),
                new Date('27 Feb 2013').getTime()
            )
        })

    document
        .querySelector('#one_year')
        .addEventListener('click', function (e) {
            resetCssClasses(e)
            chart.zoomX(
                new Date('27 Feb 2012').getTime(),
                new Date('27 Feb 2013').getTime()
            )
        })

    document.querySelector('#ytd').addEventListener('click', function (e) {
        resetCssClasses(e)

        chart.zoomX(
            new Date('01 Jan 2013').getTime(),
            new Date('27 Feb 2013').getTime()
        )
    })

    document.querySelector('#all').addEventListener('click', function (e) {
        resetCssClasses(e)

        chart.zoomX(
            new Date('23 Jan 2012').getTime(),
            new Date('27 Feb 2013').getTime()
        )
    })

}
