
function DataScatterPot() {
  // define the data points
  let dataset = [    [19,39],
    [480, 90],
    [300,400],
    [120, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [84, 90],
    [85, 21],
    [220, 88],
    [150, 280],
    [200, 350],
    [50, 100],
    [390, 200],
    [250, 80],
    [350, 320],
    [180, 70],
    [420, 120],
    [90, 240],
    [300, 190],
    [700, 200]
  ];
  // Create width
  var w = 550;
  // Create length
  var h = 420;
  // Create padding
  var padding = 50;
  // Create xScale
  var xScale = d3.scaleLinear()
                //Data input range(use d3.min and d3.max)
                .domain([d3.min(dataset, d => d[0]), 
                         d3.max(dataset, d => d[0])])
                //Range available for visualisation
                .range([padding, w - padding]);
  var yScale = d3.scaleLinear()
                //Data input range(use d3.min and d3.max)
                .domain([d3.min(dataset, d => d[1]), 
                         d3.max(dataset, d => d[1])])
                //Range available for visualisation
                .range([h - padding, padding]);
  // Create xAxis 
  var xAxis = d3.axisBottom()
                .ticks(5)
                .scale(xScale);
  // Create yAxis
  var yAxis = d3.axisLeft()
                
                .scale(yScale);
  
  // Create SVG
  var svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
  // Draw scatter plot
    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
        // Set cx to the first value
        .attr("cx",(d,i)=> xScale(d[0]))
        // Set cy to the second value
        .attr("cy", (d,i) => yScale(d[1]))
        .attr("r", 6)
        //Add some colors
        .attr("fill", "lightblue");
  // Add label
    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text( d=> d[0]+","+d[1])
       // Make text 10 units further
       .attr("x", d => xScale(d[0]) + 10)
       .attr("y", d => yScale(d[1]))
      //Set font style
       .attr("font-family", "sans-serif")
       .attr("font-size", "10px")
       .attr("fill", "black");
  // Draw xAxis
    svg.append("g")
       .attr("class", "axis")
       .attr("transform","translate(0, "+ (h-padding + 10) +")")
       .call(xAxis);
  // Draw yAxis
    svg.append("g") 
       .attr("class", "axis") 
       .attr("transform", "translate(" + (padding - 10) + ",0)") 
       .call(yAxis);
  //Add lable for Axis
  svg.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", "translate(" + (w/2) + "," + (h - 10) + ")")
  .text("X Axis");
}

function main() {
  DataScatterPot();
}

// Call the getData function when the window is loaded
window.onload = function() {
  main();
};
