
var spreadsheetId = "1NDKKMIaObvMC-VEzSTqfDnsJl5sIg-PqEM-mCh43ong",
  url = "https://spreadsheets.google.com/feeds/list/" +
  spreadsheetId +
  "/od6/public/basic?alt=json";

$.get({
  url: url,
  success: function(response) {
    var data = response.feed.entry,
      len = data.length,
      i = 0,
      parsedData = [];

    for (i = 0; i < len; i++) {
      parsedData.push({
        label: data[i].title.$t,
        value: data[i].content.$t.replace('income: ', '')
      });
    }

    new FusionCharts({
      type: 'bar2d',
      renderAt: 'chart-container',
      width: '100%',
      height: '300',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "caption": "Kentucky vs Louisville",
          "yAxisName": "Date of Game",
          "numberPrefix": "$"
        },
        "data": parsedData
      }
    }).render();
  }
});