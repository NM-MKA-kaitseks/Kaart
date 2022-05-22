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

// kuvaMarkerid();

// Create a semi-transparent bus icon
var stumpIcon = L.IconMaterial.icon({
  icon: 'error',            // Name of Material icon
  iconColor: 'white',              // Material icon color (could be rgba, hex, html name...)
  markerColor: 'rgba(255,0,0,0.5)',  // Marker fill color
  outlineColor: 'yellow',            // Marker outline color
  outlineWidth: 1,                   // Marker outline width 
  iconSize: [31, 42]                 // Width and height of the icon
})

// Kuva punktid GPX-failist.
var gpx = 'https://raw.githubusercontent.com/NM-MKA-kaitseks/Testandmed/main/ANDMED_02.gpx';
new L.GPX(gpx, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': stumpIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// KuvaMarkerid() kuvab kõik markerid.
function kuvaMarkerid() {
  pMap.forEach(
    (p) => {
      kuvaPunkt(p.nimi, 1.0, markerOnClick);
    }
  );
 }

// kuvaPunkt otsib mäpist pMap punkti nimi ja loob sellele vastava markeri.
// Kui marker on juba olemas, siis muudab ainult läbipaistmatust.
// Teise parameetrina anda läbipaistmatus. Kandidaadi läbipaistmatus on 0.5;
// marsruudi tavalise punkti läbipaistmatus on 1.0.
// Kolmas parameeter on punkti markerile klõpsamist käsitlev funktsioon. Kui markerile on juba
// varem lisatud käsitlev f-n, siis see see asendatatakse. 
function kuvaPunkt(nimi, opacity, handler) {
  console.debug('kuvaPunkt: ', nimi, opacity);
  // Otsi mäpist punkt.
  p = pMap.get(nimi);
  // Kontrolli, kas marker on juba olemas.
  if (p.visible) {
    // Järgmised toimingud on idempotentsed.
    // Muuda läbipaistmatust.
    p.marker.setOpacity(opacity);
    // Eemalda võimalikud eelmised käsitlejad.
    p.marker.off();
    console.log("Eemaldan eelmised käsitlejad: " + nimi);
    // Lisa markerivajutuse käsitleja.
    p.marker.on('click', handler);
    // Märgi markeri loomine või muutmine mäpis pMap.
    pMap.set(nimi,
      {
        nimi: p.nimi,
        loc: p.loc,
        visible: true,
        opacity: opacity,
        marker: p.marker
      }
    );
  } else {
    // Defineeri marker.
    var m = L.marker(
      p.loc,
      {
        title: p.nimi,
        opacity: opacity
      }
    );
    // Lisa marker kaardile.  
    m.addTo(map);
    // Märgi markeri loomine mäpis pMap.
    pMap.set(nimi,
      {
        nimi: p.nimi,
        loc: p.loc,
        visible: true,
        opacity: opacity,
        marker: m
      }
    );
    // Lisa markerivajutuse käsitleja.
    m.on('click', handler);
  }
}

// markerOnClick käivitub markerile klõpsamisel. Kuvab teabe punkti kohta.
function markerOnClick(e) {
  console.debug("Klõpsatud markerile: " + this.options.title);
  kpn = this.options.title; // Klõpsatud punkti nimi.
  kp = pMap.get(kpn); // Klõpsatud punkt.
}

