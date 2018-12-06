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

var totals = [data["0"]["0"]["0"] + data["0"]["1"]["0"], data["1"]["0"]["0"] + data["1"]["1"]["0"],
            data["2"]["0"]["0"] + data["2"]["1"]["0"], data["3"]["0"]["0"] + data["3"]["1"]["0"],
            data["4"]["0"]["0"] + data["4"]["1"]["0"], data["5"]["0"]["0"] + data["5"]["1"]["0"],
            data["6"]["0"]["0"] + data["6"]["1"]["0"], data["7"]["0"]["0"] + data["7"]["1"]["0"],
            data["8"]["0"]["0"] + data["8"]["1"]["0"], data["9"]["0"]["0"] + data["9"]["1"]["0"],
            data["10"]["0"]["0"] + data["10"]["1"]["0"], data["11"]["0"]["0"] + data["11"]["1"]["0"]]

var survived = [data["0"]["1"]["0"], data["1"]["1"]["0"], data["2"]["1"]["0"], 
                data["3"]["1"]["0"], data["4"]["1"]["0"], data["5"]["1"]["0"], 
                data["6"]["1"]["0"], data["7"]["1"]["0"], data["8"]["1"]["0"], 
                data["9"]["1"]["0"], data["10"]["1"]["0"], data["11"]["1"]["0"]]
                
var lost = [data["0"]["0"]["0"], data["1"]["0"]["0"], data["2"]["0"]["0"], 
                data["3"]["0"]["0"], data["4"]["0"]["0"], data["5"]["0"]["0"], 
                data["6"]["0"]["0"], data["7"]["0"]["0"], data["8"]["0"]["0"], 
                data["9"]["0"]["0"], data["10"]["0"]["0"], data["11"]["0"]["0"]]

var columns = ["Male", "Female", "Passenger", "Crew", "Ten", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eighty"]

var obj = [
  {group: columns[0], total: totals[0], saved: survived[0], died: lost[0]},
  {group: columns[1], total: totals[1], saved: survived[1], died: lost[1]},
  {group: columns[2], total: totals[2], saved: survived[2], died: lost[2]},
  {group: columns[3], total: totals[3], saved: survived[3], died: lost[3]},
  {group: columns[4], total: totals[4], saved: survived[4], died: lost[4]},
  {group: columns[5], total: totals[5], saved: survived[5], died: lost[5]},
  {group: columns[6], total: totals[6], saved: survived[6], died: lost[6]},
  {group: columns[7], total: totals[7], saved: survived[7], died: lost[7]},
  {group: columns[8], total: totals[8], saved: survived[8], died: lost[8]},
  {group: columns[9], total: totals[9], saved: survived[9], died: lost[9]},
  {group: columns[10], total: totals[10], saved: survived[10], died: lost[10]},
  {group: columns[11], total: totals[11], saved: survived[11], died: lost[11]}
  ]

// data
var dataArray = totals;
var dataCategories = columns;

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

    // svg params
  var svgHeight = window.innerHeight;
  var svgWidth = window.innerWidth;

    // margins
  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

    // chart area minus margins
  var chartHeight = svgHeight - margin.top - margin.bottom;
  var chartWidth = svgWidth - margin.left - margin.right;

    // create svg container
  var svg = d3.select("body").append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // shift everything over by the margins
  var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // scale y to chart height
  var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataArray)])
        .range([chartHeight, 0]);

    // scale x to chart width
  var xScale = d3.scaleBand()
        .domain(dataCategories)
        .range([0, chartWidth])
        .padding(0.1);

    // create axes
  var yAxis = d3.axisLeft(yScale);
  var xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
  chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    // set y to the y axis
  chartGroup.append("g")
        .call(yAxis);


  chartGroup.selectAll("rect")
        .data(dataArray)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(dataCategories[i]))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d))
        // .attr("x", function(d) { return x(d.x); })
        // .attr("y", (d, i) => yScale(survived[i] + lost[i]))
        // .attr("height", (d, i) => chartHeight - yScale(survived[i] + lost[i]))
        // .attr("width", x.rangeBand() - 1)
        .attr("fill", "green")
        // event listener for onclick event
        .on("click", function(d, i) {
          alert(`Hey! You clicked bar ${dataCategories[i]}!`);
        })
        // event listener for mouseover
        .on("mouseover", function() {
          d3.select(this)
                .attr("fill", "red");
        })
        // event listener for mouseout
        .on("mouseout", function() {
          d3.select(this)
                .attr("fill", "green");
        });

