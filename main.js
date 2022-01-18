window.onload = () => {
  const baseURL =
    "https://raw.githubusercontent.com/digital-guard/preservCutGeo-BR2021/main/data/MG/BeloHorizonte/_pk0008.01/geoaddress/";
  const fp_ghs = "geohahes";
  const map = L.map("map", {});

  const tiles = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      // maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(map);

  // geohahes.on("mouseover", (e) => {
  //   //console.log("debug2",fp_ghs,this);
  //   geohahes.setStyle({
  //     fillColor: "#ff0000",
  //   });
  // });
  
  function onEachFeature(feature, layer) {
    let popupContent =
      "type: " +
      feature.type +
      "</p>";
    if (feature.properties && feature.properties.ghs) {
      popupContent += feature.properties.val_density_km2;
    }
    layer.bindPopup(popupContent);
  }

  map.setView(new L.LatLng(-23.550385, -46.633956), 10);

  fetch(baseURL + fp_ghs + ".geojson")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.features);
      geohashes = L.geoJSON(data, {
        onEachFeature: onEachFeature,
      }).addTo(map);
      map.fitBounds(geohashes.getBounds());
    });
}; //window onload
