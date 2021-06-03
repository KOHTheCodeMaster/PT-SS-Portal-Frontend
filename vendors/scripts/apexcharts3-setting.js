var options = {
    series: [{
        name: 'Available Goods Daily',
        data: [14, 13, 20, 19, 29, 19, 22, 19, 12, 17, 19, 15, 13, 19, 17, 12, 17, 15]
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
        text: 'Amount Available Goods',
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
    yaxis: {
        min: -10,
        max: 40,
        title: {
            text: 'Amount Available Goods',
        },
    }
};
var chart = new ApexCharts(document.querySelector("#chart5"), options);
chart.render();

var options2 = {
    series: [{
        name: 'Target',
        data: [31, 40, 28, 51, 42, 31, 40, 28, 51, 42, 51, 42, 31, 40,31, 40, 28, 25]
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
		categories: ['1/2/2021', '1/3/2021', '1/4/2021', '1/5/2021', '1/6/2021', '1/7/2021', '1/8/2021', '1/9/2021', '1/10/2021', '1/11/2021', '1/12/2021', '1/13/2021', '1/14/2021', '1/15/2021', '1/16/2021','1/17/2021' ,'1/18/2021' ,'1/19/2021'],
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
var chart = new ApexCharts(document.querySelector("#chart1"), options2);
chart.render();

var options8 = {
	series: [44, 55, 31, 27],
	chart: {
		type: 'donut',
	},
	labels: ['Seng', 'Spandeck', 'Galvalum', 'Coil'],
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
var chart = new ApexCharts(document.querySelector("#chart2"), options8);
chart.render();

var options4 = {
	series: [50, 45, 21, 17],
	chart: {
		type: 'donut',
	},
	labels: ['Seng', 'Spandeck', 'Galvalum', 'Coil'],
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
var chart = new ApexCharts(document.querySelector("#chart3"), options8);
chart.render();