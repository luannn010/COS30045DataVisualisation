function map() {
  
  var w = 1000;
  var h = 500;
  var margin = {top: 100, right: 20, bottom: 60, left: 50};

  var projection = d3.geoMercator()
                     .center([145, -37.8])
                     .scale(3800)
                     .translate([w/2, h/2]);

  var path = d3.geoPath()
               .projection(projection);
               
  var svg = d3.select("#map")
               .append("svg")
               .attr("width", w + margin.left + margin.right)
               .attr("height", h + margin.top + margin.bottom)
               .append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
              
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
         .on("mouseover", function(event, d) {
          // Set up tooltip optional)
          var tooltip = d3.select("#tooltip");
          tooltip.style("visibility", "visible")
            .html("<b>" + d.properties.LGA_name + "</b><br>" +
                  "Unemployment rate: " + d.properties.unemployed)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
          // Change border style
          d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", 2);
        })
        .on("mouseout", function() {
          // Hide tooltip
          var tooltip = d3.select("#tooltip");
          tooltip.style("visibility", "hidden");
          // Revert border style
          d3.select(this)
            .style("stroke", null)
            .style("stroke-width", null);
        });

        // add Cities
        d3.csv("data/VIC_city.csv").then(function(cityData) {
          var circle = svg.selectAll("circle")
            .data(cityData)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
              return projection([+d.lon, +d.lat])[0];
            })
            .attr("cy", function(d) {
              return projection([+d.lon, +d.lat])[1];
            })
            .attr("r", 3)
            .style("fill", "red")
            .style("opacity", 0.75)
            
          var majorCity = svg.selectAll("text.city")
                             .data(cityData)
                             .enter()
                             .append("text")
                             .attr("class","city-lable")
                             .attr("x", function(d) {
                              return projection([+d.lon, +d.lat])[0] +10;
                            })
                             .attr("y", function(d) {
                              return projection([+d.lon, +d.lat])[1] +10 ;
                            })
                             .text(function(d) {
                              return d.place
                             })
                             .style("font-size", "12px")
                             .style("fill", "green")
                            
        });
        
        
        
        // Add legends (text and color)(optional)

          var legend = svg.append("g")
                  .attr("class", "legend")
                  .attr("transform", "translate(" + (w - 100) + "," + 20 + ")")
                  .style("font-size", "20px");

          var legendTitle = legend.append("text")
                                .attr("class", "legend-title")
                                .attr("x", 10)
                                .attr("y", -10)
                                .text("Unemployed");

          var legendRect = legend.selectAll("rect")
                                .data(color.range())
                                .enter()
                                .append("rect")
                                .attr("x", 10)
                                .attr("y", function(d, i) { return i * 20; })
                                .attr("width", 20)
                                .attr("height", 20)
                                .style("fill", function(d) { return d; });

          var legendText = legend.selectAll("text.legend-label")
                                .data(color.range())
                                .enter()
                                .append("text")
                                .attr("class", "legend-label")
                                .attr("x", 35)
                                .attr("y", function(d, i) { return i * 20 + 14; })
                                .text(function(d, i) { 
                                  var extent = color.invertExtent(d);
                                  var format = d3.formatPrefix(".1", 1e3);
                                  return format(+extent[0]) + " - " + format(+extent[1]);
                                })
                                .style("font-size", "20px")
                                .style("fill", "black");
                              

                  

         
    });


    
  });
}

function main() {
  map();
}

window.onload = function() {
  main();
};
