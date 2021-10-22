// Create map  - use center of America
var myMap = L.map("map", {
	center: [39.82, -98.57],
	zoom: 5
});
  
// Tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
	attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
	tileSize: 512,
    maxZoom: 18,
	zoomOffset: -1,
    id: "light-v10",
	accessToken: API_KEY
}).addTo(myMap);

// API endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get data 
d3.json(queryUrl).then(function(data) {

	// Set circle color by magnitude
	function getColor(i) {
    return i >= 90 ? "darkred" :
        i >= 70 ? "red" :
        i >= 50 ? "darkorange" :
		i >= 30 ? "orange" :
		i >= 10 ? "yellow" :
			"limegreen";
	}
	
	var features = data.features;

	for (var i = 0; i < features.length; i++) {
		
		// Get data for each earthquake
		var mag = features[i].properties.mag;
		var coordinates = features[i].geometry.coordinates;

		// Add circles 
		L.circle(
			[coordinates[1], coordinates[0]], {
				fillOpacity: 0.65,
				fillColor: getColor(coordinates[2]),
				color: "black",
				weight: 0.4,
				radius: mag * 20000
			}).bindPopup("<h3>" + "Location: " + features[i].properties.place +
				"<hr>" + "Magnitude: " + features[i].properties.mag + "</h3>").addTo(myMap);
	};	
        // Define colors
        var color5 = "darkred";
        var color4 = "red";
        var color3 = "darkorange";
        var color2 = "orange";
        var color1 = "yellow";
        var color0 = "limegreen";

//

	// Legend for the chart
	var legend = L.control({position: "bottomright"});
	legend.onAdd = function () {
	
		var div = L.DomUtil.create("div", "info legend"),
		    grades = [color0, color1, color2, color3, color4, color5],
		    labels = ["<10", "10-30","30-50", "50-70", "70-90", "90+"];
            legendInfo = "<h5> + Depth + </h5>";

		// loop through our magnitude intervals and generate a label with a colored square for each interval
		for (var i = 0; i < grades.length; i++) {
			div.innerHTML +=
            '<i style="background:' + grades[i] + '" ></i>' + labels[i] +'<br>';
            }
		return div;
	};
	legend.addTo(myMap);
});