// Määratle punktid.
var punktid = [
  { "nimi": "Ilmarise terviserada (Olevi tn)", "loc": [59.367122, 24.668011] },
  { "nimi": "Mait Metsanurga tn (Pääsküla raba servas)", "loc": [59.372011, 24.693377] },
  { "nimi": "Võidu puiestik (Kagu tn)", "loc": [59.381626, 24.713004] },
  { "nimi": "Rahumäe surnuaja kõrval (spordiväljakul, Piiri tn)", "loc": [59.390448, 24.7004] },
  { "nimi": "Piiri tn (Nõmme turu taga)", "loc": [59.390503, 24.692816] },
  { "nimi": "Vääna tn (Hiiu-Astangu teeots)", "loc": [59.383089, 24.666614] },
  { "nimi": "Laane + Särje tn", "loc": [59.380031, 24.642596] },
  { "nimi": "Glehni pargis (Hiiu-Astangu kergliiklustee kõrval, Särje tn lõpus)", "loc": [59.38443, 24.643669] },
  { "nimi": "Tähetorni tn (parkla kõrval)", "loc": [59.386509, 24.628704] },
  { "nimi": "Hiiu staadioni kõrval", "loc": [59.384838, 24.658157] },
  { "nimi": "Harku ring 6 km (Tähetorni tn parklast edasi)", "loc": [59.386112, 24.624608] },
  { "nimi": "Harku mets 11 km (Kalda tn sisenev tee)", "loc": [59.375593, 24.615295] },
  { "nimi": "Harku mets 10, 5 km (Pilliroo tn sisenev tee)", "loc": [59.373533, 24.608851] },
  { "nimi": "Jannseni puiestik", "loc": [59.373565, 24.656638] },
  { "nimi": "Vabaduse park (Hiiul)", "loc": [59.376657, 24.678321] },
  { "nimi": "Päikese pst", "loc": [59.373575, 24.631033] },
  { "nimi": "Harku ring 8 km (pika kraavi otsas)", "loc": [59.384176, 24.590776] },
  { "nimi": "Sütiste metsa linnak", "loc": [59.393395, 24.68828] },
  { "nimi": "Mustamäe spordikeskuse linnak", "loc": [59.388614, 24.651503] },
  { "nimi": "Harku ring 7 km (tagumisest Tähetorni parklast sisenev tee)", "loc": [59.385213, 24.612454] },
  { "nimi": "Pääsküla noortekeskus", "loc": [59.369105, 24.642019] }
];

// Koosta punktide mäpp.
var pMap = new Map();
punktid.forEach(
  (p) => {
    pMap.set(p.nimi,
      {
        "nimi": p.nimi,
        "loc": p.loc,
        visible: false,
        opacity: undefined,
        marker: undefined
      }
    );
  }
);
