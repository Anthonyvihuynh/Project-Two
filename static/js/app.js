function buildPlot() {

var url = ["/barchartdata"]

// var urls = ["/male", "/female", "/passenger", "/crew", "/ten",
//             "/twenty", "/thirty", "/fourty", "/fifty", "/sixty", 
//             "/seventy", "/eighty"];

// male data["0"]
// female data["1"]
// passenger 2
// crew 3
// ten 4
// twenty 5
// thirty 6
// fourty 7
// fifty 8
// sixty 9
// seventy 10
// eighty 11

var labels = ["Male", "Female", "Passenger", "Crew", "Ten", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eighty"]

console.log(labels)

var svg = d3.select("body").append("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.1);

var x1 = d3.scaleBand()
  .padding(0.05);

var y = d3.scaleLinear()
  .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

d3.json(url).then(function(d, i, labels) {
  for (var i = 1, n = labels.length; i < n; ++i) d[labels[i]] = +d[labels[i]];
  return d;
}, function(error, data) {

  var keys = data.labels.slice(1);

  x0.domain(data.map(function(d) { return d.State; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();


//     var trace = {
//       type: "bar",
//       name: "Survivorship by gender",
//       x: 13,
//       y: data.map(data => data["0"]["0"])
// }
//     var data = [trace];

//     var layout = {
//       title: "Survivorship stats",
//       xaxis: {
//         type: "linear"
//       },
//       yaxis: {
//         autorange: true,
//         type: "linear"
//       }
//     };

//     Plotly.newPlot("plot", data, layout);


});
}

// });
// };

buildPlot();
