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

var columns = ["Male", "Female", "Passenger", "Crew", "0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80"]

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

var pie = d3pie("pieChart", {
  "header": {
    "title": {
      "text": "Survivorship by Gender",
      "fontSize": 24,
      "font": "open sans"
    },
    "subtitle": {
      "color": "#999999",
      "fontSize": 12,
      "font": "open sans"
    },
    "titleSubtitlePadding": 9
  },
  "footer": {
    "color": "#999999",
    "fontSize": 10,
    "font": "open sans",
    "location": "bottom-left"
  },
  "size": {
    "canvasWidth": 600,
    "pieOuterRadius": "80%"
  },
  "data": {
    "sortOrder": "label-asc",
    "content": [
      {
        "label": "Male Lost",
        "value": obj[0]["died"],
        "color": "#2383c1"
      },
      {
        "label": "Male Survived",
        "value": obj[0]["saved"],
        "color": "#64a61f"
      },
      {
        "label": "Female Lost",
        "value": obj[1]["died"],
        "color": "#7b6788"
      },
      {
        "label": "Female Survived",
        "value": obj[1]["saved"],
        "color": "#a05c56"
      }
    ]
  },
  "labels": {
    "outer": {
      "format": "label-value1",
      "pieDistance": 32
    },
    "inner": {
      "format": "none",
      "hideWhenLessThanPercentage": 3
    },
    "mainLabel": {
      "fontSize": 11
    },
    "percentage": {
      "color": "#ffffff",
      "decimalPlaces": 0
    },
    "value": {
      "color": "#adadad",
      "fontSize": 11
    },
    "lines": {
      "enabled": true
    },
    "truncation": {
      "enabled": true
    }
  },
  "effects": {
    "pullOutSegmentOnClick": {
      "effect": "elastic",
      "speed": 400,
      "size": 8
    }
  },
  "misc": {
    "gradient": {
      "enabled": true,
      "percentage": 100
    }
  },
  "callbacks": {
    "onMouseoutSegment": null,
    "onClickSegment": null
  }
});


// // data
// var dataArray = totals;
// var dataCategories = columns;

//     // if the SVG area isn't empty when the browser loads,
//     // remove it and replace it with a resized version of the chart
//   var svgArea = d3.select("body").select("svg");

//   if (!svgArea.empty()) {
//     svgArea.remove();
//   }

//     // svg params
//   var svgHeight = window.innerHeight;
//   var svgWidth = window.innerWidth;

//     // margins
//   var margin = {
//     top: 50,
//     right: 50,
//     bottom: 50,
//     left: 50
//   };

//     // chart area minus margins
//   var chartHeight = svgHeight - margin.top - margin.bottom;
//   var chartWidth = svgWidth - margin.left - margin.right;

//     // create svg container
//   var svg = d3.select("body").append("svg")
//         .attr("height", svgHeight)
//         .attr("width", svgWidth);

//     // shift everything over by the margins
//   var chartGroup = svg.append("g")
//         .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     // scale y to chart height
//   var yScale = d3.scaleLinear()
//         .domain([0, d3.max(dataArray)])
//         .range([chartHeight, 0]);

//     // scale x to chart width
//   var xScale = d3.scaleBand()
//         .domain(dataCategories)
//         .range([0, chartWidth])
//         .padding(0.1);

//     // create axes
//   var yAxis = d3.axisLeft(yScale);
//   var xAxis = d3.axisBottom(xScale);

//     // set x to the bottom of the chart
//   chartGroup.append("g")
//         .attr("transform", `translate(0, ${chartHeight})`)
//         .call(xAxis);

//     // set y to the y axis
//   chartGroup.append("g")
//         .call(yAxis);


//   chartGroup.selectAll("rect")
//         .data(obj)
//         .enter()
//         .append("rect")
//         // .attr("x", (d, i) => xScale(dataCategories[i]))
//         // .attr("y", d => yScale(d))
//         // .attr("width", xScale.bandwidth())
//         // .attr("height", d => chartHeight - yScale(d))

//         .attr("x", (d, i) => xScale(obj[i]["group"]))
//         .attr("y", (d, i) => yScale(obj[i]["saved"] + obj[i]["died"]))
//         .attr("height", (d, i) => chartHeight - yScale(obj[i]["saved"] + obj[i]["died"]))
//         .attr("width", xScale.bandwidth())

//         .attr("fill", "green")
//         // event listener for onclick event
//         .on("click", function(d, i) {
//           alert(`Hey! You clicked bar ${dataCategories[i]}!`);
//         })
//         // event listener for mouseover
//         .on("mouseover", function() {
//           d3.select(this)
//                 .attr("fill", "red");
//         })
//         // event listener for mouseout
//         .on("mouseout", function() {
//           d3.select(this)
//                 .attr("fill", "green");
//         });

// chartGroup.selectAll("text.bar")
// .data(dataArray)
// .enter().append("text")
//   .attr("class", "bar")
//   .attr("text-anchor", "middle")
//   .attr("x", (d, i) => xScale(dataCategories[i]) + 50)
//   .attr("y", d => yScale(d) - 10)
//   .text((d, i) => dataArray[i]);

// chartGroup.selectAll("text")
// .data(dataArray)
// .enter().append("text")
//   .attr("class", "bar")
//   .attr("text-anchor", "middle")
//   .attr("x", (d, i) => xScale(dataCategories[i]) + 50)
//   .attr("y", d => yScale(d) + 10)
//   .text((d, i) => survived[i]);

}

)};



// });
// };

buildPlot();
