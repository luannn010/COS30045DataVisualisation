var w = 900;
var h = 300; 
var barPadding = 1;
var dataset =[14, 5, 26, 23 , 9, 15, 21, 8, 7, 16, 30, 28, 26, 15, 12, 10, 16, 19];
var svg1;
var maxValue =30;
//xScale
var xScale = d3.scaleBand()
               .domain(d3.range(dataset.length))
               .rangeRound([0,w])
               .paddingInner([0.05]);
//yScale
var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset)])
               .rangeRound([h,0]);
function BarChart(dataset,delay,duration,ease) {
  
  var bars = svg1.selectAll("rect")
                 .data(dataset)

  
  bars.enter()
      .append("rect")
      .merge(bars)
      .transition()
      .delay(delay)
      .duration(duration)
      .ease(ease)
      .attr("x", (d,i) => xScale(i))
      .attr("y", d =>  yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => h - yScale(d))
      .style("fill", d =>"rgb(1, " + d*10 + ",10)");
  bars.exit()
      .transition()
      .delay(delay)
      .duration(duration)
      .attr("x", w)
      .ease(ease)
      .remove();

  // Label
  // Select text elements and bind data to them
var labels = svg1.selectAll("text")
.data(dataset);

labels.enter()
  .append("text")
  .merge(labels)
  .transition() 
  .delay(delay)
  .duration(duration)
  .ease(ease)
  .text(d => d)
  .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
  .attr("y", d => yScale(d) + 10)
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white")
  .attr("text-anchor", "middle");

// Remove old labels
labels.exit()
.transition()
.delay(0)
.duration(duration)
.ease(ease)
.remove();

}
//Lab5.1
//Update Button
function Update() {
  d3.select("#update")
    .on("click", () => {
        // Random array value
        var numValues = dataset.length; // New dataset size
        dataset = []; // New Array
        for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor(Math.random() * maxValue); 
        dataset.push(newNumber);
        }
        //Redraw barchart
        BarChart(dataset,300,2000,d3.easeElasticOut);
    })
}
//Lab5.2

function Transition(delay,duration,ease) {
        // Random array value
        var numValues = dataset.length; // New dataset size
        dataset = []; // New Array
        for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor(Math.random() * maxValue); 
        dataset.push(newNumber);
        }
        BarChart(dataset, delay, duration,ease)
    
}
//Transition1 Button
function Transition1(){
  d3.select("#trans1")
    .on("click", () => {
      Transition(300,1500, d3.easeCircleOut)
    })
  }
//Transition2 Button
function Transition2(){
  d3.select("#trans2")
    .on("click", () => {
      Transition(2000, 500, d3.easeCircleOut)
    })
}

//Lab5.3

//Add Bars
function AddBars() {
  d3.select("#add")
    .on("click", () => {
      
      
      var newNumber = Math.floor(Math.random() * maxValue); 
      dataset.push(newNumber);
       //Update xScale after adding new value
       xScale.domain(d3.range(dataset.length));
       yScale.domain([0, d3.max(dataset)]);
       
      //Update Chart
      BarChart(dataset,300,2000,d3.easeElasticOut)
      
    })
}
//Remove Bars
function RemoveBars() {
  d3.select("#remove")
    .on("click", () => {
    dataset.shift();
    
     //Update xScale after adding new value
     xScale.domain(d3.range(dataset.length));
     yScale.domain([0, d3.max(dataset)]);

    //Update Chart
     BarChart(dataset,200,100,d3.easeCircleOut)

     
     
  })
}
function main(){
  svg1 = d3.select("#chart1")
           .append("svg")
           .attr("width", w)
           .attr("height", h); 
  BarChart(dataset,300,2000,d3.easeElasticOut);
  Update();
  Transition1();
  Transition2();
  AddBars();
  RemoveBars();
}

window.onload = function() {
  main();
};
