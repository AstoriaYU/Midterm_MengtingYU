

  /* =====================
  Leaflet Configuration
  ===================== */
var map = L.map('map', {
  center: [41.838034, -87.681105],
  zoom: 11
});

// Try some differnet basemaps:
basemapURL = "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
// basemapURL = "http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
// basemapURL = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"


var Stamen_TonerLite = L.tileLayer(basemapURL, {
// if you change the basemap, and publish it on the web, you should attribute accurately
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


function pointStyle1 (feature, latlng) {
  if (feature.properties.governance == "Charter") {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: "#3388ff", fillOpacity: 0.8}).bindPopup(feature.properties.short_name);
  }
  else if (feature.properties.governance == "Contract") {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: "#ED553B", fillOpacity: 0.8}).bindPopup(feature.properties.short_name);
  }
  else if (feature.properties.governance == "District") {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: "#3CAEA3", fillOpacity: 0.8}).bindPopup(feature.properties.short_name);
  }
  else {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: "#f4c095", fillOpacity: 0.8 }).bindPopup(feature.properties.short_name);
  }
}

function pointStyle2 (feature, latlng) {
  if (feature.properties.grade_cat == "HS") {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: "#3388ff", fillOpacity: 0.8}).bindPopup(feature.properties.short_name);
  }
  else if (feature.properties.grade_cat == "MS") {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: "#ED553B", fillOpacity: 0.8}).bindPopup(feature.properties.short_name);
  }
  else {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: "#f4c095", fillOpacity: 0.8 }).bindPopup(feature.properties.short_name);
  }
}

function getColor(count) {
    return count > 623 ? '#581845' :
           count > 453  ? '#900C3F' :
           count > 333  ? '#C70039' :
           count > 208  ? '#FF5733' :
                      '#FFC300';
}

function pointStyle3(feature, latlng) {
    return L.circleMarker(latlng, {
        stroke: false, radius: 5, color: getColor(feature.properties.Student_Co), fillOpacity: 0.8}).bindPopup(feature.properties.short_name);
}

/*function pointStyle3 (feature, latlng) {
  if (feature.properties.Student_Co < 208) {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: getColor(feature.properties.Student_Co), fillOpacity: 0.8}).bindPopup(feature.properties.short_name);
  }
  else if (feature.properties.Student_Co < 333 && feature.properties.Student_Co >= 208) {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: "#FF5733", fillOpacity: 0.8}).bindPopup(feature.properties.short_name);
  }
  else if (feature.properties.Student_Co < 453 && feature.properties.Student_Co >= 333) {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: "#C70039", fillOpacity: 0.8}).bindPopup(feature.properties.short_name);
  }
  else if (feature.properties.Student_Co < 623 && feature.properties.Student_Co >= 453) {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: "#900C3F", fillOpacity: 0.8}).bindPopup(feature.properties.short_name);
  }
  else {
    return L.circleMarker(latlng, { stroke: false, radius: 5, color: "#581845", fillOpacity: 0.8 }).bindPopup(feature.properties.short_name);
  }
}*/

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.short_name);
  layer.on('click', function(e) {
    map.setView([feature.properties.lat,feature.properties.long], 17);
    if(feature.properties && feature.properties.short_name) {
      console.log(feature.properties.short_name);
      $('#schooltitle').text(feature.properties.Long_Name);
      $('#schooltype').text(feature.properties.governance);
      $('#schooladdress').text(feature.properties.Location);
      $('#schooleval').html("Overall Rating: "+feature.properties.Overall_Ra+"</br></br>Student Growth: "+feature.properties.Student_Gr+"</br></br>Student Attainment: "+feature.properties.Student_At);
      $('#schooltitle2').text(feature.properties.Long_Name);
      $('#schoolsummary').html(feature.properties.Summary);
  }
});
}

var myIcon1 = L.icon({
  iconUrl: 'js/noun_School.png',
  iconSize:     [15, 15], // width and height of the image in pixels
  iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
})

