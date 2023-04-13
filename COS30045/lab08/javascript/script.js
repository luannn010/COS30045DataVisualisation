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
                .range(['rgb(255,255,204)','rgb(161,218,180)','rgb(65,182,196)','rgb(44,127,184)','rgb(37,52,148)']);
 
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
