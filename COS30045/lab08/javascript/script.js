function map() {
  var w = 800;
  var h = 400;

  var projection = d3.geoMercator()
                     .center([145, -36.5])
                     .translate([w/2 , h/2])
                     .scale(3000); // size

  var path = d3.geoPath()
               .projection(projection);
               
  var svg = d3.select("#map")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
              .attr("fill", "grey");
              
  var color = d3.scaleQuantize()
                // get color range from https://colorbrewer2.org/#type=sequential&scheme=YlGnBu&n=5
                .range(['rgb(247,252,240)','rgb(224,243,219)','rgb(204,235,197)','rgb(168,221,181)','rgb(123,204,196)','rgb(78,179,211)','rgb(51, 102, 204)','rgb(43,140,190)','rgb(8,104,172)','rgb(8,64,129)']);

  
  
  // Load file csv  
  d3.csv("data/VIC_LGA_unemployment.csv").then(function(data){
    // SetUp Color
    color.domain([
      d3.min(data, function(d){ return  d.unemployed; }),
      d3.max(data, function(d){ return  d.unemployed; })
    ]);

    // Load file json
    d3.json("data/LGA_VIC.json").then(function(json) {
      //Merge the unemployment file and the json file
      //Loop through value
      for (var i = 0; i < data.length; i++) {
        // Grab VIC LGA
        var dataCity = data[i].lga;
        // Grab unemployment data
        var dataUnemployed = parseFloat(data[i].unemployed);
        // Find the corresponding city inside the JSON file
        for (var j = 0; j < json.features.length; j++) {
          var jsonCity = json.features[j].properties.LGA_name || "";
          if (dataCity == jsonCity) {
            // Copy data value into JSON
            json.features[j].properties.unemployed = dataUnemployed;
            // Stop looking through
            break;
          }
        }
      }
      
      // Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
         .data(json.features)
         .enter()
         .append("path")
         .attr("d", path)
         .style("fill", function(d) {
           // Get data value
           var value = d.properties.unemployed;
           if (value) {
             // If value exists, return color based on scale
             return color(value);
           } else {
             // If value is undefined, use gray color
             return "#ccc";
           }
         })
         .on("mouseover", function(d) {
  // Set up tooltip
  var tooltip = d3.select("#tooltip");
  tooltip.style("visibility","visible")
         .html("<b>" + d.features.properties.LGA_name + "</b><br>" + 
                "Unemployment rate:" + d.properties.unemployed);
})
.on("mouseout", function(d) {
  // Hide tooltip
  var tooltip = d3.select("#tooltip");
  tooltip.style("visibility","hidden");
});

         
    });
  });
}

function main() {
  map();
}

window.onload = function() {
  main();
};
