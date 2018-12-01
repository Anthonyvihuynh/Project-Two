// Import Data
// var passengerData = d3.csv("lusitaniaclean.csv")
//   .then(function(passenger) {
//     passenger.forEach(function(data) {
//       data.Adult = +data.Adult;
//       data.Age = +data.Age;
//       data.Survived = +data.Survived;
//       data.Passenger = +data.Passenger;
//       data.Male = +data.Male;
//       console.log(data);
//     });
// });

/* data route */
var url = "/data";

function buildPlot() {
  d3.json(url).then(function(response) {

    console.log(response);
    var trace = {
      type: "scatter",
      mode: "lines",
      name: "Survivorship by citizenship",
      x: response.map(data => data.citizenship),
      y: response.map(data => data.survived),
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace];

    var layout = {
      title: "Survivorship stats",
      xaxis: {
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);
  });
}

buildPlot();
