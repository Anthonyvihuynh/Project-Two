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
  {group: columns[1], total: totals[1], saved: survived[1], died: lost[1]}
  ]

var pie = new d3pie("pieChart", {
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
