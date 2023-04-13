
//Lab 7.1
function init() {
  var w = 600;
  var h = 300;

  var dataset;

  //Load csv file
  d3.csv("Unemployment_78-95.csv", function (d) {
    return {
      date: new Date(+d.year, (+d.month - 1)),
      number: +d.number
    };
  }).then(function (data) {

    dataset = data;
//Line Chart
    // function lineChart(dataset) {
    //   //Set up margins
    //   var margin = {
    //     top: 20,
    //     right: 20,
    //     bottom: 50,
    //     left: 50
    //   };

    //   //Set up Scales
    //   var xScale = d3.scaleTime()
    //     .domain([
    //       d3.min(dataset, function (d) {
    //         return d.date;
    //       }),
    //       d3.max(dataset, function (d) {
    //         return d.date;
    //       })
    //     ])
    //     .range([margin.left, w - margin.right]);
    //   var yScale = d3.scaleLinear()
    //     .domain([0, d3.max(dataset, function (d) {
    //       return d.number;
    //     })
    //     ])
    //     .range([h - margin.bottom, margin.top]);

    //   //Set up line
    //   var line = d3.line()
    //     .x(function (d) {
    //       return xScale(d.date);
    //     })
    //     .y(function (d) {
    //       return yScale(d.number);
    //     });
      
    //   //Create SVG element
    //   var svg = d3.select("#chart")
    //     .append("svg")
    //     .attr("width", w)
    //     .attr("height", h);

    //   //Add margin to SVG element
    //   var g = svg.append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //   //Add line to SVG element
    //   g.append("path")
    //     .datum(dataset)
    //     .attr("class", "line")
    //     .attr("d", line);
    //   // Add halfMilMark
    //   svg.append("line")
    //      .attr("class", "line halfMkilMark")
    //      //start of line
    //      .attr("x1", margin.left*2)
    //      .attr("y1", yScale(500000) + margin.top )
    //      //end of line
    //      .attr("x2", (w - margin.right))
    //      .attr("y2", yScale(500000) + margin.top)
    //   // Add lable for the line
    //   svg.append("text")
    //      .attr("class", "halfMilLable")
    //      .attr("x", margin.left*2 +10)
    //      .attr("y", yScale(500000) + margin.top - 7 )// -7 make it upper the line
    //      .text("Half a million unemployed")
    //      .style("font-size", "10px")
    //      .style("fill", "red");
      
    //   //Add x axis to SVG element
    //   g.append("g")
    //     .attr("transform", "translate(0," + (h - margin.bottom) + ")")
    //     .call(d3.axisBottom(xScale));

    //   //Add y axis to SVG element
    //   g.append("g")
    //     .attr("transform", "translate(" + margin.left + ",0)")
    //     .call(d3.axisLeft(yScale));
    // }

    // lineChart(dataset);
    function areaChart(dataset) {
      //Set up margins
      var margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 50
      };
    
      //Set up Scales
      var xScale = d3.scaleTime()
        .domain([
          d3.min(dataset, function (d) {
            return d.date;
          }),
          d3.max(dataset, function (d) {
            return d.date;
          })
        ])
        .range([margin.left, w - margin.right]);
      var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
          return d.number;
        })
        ])
        .range([h - margin.bottom, margin.top]);
    
      //Set up area
      var area = d3.area()
        .x(function (d) {
          return xScale(d.date);
        })
        .y0(h - margin.bottom)
        .y1(function (d) {
          return yScale(d.number);
        });
    
      //Create SVG element
      var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
    
      //Add margin to SVG element
      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
      //Add area to SVG element
      g.append("path")
        .datum(dataset)
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", "grey");
    
      // Add halfMilMark
      svg.append("line")
         .attr("class", "line_halfMilMark")
         //start of line
         .attr("x1", margin.left*2)
         .attr("y1", yScale(500000) + margin.top )
         //end of line
         .attr("x2", (w))
         .attr("y2", yScale(500000) + margin.top)
         .attr("stroke","red") // set line color to red
         .attr("stroke-dasharray", "2")
      // Add lable for the line
      svg.append("text")
         .attr("class", "halfMilLable")
         .attr("x", margin.left*2 +10)
         .attr("y", yScale(500000) + margin.top - 7 )// -7 make it upper the line
         .text("Half a million unemployed")
         .style("font-size", "10px")
         .style("fill", "red");
    
      //Add x axis to SVG element
      g.append("g")
        .attr("transform", "translate(0," + (h - margin.bottom) + ")")
        .call(d3.axisBottom(xScale));
    
      //Add y axis to SVG element
      g.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(yScale));
    }
    areaChart(dataset);   

   

    console.table(dataset, ["date", "number"]);

  })
}
//Lab 7.2

