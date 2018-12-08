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

var data = [
  {name: "Passenger (Survived)", value: obj[2]["saved"]},
  {name: "Passenger (Lost)", value: obj[2]["died"]},
  {name: "Crew (Survived)", value: obj[3]["saved"]},
  {name: "Crew (Lost)", value: obj[3]['died']},
];

var text = "";

var width = 260;
var height = 260;
var thickness = 40;
var duration = 750;

var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("#chart")
.append('svg')
.attr('class', 'pie')
.attr('width', width)
.attr('height', height);

var g = svg.append('g')
.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

var arc = d3.arc()
.innerRadius(radius - thickness)
.outerRadius(radius);

var pie = d3.pie()
.value(function(d) { return d.value; })
.sort(null);

var path = g.selectAll('path')
.data(pie(data))
.enter()
.append("g")
.on("mouseover", function(d) {
      let g = d3.select(this)
        .style("cursor", "pointer")
        .style("fill", "black")
        .append("g")
        .attr("class", "text-group");
 
      g.append("text")
        .attr("class", "name-text")
        .text(`${d.data.name}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '-1.2em');
  
      g.append("text")
        .attr("class", "value-text")
        .text(`${d.data.value}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '.6em');
    })
  .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")  
        .style("fill", color(this._current))
        .select(".text-group").remove();
    })
  .append('path')
  .attr('d', arc)
  .attr('fill', (d,i) => color(i))
  .on("mouseover", function(d) {
      d3.select(this)     
        .style("cursor", "pointer")
        .style("fill", "black");
    })
  .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")  
        .style("fill", color(this._current));
    })
  .each(function(d, i) { this._current = i; });


g.append('text')
  .attr('text-anchor', 'middle')
  .attr('dy', '.35em')
  .text(text);

}

)};



// });
// };

buildPlot();
