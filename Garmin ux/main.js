// This will let you use the .remove() function later on
if (!("remove" in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FuZGVyb2UiLCJhIjoiY2sxengzdXJqMHR3dzNubXZvOHBpdnR5aSJ9.A6TG6pK8OUspJlBGePZgsQ";

// This adds the map to the page
var map = new mapboxgl.Map({
  // container id specified in the HTML
  container: "map",
  // style URL
  style: "mapbox://styles/sanderoe/ck202depo53bd1cp9y4yme2uz",
  // initial position in [lon, lat] format
  center: [10.1316, 56.168463],
  // initial zoom
  zoom: 16
  
});

// image dom//
var img = new Image();
img.src = "";

/////

/////
var stores = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10.13139, 56.167685]
      },
      properties: {
        InfoFormatted: "Hvordan klare de sig under pigtråden",
        sucess: "",
        info: "Barbed Wire",
        forhindring:
          "BARBED WIRE Kravlegården er en ægte klassiker! Pigtråden tvinger dig ned på alle 4!" +
          "<button onclick=window.open('newpage.html');>Se live..</button>" +
          "<button onclick=window.open('newpage.html');>Se mere..</button>"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [, 10.130393, 56.168234]
      },
      properties: {
        InfoFormatted: "Kralv under en masse reb",
        sucess: "",
        info: "Kravl under en masser reb",
        forhindring:
          "Bodycrawl Telefonenpælene har været med siden 2013 og har taget pusten af mange. De tværliggende stokke indeholder 4 faser, 2 x over og 2 x under." +
          "<button onclick=window.open('newpage.html');>Se live..</button>" +
          "<button onclick=window.open('newpage.html');>Se mere..</button>"
      },
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10.133204, 56.168668]
      },
      properties: {
        InfoFormatted: "Kralv over en masse reb",
        sucess: "",
        info: "Climb the web",
        forhindring:
          "WEBCLIMB et løsthængende net er udfordrende at klatre i." +
          "<br/>" +
          "<button onclick=window.open('newpage.html');>Se live..</button>" +
          "<button onclick=window.open('newpage.html');>Se mere..</button>"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10.131295, 56.168853]
      },
      properties: {
        InfoFormatted: "Test din overkropsstyrke på denne brutale forhindring",
        sucess: "",
        info: "EDGE",
        forhindring:
          "Edge er det nyeste skud på stammen af forhindringer, fra Nordic Race" +
          "</BR>" +
          "<button onclick=window.open('newpage.html');>Live feed..</button>" +
          "<button onclick=window.open('newpage.html');>Se mere..</button>"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10.132604, 56.168152]
      },
      properties: {
        InfoFormatted: "Test din overkropsstyrke på the big rig",
        sucess: "",
        info: "BIG RIG",
        forhindring:
          "BIG RIG Få et godt greb, brug armene og få et godt sving i kroppen." +
          "<br/>" +
          "<button onclick=window.open('newpage.html');>Se live..</button>" +
          "<button onclick=window.open('newpage.html');>Se mere..</button>"
      }
    }
  ]
};


map.on("load", function(e) {
  // Add the data to your map as a layer
  map.addSource("places", {
    type: "geojson",
    data: stores
  });

  buildLocationList(stores);
});

function buildLocationList(data) {
  /// while data -

  // Iterate through the list of stores
  for (i = 0; i < data.features.length; i++) {
    var currentFeature = data.features[i];

    // Shorten data.feature.properties to just `prop` so we're not
    // writing this long form over and over again.
    var prop = currentFeature.properties;

    // Select the listing container in the HTML and append a div
    // with the class 'item' for each store
    var listings = document.getElementById("listings");
    var listing = listings.appendChild(document.createElement("div"));
    listing.className = "item";
    listing.id = "listing" + i;

    // Create a new link with the class 'title' for each store
    // and fill it with the store address
    var link = listing.appendChild(document.createElement("a"));
    link.href = "#";
    link.className = "title";
    link.dataPosition = i;
    link.innerHTML = prop.info;
    // Add an event listener for the links in the sidebar listing
    link.addEventListener("click", function(e) {
      // Update the currentFeature to the store associated with the clicked link
      var clickedListing = data.features[this.dataPosition];
      // 1. Fly to the point associated with the clicked link
      flyToStore(clickedListing);
      // 2. Close all other popups and display popup for clicked store
      createPopUp(clickedListing);
      // 3. Highlight listing in sidebar (and remove highlight for all other listings)
      var activeItem = document.getElementsByClassName("active");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      this.parentNode.classList.add("active");
    });

    // Create a new div with the class 'details' for each store
  
    var details = listing.appendChild(document.createElement("div"));
    details.innerHTML = prop.info + "# " + prop.InfoFormatted;
    if (prop.sucess) {
      details.innerHTML += " &middot; " + prop.InfoFormatted;
    }
  }
}

