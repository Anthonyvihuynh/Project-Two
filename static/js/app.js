function buildPlot() {

var url = ["/barchartdata"]

// var urls = ["/male", "/female", "/passenger", "/crew", "/ten",
//             "/twenty", "/thirty", "/fourty", "/fifty", "/sixty", 
//             "/seventy", "/eighty"];

// male data["0"]
// female data["1"]
// passenger 2
// crew 3
// 1-10 4
// twenty 5
// thirty 6
// fourty 7
// fifty 8
// sixty 9
// seventy 10
// eighty 11

d3.json(url).then(function(data) {

var all = [{"Males": data["0"]["0"]["0"] + data["0"]["1"]["0"]},
            {"Females": data["1"]["0"]["0"] + data["1"]["1"]["0"]},
            {"Passengers": data["2"]["0"]["0"] + data["2"]["1"]["0"]},            
            {"Crew": data["3"]["0"]["0"] + data["3"]["1"]["0"]},
            {"1-10": data["4"]["0"]["0"] + data["4"]["1"]["0"]},
            {"11-20": data["5"]["0"]["0"] + data["5"]["1"]["0"]},
            {"21-30": data["6"]["0"]["0"] + data["6"]["1"]["0"]},
            {"31-40": data["7"]["0"]["0"] + data["7"]["1"]["0"]},
            {"41-50": data["8"]["0"]["0"] + data["8"]["1"]["0"]},
            {"51-60": data["9"]["0"]["0"] + data["9"]["1"]["0"]},
            {"61-70": data["10"]["0"]["0"] + data["10"]["1"]["0"]},
            {"71-80": data["11"]["0"]["0"] + data["11"]["1"]["0"]}]

var total = [data["0"]["0"]["0"] + data["0"]["1"]["0"], data["1"]["0"]["0"] + data["1"]["1"]["0"],
            data["2"]["0"]["0"] + data["2"]["1"]["0"], data["3"]["0"]["0"] + data["3"]["1"]["0"],
            data["4"]["0"]["0"] + data["4"]["1"]["0"], data["5"]["0"]["0"] + data["5"]["1"]["0"],
            data["6"]["0"]["0"] + data["6"]["1"]["0"], data["7"]["0"]["0"] + data["7"]["1"]["0"],
            data["8"]["0"]["0"] + data["8"]["1"]["0"], data["9"]["0"]["0"] + data["9"]["1"]["0"],
            data["10"]["0"]["0"] + data["10"]["1"]["0"], data["11"]["0"]["0"] + data["11"]["1"]["0"]]

var survived = [data["0"]["1"]["0"], data["1"]["1"]["0"], data["2"]["1"]["0"], 
                data["3"]["1"]["0"], data["4"]["1"]["0"], data["5"]["1"]["0"], 
                data["6"]["1"]["0"], data["7"]["1"]["0"], data["8"]["1"]["0"], 
                data["9"]["1"]["0"], data["10"]["1"]["0"], data["11"]["1"]["0"]]

var columns = ["Male", "Female", "Passenger", "Crew", "Ten", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eighty"]

var obj = {}
for (var i = 0; i < columns.length; i++) {
    obj[columns[i]] = total[i]
}

console.log(obj)

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// obj.forEach(function(d) {
//     d.total = +d.total;
  // });
console.log(Object.keys(obj));

  var xBandScale = d3.scaleBand()
    .domain(columns)
    .range([0, chartWidth])
    .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, 1000]) //d3.max(tvData.map(d => d.hours));
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll(".bar")
  // svg.selectAll(".bar")
    .data(obj)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", xBandScale(columns))
    .attr("y", yLinearScale(total))
    .attr("width", xBandScale.bandwidth())
    .attr("height", chartHeight - yLinearScale(total));


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


})
};


// });
// };

buildPlot();
