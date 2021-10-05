//  Utility Methods
//  ---------------

function updateChartOptions(jsonChart, strMsg) {

    let options = jsonChart.options;
    options.noData.text = strMsg;
    options.series = [];

    //  On Connection Failure - Update Chart Options with empty series & text
    // jsonProdControl.jsonChart.chart.updateSeries([]);
    jsonChart.chart.updateOptions(options);

}
