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
    maxZoom: 18,
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

// updateMap(config.map);

initBasemaps(config.basemaps);

// Kuva Natura 2000 ala piir

var latlngs = [
[59.396958, 24.696348],
[59.396398, 24.694604],
[59.39603, 24.69288],
[59.395678, 24.690533],
[59.395304, 24.687635],
[59.394271, 24.688255],
[59.393997, 24.68857],
[59.393026, 24.689314],
[59.392748, 24.692001],
[59.392503, 24.692341],
[59.391554, 24.694382],
[59.391333, 24.695125],
[59.391914, 24.695211],
[59.392675, 24.696351],
[59.392938, 24.697957],
[59.39301, 24.699371],
[59.39335, 24.701685],
[59.394252, 24.702106],
[59.394058, 24.698423],
[59.395265, 24.698226],
[59.396311, 24.696819],
[59.396402, 24.697051]
];

var natura2000Border = L.polygon(latlngs, {color: 'red'}).addTo(map);

// Natura 2000 ala ikoon
var naturaIcon = L.IconMaterial.icon({
  icon: 'error',            // Name of Material icon
  iconColor: 'white',              // Material icon color (could be rgba, hex, html name...)
  markerColor: 'tomato',  // Marker fill color
  outlineColor: 'yellow',            // Marker outline color
  outlineWidth: 1,                   // Marker outline width 
  iconSize: [31, 42]                 // Width and height of the icon
})

// Rahumäe metsa ikoon
var rahumaeIcon = L.IconMaterial.icon({
  icon: 'error',            // Name of Material icon
  iconColor: 'white',              // Material icon color (could be rgba, hex, html name...)
  markerColor: 'green',  // Marker fill color
  outlineColor: 'yellow',            // Marker outline color
  outlineWidth: 1,                   // Marker outline width 
  iconSize: [31, 42]                 // Width and height of the icon
})

// Pesapuu ikoon
var nesttreeIcon = L.IconMaterial.icon({
  icon: 'info',            // Name of Material icon
  iconColor: 'wheat',              // Material icon color (could be rgba, hex, html name...)
  markerColor: 'saddlebrown',  // Marker fill color
  outlineColor: 'yellow',            // Marker outline color
  outlineWidth: 1,                   // Marker outline width 
  iconSize: [31, 42]                 // Width and height of the icon
})

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

// Kuva punktid GPX-failidest - Nr 1 (Natura).
var gpx = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Ruumiandmed/main/Nature/Nr-1.gpx';
new L.GPX(gpx, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': naturaIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// Kuva punktid GPX-failidest - Nr 2 (Natura).
var gpx = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Ruumiandmed/main/Nature/Nr-2.gpx';
new L.GPX(gpx, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': naturaIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// Kuva punktid GPX-failidest - Nr 3 (Natura).
var gpx = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Ruumiandmed/main/Nature/Nr-3.gpx';
new L.GPX(gpx, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': naturaIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// Kuva punktid GPX-failidest - Nr 4 (Rahumäe).
var gpx = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Ruumiandmed/main/Nature/Nr-4.gpx';
new L.GPX(gpx, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': rahumaeIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// Kuva punktid GPX-failidest - Nr 5 (Natura).
var gpx = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Ruumiandmed/main/Nature/Nr-5.gpx';
new L.GPX(gpx, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': naturaIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// markerOnClick käivitub markerile klõpsamisel. Kuvab teabe punkti kohta.
function markerOnClick(e) {
  console.debug("Klõpsatud markerile: " + this.options.title);
  kpn = this.options.title; // Klõpsatud punkti nimi.
  kp = pMap.get(kpn); // Klõpsatud punkt.
}