chartGroup.selectAll("text.bar")
.data(dataArray)
.enter().append("text")
  .attr("class", "bar")
  .attr("text-anchor", "middle")
  .attr("x", (d, i) => xScale(dataCategories[i]) + 50)
  .attr("y", d => yScale(d) - 10)
  .text((d, i) => dataArray[i]);

chartGroup.selectAll("text")
.data(dataArray)
.enter().append("text")
  .attr("class", "bar")
  .attr("text-anchor", "middle")
  .attr("x", (d, i) => xScale(dataCategories[i]) + 50)
  .attr("y", d => yScale(d) + 10)
  .text((d, i) => survived[i]);

}





    // const sample = [
    //   {
    //     group: columns[0],
    //     value: totals[0],
    //     color: '#000000'
    //   },
    //   {
    //     group: columns[1],
    //     value: totals[1],
    //     color: '#00a2ee'
    //   },
    //   {
    //     group: columns[2],
    //     value: totals[2],
    //     color: '#fbcb39'
    //   },
    //   {
    //     group: columns[3],
    //     value: totals[3],
    //     color: '#007bc8'
    //   },
    //   {
    //     group: columns[4],
    //     value: totals[4],
    //     color: '#65cedb'
    //   },
    //   {
    //     group: columns[5],
    //     value: totals[5],
    //     color: '#ff6e52'
    //   },
    //   {
    //     group: columns[6],
    //     value: totals[6],
    //     color: '#f9de3f'
    //   },
    //   {
    //     group: columns[7],
    //     value: totals[7],
    //     color: '#5d2f8e'
    //   },
    //   {
    //     group: columns[8],
    //     value: totals[8],
    //     color: '#008fc9'
    //   },
    //   {
    //     group: columns[9],
    //     value: totals[9],
    //     color: '#507dca'
    //   },
    //   {
    //     group: columns[10],
    //     value: totals[10],
    //     color: '#507dca'
    //   },
    //   {
    //     group: columns[11],
    //     value: totals[11],
    //     color: '#507dca'
    //   }            
    // ];

    //  svg = d3.select('svg');
    //  svgContainer = d3.select('#container');
    
    //  margin = 80;
    //  width = 700 - 2 * margin;
    //  height = 500 - 2 * margin;

    // const chart = svg.append('g')
    //   .attr('transform', `translate(${margin}, ${margin})`);

    // const xScale = d3.scaleBand()
    //   .range([0, width])
    //   .domain(sample.map((s) => s.group))
    //   .padding(0.3)
    
    // const yScale = d3.scaleLinear()
    //   .range([height, 0])
    //   .domain([0, 1100]);

    // // vertical grid lines
    // // const makeXLines = () => d3.axisBottom()
    // //   .scale(xScale)

    // const makeYLines = () => d3.axisLeft()
    //   .scale(yScale)

    // chart.append('g')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(d3.axisBottom(xScale));

    // chart.append('g')
    //   .call(d3.axisLeft(yScale));

    // // vertical grid lines
    // // chart.append('g')
    // //   .attr('class', 'grid')
    // //   .attr('transform', `translate(0, ${height})`)
    // //   .call(makeXLines()
    // //     .tickSize(-height, 0, 0)
    // //     .tickFormat('')
    // //   )

    // chart.append('g')
    //   .attr('class', 'grid')
    //   .call(makeYLines()
    //     .tickSize(-width, 0, 0)
    //     .tickFormat('')
    //   )

    // const barGroups = chart.selectAll()
    //   .data(sample)
    //   .enter()
    //   .append('g')

    // barGroups
    //   .append('rect')
    //   .attr('class', 'bar')
    //   .attr('x', (g) => xScale(g.group))
    //   .attr('y', (g) => yScale(g.value))
    //   .attr('height', (g) => height - yScale(g.value))
    //   .attr('width', xScale.bandwidth())
    //   .on('mouseenter', function (actual, i) {
    //     d3.selectAll('.value')
    //       .attr('opacity', 0)

    //     d3.select(this)
    //       .transition()
    //       .duration(300)
    //       .attr('opacity', 0.6)
    //       .attr('x', (a) => xScale(a.group) - 5)
    //       .attr('width', xScale.bandwidth() + 10)

    //     const y = yScale(actual.value)

    //     line = chart.append('line')
    //       .attr('id', 'limit')
    //       .attr('x1', 0)
    //       .attr('y1', y)
    //       .attr('x2', width)
    //       .attr('y2', y)

    //     barGroups.append('text')
    //       .attr('class', 'divergence')
    //       .attr('x', (a) => xScale(a.group) + xScale.bandwidth() / 2)
    //       .attr('y', (a) => yScale(a.value) + 30)
    //       .attr('fill', 'white')
    //       .attr('text-anchor', 'middle')
    //       .text((a, idx) => {
    //         const divergence = (a.value - actual.value).toFixed(1)
            
    //         let text = ''
    //         if (divergence > 0) text += '+'
    //         text += `${divergence}%`

    //         return idx !== i ? text : '';
    //       })

    //   })
    //   .on('mouseleave', function () {
    //     d3.selectAll('.value')
    //       .attr('opacity', 1)

    //     d3.select(this)
    //       .transition()
    //       .duration(300)
    //       .attr('opacity', 1)
    //       .attr('x', (a) => xScale(a.group))
    //       .attr('width', xScale.bandwidth())

    //     chart.selectAll('#limit').remove()
    //     chart.selectAll('.divergence').remove()
    //   })

    // barGroups 
    //   .append('text')
    //   .attr('class', 'value')
    //   .attr('x', (a) => xScale(a.group) + xScale.bandwidth() / 2)
    //   .attr('y', (a) => yScale(a.value) + 30)
    //   .attr('text-anchor', 'middle')
    //   .text((a) => `${a.value}%`)
    
    // svg
    //   .append('text')
    //   .attr('class', 'label')
    //   .attr('x', -(height / 2) - margin)
    //   .attr('y', margin / 2.4)
    //   .attr('transform', 'rotate(-90)')
    //   .attr('text-anchor', 'middle')
    //   .text('People')

    // svg.append('text')
    //   .attr('class', 'label')
    //   .attr('x', width / 2 + margin)
    //   .attr('y', height + margin * 1.7)
    //   .attr('text-anchor', 'middle')
    //   .text('Languages')

    // svg.append('text')
    //   .attr('class', 'title')
    //   .attr('x', width / 2 + margin)
    //   .attr('y', 40)
    //   .attr('text-anchor', 'middle')
    //   .text('Survivorship')

    // svg.append('text')
    //   .attr('class', 'source')
    //   .attr('x', width - margin / 2)
    //   .attr('y', height + margin * 1.7)
    //   .attr('text-anchor', 'start')
    //   .text('Source: Stack Overflow, 2018')