//////


//Function to fly to the correct store
function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 17
  });
}

//Function to display popup features
function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName("mapboxgl-popup");
  // Check if there is already a popup on the map and if so, remove it
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({ closeOnClick: true })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      "<h3>Forhindring </h3>" +
        "<h4>" +
        currentFeature.properties.forhindring +
        "</h4>" +
        "<h4>" +
        currentFeature.properties.sucess +
        "</h4>"
      // +
      /// "<img>"
    )
    .addTo(map);
}

///////////////////////


///////




//////

//// Add an event listener for when a user clicks on the map

stores.features.forEach(function(marker) {
  // Create a div element for the marker
  var el = document.createElement("div");
  // Add a class called 'marker' to each div
  el.className = "marker";
  // By default the image for your custom marker will be anchored
  // by its center. Adjust the position accordingly
  // Create the custom markers, set their position, and add to map
  new mapboxgl.Marker(el, { offset: [0, -23] })
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
  el.addEventListener("click", function(e) {
    var activeItem = document.getElementsByClassName("active");
    // 1. Fly to the point
    flyToStore(marker);
    // 2. Close all other popups and display popup for clicked store
    createPopUp(marker);
    // 3. Highlight listing in sidebar (and remove highlight for all other listings)
    e.stopPropagation();
    if (activeItem[0]) {
      activeItem[0].classList.remove("active");
    }

    var listing = document.getElementById("listing-" + i);
    console.log(listing);
    listing.classList.add("active");
  });
});
////
map.scrollZoom.disable();

// click for reset function
$("#Topimage").click(function() {
  location.reload();
});

///////


var runners = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10.129951,56.168015]
      },
      properties: {
        InfoFormatted: "Hvordan klare de sig under pigtråden",
        sucess: "",
        info: "Barbed Wire",
        forhindring:
          "BARBED WIRE Kravlegården er en ægte klassiker! Pigtråden tvinger dig ned på alle 4!" +
          "<button onclick=window.open('newpage.html');>Se live..</button>" +
          "<button onclick=window.open('newpage.html');>Se mere..</button>"
      }
    },{
  
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10.13304, 56.1685]
      },
      properties: {
        InfoFormatted: "Kralv over en masse reb",
        sucess: "",
        info: "Climb the web",
        forhindring:
          "WEBCLIMB et løsthængende net er udfordrende at klatre i." +
          "<br/>" +
          "<button onclick=window.open('newpage.html');>Se live..</button>" +
          "<button onclick=window.open('newpage.html');>Se mere..</button>"
      }
    
    }
  ]
};


runners.features.forEach(function(rmarker) {

  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'rmarker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(rmarker.geometry.coordinates)
    .addTo(map);
    
});


   

var markerHeight = 50, markerRadius = 10, linearOffset = 25;
var popupOffsets = {
 'top': [0, 0],
 'top-left': [0,0],
 'top-right': [0,0],
 'bottom': [0, -markerHeight],
 'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
 'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
 'left': [markerRadius, (markerHeight - markerRadius) * -1],
 'right': [-markerRadius, (markerHeight - markerRadius) * -1]
 };
var popup = new mapboxgl.Popup({offset: popupOffsets, className: 'rmarker mapboxgl-marker mapboxgl-marker-anchor-center'})
  .setLngLat(e.lngLat)
  .setHTML("<h1>Hello World!</h1>")
  .setMaxWidth("300px")
  .addTo(map);



  ////////
