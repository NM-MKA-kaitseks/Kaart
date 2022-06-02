// Aluskaardi tailid on L-EST'97s. seadistame kaardi.
// crs on "koordinaatsüsteem".
var crs = new L.Proj.CRS(
  'EPSG:3301',
  '+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 ' +
  '+lon_0=24 +x_0=500000 +y_0=6375000 ' +
  '+ellps=GRS80 ' +
  '+towgs84=0,0,0,0,0,0,0 ' +
  '+units=m +no_defs',
  {
    resolutions: [
      4000, 2000, 1000, 500, 250, 125, 62.5, 31.25, 15.625, 7.8125, 3.90625,
      1.953125, 0.9765625, 0.48828125, 0.244140625, 0.1220703125, 0.06103515625,
      0.030517578125, 0.0152587890625, 0.00762939453125, 0.003814697265625
    ],
    transformation: new L.Transformation(1, -40500, -1, 7017000.000000),
    //origin: [40500, 5993000.000000],
    bounds: L.bounds(
      L.point(40500, 5993000.000000),
      L.point(1064500.000000, 7017000.000000)
    )
  }
);

// Kaart ise. Läheb div elementi "map".
var map = L.map(
  'Kaart',
  {
    crs: crs,
    center: L.latLng(59.375150, 24.717757),
    zoom: 10, // Oli: 7.
    minZoom: 3,
    maxZoom: 24,
    maxBounds: L.latLngBounds(
      [[53.87677644829216, 17.023771159524344],
      [62.85582385242469, 35.106036681873526]]),
  }
);

var baselayers = {};
var overlays = {};
var layerControl = L.control.groupedLayer(baselayers, overlays);

layerControl.addTo(map);

var aboutWindow = L.control.about();

updateMap(config.map);

initBasemaps(config.basemaps);

// Lisa Natura 2000 alad.
var natura2000Layer = L.tileLayer.wms(
  'https://gsavalik.envir.ee/geoserver/eelis/ows?', {
    layers: 'kr_loodusala',
    format: 'image/png',
    // style: 'kkr.n2k.default',
    style: 'line',
    transparent: true,
    zIndex: 20
  }
).addTo(map);

// Lisa kaitsealad
var kaitsealad = L.tileLayer.wms(
  'https://gsavalik.envir.ee/geoserver/eelis/ows?', {
    layers: 'kr_kaitseala',
    format: 'image/png',
    style: 'polygon',
    // style: 'eelis:kkr.kaitseala.lipik',
    transparent: true,
    zIndex: 21
  }
).addTo(map);

// Hävitatud puu ikoon
var treeIcon = L.IconMaterial.icon({
  icon: 'cancel',            // Name of Material icon
  iconColor: 'white',              // Material icon color (could be rgba, hex, html name...)
  markerColor: 'saddlebrown',  // Marker fill color
  outlineColor: 'yellow',            // Marker outline color
  outlineWidth: 1,                   // Marker outline width 
  iconSize: [31, 42]                 // Width and height of the icon
})

// Kuklasepesa ikoon
var kuklaseIcon = L.IconMaterial.icon({
  icon: 'cancel',            // Name of Material icon
  iconColor: 'white',              // Material icon color (could be rgba, hex, html name...)
  markerColor: 'peachpuff',  // Marker fill color
  outlineColor: 'hotpink',            // Marker outline color
  outlineWidth: 1,                   // Marker outline width 
  iconSize: [31, 42]                 // Width and height of the icon
})

// Pesapuu ikoon
var nesttreeIcon = L.IconMaterial.icon({
  icon: 'info',            // Name of Material icon
  iconColor: 'wheat',              // Material icon color (could be rgba, hex, html name...)
  markerColor: 'red',  // Marker fill color
  outlineColor: 'yellow',            // Marker outline color
  outlineWidth: 1,                   // Marker outline width 
  iconSize: [31, 42]                 // Width and height of the icon
})

// Kuva punktid GPX-failidest - 22.05.2022 mõõtmised.
var gpx = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Ruumiandmed/main/Nature/20220522-KOKKU.gpx';
new L.GPX(gpx, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': treeIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// Kuva punktid GPX-failidest - 26.05.2022 kändude mõõtmised.
var gpx = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Ruumiandmed/main/Teine/20220526-KOKKU.gpx';
new L.GPX(gpx, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': treeIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// Kuva punktid GPX-failidest - Kuklasepesad.
var gpx = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Ruumiandmed/main/Teine/Kuklasepesad-KOKKU.gpx';
new L.GPX(gpx, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': kuklaseIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// Kuva pesapuu.
var pesapuu = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Ruumiandmed/main/Nature/Pesapuu.gpx';
new L.GPX(pesapuu, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': nesttreeIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

/*
// Kuva asjaomased katastriüksused.
var ehitajatetee2 = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Ruumiandmed/main/Kat/Asjakohased.gpx';
new L.GPX(ehitajatetee2, {
  polyline_options: {
    color: 'red',
    opacity: 0.75,
    weight: 3
  },
  async: true,
  parseElements: ['track']
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);
*/

// Kuva MKA piir.

fetch("data/MKA.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // use geoJSON. Vt: https://leafletjs.com/examples/geojson/,
    // sh stiili määramine.
    L.geoJSON(data, {
      style: {
        color: 'green',
        weight: 3,
        fillColor: 'green',
        fillOpacity: 0
      },
      interactive: false
      // onEachFeature: onEachFeature,
    }).addTo(map);
  });

/*
// Kuva kaitseala katastriüksused.
var kaitseala = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Ruumiandmed/main/Kat/Kaitseala.gpx';
new L.GPX(kaitseala, {
  async: true,
  parseElements: ['track'],
  polyline_options: {
    color: 'green',
    weight: 3
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);
*/

// markerOnClick käivitub markerile klõpsamisel. Kuvab teabe punkti kohta.
function markerOnClick(e) {
  console.debug("Klõpsatud markerile: " + this.options.title);
  kpn = this.options.title; // Klõpsatud punkti nimi.
  kp = pMap.get(kpn); // Klõpsatud punkt.
}