// var svg=d3.select("#svg");

// Define SVG area dimensions
// var svgWidth = 960;
// var svgHeight = 660;

// var padding={
//   top: 20,
//   right: 30,
//   bottom: 30,
//   left: 50
// };

// var chartArea ={
//   "width": svgWidth - padding.left - padding.right,
//   "height": svgHeight - padding.top - padding.bottom
// };

// console.log(chartArea)

// // Define dimensions of the chart area
// var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
// var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// // Select body, append SVG area to it, and set the dimensions
// var svg = d3.select(".bar")
//   .append("svg")
//   .attr("height", svgHeight)
//   .attr("width", svgWidth);

// // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// // obj.forEach(function(d) {
// //     d.total = +d.total;
//   // });
// console.log(Object.keys(obj));

//   var xBandScale = d3.scaleBand()
//     .domain(obj.group)
//     .range([0, chartWidth])
//     .padding(0.1);

//   // Create a linear scale for the vertical axis.
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, 1000]) //d3.max(tvData.map(d => d.hours));
//     .range([chartHeight, 0]);

//   // Create two new functions passing our scales in as arguments
//   // These will be used to create the chart's axes
//   var bottomAxis = d3.axisBottom(xBandScale);
//   var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

//   // Append two SVG group elements to the chartGroup area,
//   // and create the bottom and left axes inside of them
//   chartGroup.append("g")
//     .call(leftAxis);

//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${chartHeight})`)
//     .call(bottomAxis);

//   // Create one SVG rectangle per piece of tvData
//   // Use the linear and band scales to position each rectangle within the chart
//   chartGroup.selectAll(".bar")
//   // svg.selectAll(".bar")
//     .data(obj)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", xBandScale(obj.group))
//     .attr("y", yLinearScale(obj.total))
//     .attr("width", xBandScale.bandwidth())
//     .attr("height", chartHeight - yLinearScale(obj.total));


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


)}



// });
// };

buildPlot();
