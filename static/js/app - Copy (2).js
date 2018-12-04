function buildPlot() {

var url = ["/male"]

var urls = ["/male", "/female", "/passenger", "/crew", "/ten",
            "/twenty", "/thirty", "/fourty", "/fifty", "/sixty", 
            "/seventy", "/eighty"];

// var promises = urls.map(function(url) {
//   return Q.nfcall(d3.json, url);
// });

// Q.all(promises).then(function(data) { 
//   var data = [].concat.apply([], arrays);
//   return data;
//   console.log(data);
//   });
// }
d3.json(url).then(function(data) {
console.log(data);
});
};


//     var trace = {
//       type: "bar",
//       mode: "lines",
//       name: "Survival rates by gender",
//       x: response.map(data => data.year),
//       y: response.map(data => data.sightings),
//       line: {
//         color: "#17BECF"
//       }
//     };

//     var data = [trace];

//     var layout = {
//       title: "Bigfoot Sightings Per Year",
//       xaxis: {
//         type: "date"
//       },
//       yaxis: {
//         autorange: true,
//         type: "linear"
//       }
//     };

//     Plotly.newPlot("plot", data, layout);
//   });
// }

// });
// };

buildPlot();
