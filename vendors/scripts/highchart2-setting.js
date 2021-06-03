// chart 1
Highcharts.chart('chart2', {
	title: {
		text: 'Total Production Based on Type of Goods'
	},
	subtitle: {
		text: 'January 2021'
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