function pointStyle4 (feature, latlng) {
  var myIcon1 = L.icon({
    iconUrl: 'js/noun_School.png',
    iconSize:     [15, 15], // width and height of the image in pixels
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })
  return L.marker(latlng, { icon: myIcon1});
}

function charterFilter(feature) {
  if (feature.properties.governance == "Charter") return true
}

function contractFilter(feature) {
  if (feature.properties.governance == "Contract") return true
}

function districtFilter(feature) {
  if (feature.properties.governance == "District") return true
}

function highschFilter(feature) {
  if (feature.properties.grade_cat == "HS") return true
}

function midschFilter(feature) {
  if (feature.properties.grade_cat == "MS") return true
}

function elmschFilter(feature) {
  if (feature.properties.grade_cat == "ES") return true
}

/*var myLayerOptions1 = {
  pointToLayer: pointStyle1
}*/
var layer1 = L.geoJSON(schoolsPointGeoJson, {pointToLayer: pointStyle1, onEachFeature: onEachFeature});

/*var myLayerOptions2 = {
  pointToLayer: pointStyle2
}*/
var layer2 = L.geoJSON(schoolsPointGeoJson, {pointToLayer: pointStyle2, onEachFeature: onEachFeature});

/*var myLayerOptions3 = {
  pointToLayer: pointStyle3
}*/
var layer3 = L.geoJSON(schoolsPointGeoJson, {pointToLayer: pointStyle3, onEachFeature: onEachFeature});

/*var myLayerOptions4 = {
  pointToLayer: pointStyle4
}*/
var layer4 = L.geoJSON(schoolsPointGeoJson, {pointToLayer: pointStyle4, onEachFeature: onEachFeature});

var Charterlayer = L.geoJson(schoolsPointGeoJson, {
  pointToLayer: pointStyle1,
  filter: charterFilter
});

var Contractlayer = L.geoJson(schoolsPointGeoJson, {
  pointToLayer: pointStyle1,
  filter: contractFilter
});

var Districtlayer = L.geoJson(schoolsPointGeoJson, {
  pointToLayer: pointStyle1,
  filter: districtFilter
});

var Highschlayer = L.geoJson(schoolsPointGeoJson, {
  pointToLayer: pointStyle2,
  filter: highschFilter
});

var Midschlayer = L.geoJson(schoolsPointGeoJson, {
  pointToLayer: pointStyle2,
  filter: midschFilter
});

var Elmschlayer = L.geoJson(schoolsPointGeoJson, {
  pointToLayer: pointStyle2,
  filter: elmschFilter
});

var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 208, 333, 453, 623, 999],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};


//build slides
var slides = [{
    title: "Chigaco School Types",
    text: "Function: </br>1. Click school points to zoomin</br>2. Select school type by checkbox and click filter",
    layer: layer1
  },
  {
    title: "Chigaco School Grade Levels",
    text: "Function: </br>1. Click school points to zoomin</br>2. Select school grade level by checkbox and click filter",
    layer: layer2
  },
  {
    title: "Chigaco School Student Numbers",
    text: "Function: </br>1. Click school points to zoomin</br>2. Input a range of student numbers and click filter ",
    layer: layer3
  },
  {
    title: "Chigaco School Evaluation",
    text: "Function: </br>1. Click school markers to zoomin</br>2. Click markers to show school information and evaluation",
    layer: layer4
  },
  {
    title: "Chigaco School Summary",
    text: "Function: </br>1. Click school markers to zoomin</br>2. Click markers to show school general summary",
    layer: layer4
  }
]
var currentSlide = 0;

var addTitle = (title) => {
  $('.sidebar').prepend(`<h1 id='title'>${title}</h1>`);
}

var addText = (text) => {

  $('#title').after(`<p class = "summary-story" id='text'>${text}</p>`);
}