function drawPiechart() {
  var dataset = [10, 25, 15, 7, 18, 29, 12];
  
  function pieChart() {
    var w = 300;
    var h = 300;
 
    // Set up Radiuses
    var outerRadius = w / 2;
    var innerRadius = 0;
    
    // Customize the size
    var arc = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);
    
    // Set up pie
    var pie = d3.pie();
    
    // Set up svg
    var svg = d3.select("#piechart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    
    // Set up arcs
    var arcs = svg.selectAll("g.arc")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
    
    // Setup color
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    
    // Draw arcs
    arcs.append("path")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("d", arc);
     // Add labels
    arcs.append("text")
        .attr("transform", function(d) {
    var pos = arc.centroid(d);
    pos[0] = pos[0] * 1.5; // multiply by 1.5 to move the labels away from the center
    pos[1] = pos[1] * 1.5;
    return "translate(" + pos + ")";
  })
  .attr("text-anchor", "middle")
  .attr("font-size", "15px")
  .text(function(d) {
    return d.data;
  });
  }
  
  pieChart();
}
//Lab 7.3

function drawStackedBars(){
  // Set up dataset
  var dataset = [
    { apples: 5, oranges: 10, grapes:22 },
    { apples: 4, oranges: 12, grapes:28 },
    { apples: 2, oranges: 19, grapes:32 },
    { apples: 7, oranges: 23, grapes:35 },
    { apples: 23, oranges: 17, grapes:43 }
  ];

  function StackedBars() {
    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var w = 700 - margin.left - margin.right;
    var h = 500 - margin.top - margin.bottom;
    
    //Set up Scales
    var xScale = d3.scaleBand()
                   .domain(d3.range(dataset.length))
                   .range([0,w])
                   .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function(d) {
                      return d.apples + d.oranges + d.grapes;
                    })
                  ])
                  .range([h,0]);

    // Set up stack
    var stack = d3.stack()
                  .keys(["apples","oranges", "grapes"]);
    var series = stack(dataset);
    // Set up color
    var color = d3.scaleOrdinal()
    .domain(["apples", "oranges", "grapes"])
    .range(["lightgreen", "orange", "violet"]);

    // Set up SVG
    var svg = d3.select("#stackedbars")
                .append("svg")
                .attr("width", w + margin.left + margin.right)
                .attr("height", h + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .style("fill", function(d,i) {
                      return color(i);
                    });

    // Draw rects
    var rects = groups.selectAll("rect")
                      .data(function(d) { return d;})
                      .enter()
                      .append("rect")
                      .attr("x", function(d, i) {
                        return xScale(i);
                      })
                      .attr("y", function(d) {
                        return yScale(d[1]);
                      })
                      .attr("height", function(d) {
                        return yScale(d[0]) - yScale(d[1]);
                      })
                      .attr("width", xScale.bandwidth());

    // Add axes(optional)
    var xAxis = d3.axisBottom(xScale);
    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(0," + h + ")")
       .call(xAxis);

    var yAxis = d3.axisLeft(yScale);
    svg.append("g")
       .attr("class", "axis")
       .call(yAxis);

    // Add legend(optional)
    var legend = svg.selectAll(".legend")
                    .data(series)
                    .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", function(d, i) {
                      return "translate(0," + i * 20 + ")";
                    });

    legend.append("rect")
          .attr("x", 80)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", function(d, i) {
            return color(i);
          });

    legend.append("text")
          .attr("x", 70)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .attr("font-size", "20px")
          .text(function(d) {
            return d.key;
          });
  }
  
  StackedBars();
}

function main() {
  init();
  drawPiechart();
  drawStackedBars();
}

window.onload = function () {
  main();
}
