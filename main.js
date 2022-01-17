window.onload = () => {
  var map = L.map("map", {
    zoomControl: false,
  }).fitWorld();

  var tiles = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(map);

  function onLocationFound(e) {
    var radius = e.accuracy / 2;

    var locationMarker = L.marker(e.latlng)
      .addTo(map)
      .bindPopup("You are within " + radius + " meters from this point")
      .openPopup();

    var locationCircle = L.circle(e.latlng, radius).addTo(map);
  }

  function onLocationError(e) {
    alert(e.message);
  }

  map.addControl(L.control.zoom({ position: "topright" }));

  map.on("locationfound", onLocationFound);
  map.on("locationerror", onLocationError);

  map.locate({
    setView: true,
    maxZoom: 16,
  });

};