var setLayer = (layer) => {
if (currentSlide == 0) {
  $('#previous').hide();
  $('#cboxarea').show();
  $('#numberarea').hide();
  $('#infoarea').hide();
  $('#summary').hide();
  $('#filter').show();
  $('#legend').hide();
  $('#story').show();
  $('#checkbox-label1').text("Is Charter school?  ");
  $('#checkbox-label2').text("Is Contract school?  ");
  $('#checkbox-label3').text("Is District school?  ");
  $('#schoolstory').html("There are three types of school in Chigaco: Charter, Contract, and District.</li><li>A majority of the schools are District school, the total number is 515.</li><li>Charter school ranks second, there are 120 public charter school in Chicago.</li><li>Only 9 are Contract school, which is a kind of public funded school under a contract with a public agency")
  layer = layer1;
  map.setView([41.838034, -87.681105], 11);
} else if (currentSlide == 1) {
  $('#previous').show();
  $('#cboxarea').show();
  $('#numberarea').hide();
  $('#infoarea').hide();
  $('#summary').hide();
  $('#filter').show();
  $('#legend').hide();
  $('#story').show();
  $('#checkbox-label1').text("Is High school?  ");
  $('#checkbox-label2').text("Is Middle school?  ");
  $('#checkbox-label3').text("Is Elementary school?  ");
  $('#schoolstory').html("There are three levels of school grade in Chigaco: Elementary school, Middle School, and Highschool.</li><li>Elementary school is the most common type in Chicago, the total number is 471.</li><li>High schools are fewer than Elementary school in number, which is 180.</li><li>Middle schools are much more fewer, only 9 are classfied as Middle school.")
  layer = layer2;
  map.setView([41.838034, -87.681105], 11);
} else if (currentSlide == 2) {
  $('#previous').show();
  $('#cboxarea').hide();
  $('#numberarea').show();
  $('#infoarea').hide();
  $('#summary').hide();
  $('#filter').show();
  $('#summary').hide();
  $('#story').show();
  $('#number-label1').text("Minimum student number: ");
  $('#number-label2').text("Maximum student number: ");
  $('#schoolstory').html("<li>The number of students in Chicago's school ranges from 0 to 999.</li><li>The average total number of students for all Chicago school is 451, and the median is 413.</li><li>The schools in northern area usually have more students than those in central and southern Chicago.")
  layer = layer3;
  legend.addTo(map);
  map.setView([41.838034, -87.681105], 11);
}
else if (currentSlide == 3) {
  $('#previous').show();
  $('#cboxarea').hide();
  $('#numberarea').hide();
  $('#infoarea').show();
  $('#summary').hide();
  $('#filter').hide();
  $('#story').hide();
  $('#schooltitle').text("School title");
  $('#schooltype').text("Type");
  $('#schooladdress').text("Address");
  $('#schooleval').text("Evaluation");
  layer = layer4;
  map.setView([41.934291, -87.685777], 13);
}
else if (currentSlide == 4) {
  $('#previous').show();
  $('#cboxarea').hide();
  $('#numberarea').hide();
  $('#infoarea').hide();
  $('#story').hide();
  $('#summary').show();
  $('#filter').hide();
  $('#schooltitle2').text("School title");
  $('#schoolsummary').text("Summary");
  layer = layer4;
  map.setView([41.934291, -87.685777], 13);
}
layer.addTo(map);
map.on('click', onEachFeature)
};

