var options = {
    series: [{
        name: 'Daily Production',
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
    yaxis: {
        min: -10,
        max: 40,
        title: {
            text: 'Total Production',
        },
    }
};
var chart = new ApexCharts(document.querySelector("#chart1"), options);
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
            text: 'Total Production',
        },
    }
};
var chart = new ApexCharts(document.querySelector("#chart3"), options2);
chart.render();

var options5 = {
	series: [{
		name: 'Realization 2019',
		type: 'column',
		data: [300,330,300,330,300,330,300,330,300,330,300,330]
	}, {
		name: 'Estimation 2020',
		type: 'area',
		data: [300,330,300,330,300,330,300,330,300,330,300,330]
	}, {
		name: 'Realization 2020',
		type: 'line',
		data: [300,330,300,330,300,330,300,330,300,330,300,330]
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
var chart = new ApexCharts(document.querySelector("#chart5"), options5);
chart.render();

var options2 = {
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
var chart = new ApexCharts(document.querySelector("#chart6"), options2);
chart.render();

var options5 = {
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
var chart = new ApexCharts(document.querySelector("#chart7"), options5);
chart.render();