var filterLayer = () => {
  map.removeLayer(layer1);
  map.removeLayer(layer2);
  map.removeLayer(layer3);
  map.setView([41.838034, -87.681105], 11);
if (currentSlide == 0) {

  if ($('#cbox-input1').prop('checked')) {
    Charterlayer.addTo(map);
  }
  else {
    map.removeLayer(Charterlayer);
  }
  if ($('#cbox-input2').prop('checked')) {
    Contractlayer.addTo(map);
  }
  else {
    map.removeLayer(Contractlayer);
  }
  if ($('#cbox-input3').prop('checked')) {
    Districtlayer.addTo(map);
  }
  else {
    map.removeLayer(Districtlayer);
  }
//Flayer = L.layerGroup([Charterlayer, Contractlayer, Districtlayer]);
} else if (currentSlide == 1) {

  if ($('#cbox-input1').prop('checked')) {
    Highschlayer.addTo(map);
  }
  else {
    map.removeLayer(Highschlayer);
  }
  if ($('#cbox-input2').prop('checked')) {
    Midschlayer.addTo(map);
  }
  else {
    map.removeLayer(Midschlayer);
  }
  if ($('#cbox-input3').prop('checked')) {
    Elmschlayer.addTo(map);
  }
  else {
    map.removeLayer(Elmschlayer);
  }
//Flayer = L.layerGroup([Highschlayer, midschlayer, Elmschlayer]);
} else if (currentSlide == 2) {

  minstu=$('#numeric-input1').val();
  maxstu=$('#numeric-input2').val();
    numstulayer = L.geoJson(schoolsPointGeoJson, {
      pointToLayer: pointStyle3,
      filter: function(feature, layer) {
                return feature.properties.Student_Co >= minstu && feature.properties.Student_Co <= maxstu;
            }
    });
  numstulayer.addTo(map);
}
};

var cleanup = () => {
  $('#title').remove()
  $('#text').remove()
  $('')
  $('#cbox-input1').prop('checked', false)
  $('#cbox-input2').prop('checked', false)
  $('#cbox-input3').prop('checked', false)
  map.removeLayer(layer1);
  map.removeLayer(layer2);
  map.removeLayer(layer3);
  map.removeLayer(layer4);
  map.removeLayer(Charterlayer);
  map.removeLayer(Contractlayer);
  map.removeLayer(Districtlayer);
  map.removeLayer(Highschlayer);
  map.removeLayer(Midschlayer);
  map.removeLayer(Elmschlayer);
}

var buildSlide = (slideObject) => {
addTitle(slideObject.title)
addText(slideObject.text)
//setColor(slideObject.color)
setLayer(slideObject.layer)
}

buildSlide(slides[currentSlide])

var resetSlide = (slideObject) => {
  $('#cbox-input1').prop('checked', false)
  $('#cbox-input2').prop('checked', false)
  $('#cbox-input3').prop('checked', false)
  $('#numeric-input1').val("")
  $('#numeric-input2').val("")

  setLayer(slideObject.layer);
  map.removeLayer(Charterlayer);
  map.removeLayer(Contractlayer);
  map.removeLayer(Districtlayer);
  map.removeLayer(Highschlayer);
  map.removeLayer(Midschlayer);
  map.removeLayer(Elmschlayer);
}

$("#next").click(() => {
  cleanup();
  if (currentSlide < 4) {
    currentSlide = currentSlide + 1;
  };
  buildSlide(slides[currentSlide]);
})

$("#previous").click(() => {
  cleanup();
  if (currentSlide > 0) {
    currentSlide = currentSlide - 1;
  };
  buildSlide(slides[currentSlide]);
})

$("#filter").click(() => {
  filterLayer();
})

$( "#reset" ).click(() => {
  resetSlide(slides[currentSlide]);
});


// $( "#btnToRemove" ).click(function() {
//   if (currentSlide == 0) {
//     layer = layer1;
//   }
//   else if (currentSlide == 1) {
//     layer = layer2;
//   }
//   else if (currentSlide == 2) {
//     layer = layer3;
//   }
//   map.removeLayer(layer);
// });

/*var myStyle = L.geoJson(squaresPoly,{
  style: function(feature) {
    switch (feature.properties.TYPE) {
      case 'Circle': return {color: "#0011ff"};
      case 'Square': return {color: "#0000ff"};
    }
  }
})*/
