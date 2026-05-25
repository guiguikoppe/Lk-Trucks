// MAPA
const map = L.map('map', {

    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false

}).setView([-15.5, -54], 4);

// MAPAS

const darkMap = L.tileLayer(
'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
);

const lightMap = L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

const satelliteMap = L.tileLayer(
'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
);

// MAPA PADRÃO
darkMap.addTo(map);

// CONTROLE
const baseMaps = {

    "🌑 Escuro": darkMap,
    "🛰️ Satélite": satelliteMap,
    "🛣️ Claro": lightMap

};

L.control.layers(baseMaps).addTo(map);

// ZOOM
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// ÍCONE
// ESTILO DOS PONTOS
function criarPonto(coords, cor) {

    return L.circleMarker(coords, {

radius: window.innerWidth < 768 ? 3 : 5,
        fillColor: cor,

        color: '#fff',

        weight: 1,

        opacity: 1,

        fillOpacity: 0.9

    });

}

// RODOVIAS
const rodovias = [

/* ─────────────────────────────
   BR-116
───────────────────────────── */

{
    nome: "BR-116",
    cor: "#ff7a00",

    cidades: [

        { nome: "Fortaleza", coords: [-3.7319, -38.5267] },

        { nome: "Feira de Santana", coords: [-12.2664, -38.9663] },

        { nome: "Vitória da Conquista", coords: [-14.8619, -40.8448] },

        { nome: "Governador Valadares", coords: [-18.8514, -41.9496] },

        { nome: "Belo Horizonte", coords: [-19.9167, -43.9345] },

        { nome: "São Paulo", coords: [-23.55052, -46.633308] },

        { nome: "Curitiba", coords: [-25.4284, -49.2733] },

        { nome: "Lages", coords: [-27.8156, -50.3259] },

        { nome: "Porto Alegre", coords: [-30.0346, -51.2177] }

    ]
},

/* ─────────────────────────────
   BR-101
───────────────────────────── */

{
    nome: "BR-101",
    cor: "#7c5cff",

    cidades: [

        { nome: "Natal", coords: [-5.7945, -35.211] },

        { nome: "João Pessoa", coords: [-7.1195, -34.845] },

        { nome: "Recife", coords: [-8.0476, -34.877] },

        { nome: "Maceió", coords: [-9.6498, -35.7089] },

        { nome: "Aracaju", coords: [-10.9472, -37.0731] },

        { nome: "Salvador", coords: [-12.9777, -38.5016] },

        { nome: "Campos dos Goytacazes", coords: [-21.7623, -41.3181] },

        { nome: "Rio de Janeiro", coords: [-22.9068, -43.1729] },

        { nome: "Santos", coords: [-23.9608, -46.3336] },

        { nome: "Curitiba", coords: [-25.4284, -49.2733] },

        { nome: "Joinville", coords: [-26.3045, -48.8487] },

        { nome: "Florianópolis", coords: [-27.5949, -48.5482] }

    ]
},

/* ─────────────────────────────
   BR-230
───────────────────────────── */

{
    nome: "BR-230",
    cor: "#00c896",

    cidades: [

        { nome: "João Pessoa", coords: [-7.1195, -34.845] },

        { nome: "Campina Grande", coords: [-7.2307, -35.8811] },

        { nome: "Picos", coords: [-7.0765, -41.466] },

        { nome: "Marabá", coords: [-5.3686, -49.1178] },

        { nome: "Altamira", coords: [-3.2033, -52.2063] },

        { nome: "Humaitá", coords: [-7.5165, -63.0311] }

    ]
},

/* ─────────────────────────────
   BR-163
───────────────────────────── */

{
    nome: "BR-163",
    cor: "#00b4ff",

    cidades: [

        { nome: "Cuiabá", coords: [-15.6014, -56.0979] },

        { nome: "Sinop", coords: [-11.8604, -55.5091] },

        { nome: "Santarém", coords: [-2.4385, -54.6996] }

    ]
},

/* ─────────────────────────────
   BR-364
───────────────────────────── */

{
    nome: "BR-364",
    cor: "#ff3d71",

    cidades: [

        { nome: "Cuiabá", coords: [-15.6014, -56.0979] },

        { nome: "Porto Velho", coords: [-8.7608, -63.8999] },

        { nome: "Rio Branco", coords: [-9.9747, -67.8243] }

    ]
},

/* ─────────────────────────────
   BR-153
───────────────────────────── */

{
    nome: "BR-153",
    cor: "#ffd600",

    cidades: [

        { nome: "Belém", coords: [-1.4558, -48.4902] },

        { nome: "Araguaína", coords: [-7.1911, -48.2072] },

        { nome: "Goiânia", coords: [-16.6869, -49.2648] },

        { nome: "São José do Rio Preto", coords: [-20.8113, -49.3758] }

    ]
},

/* ─────────────────────────────
   BR-040
───────────────────────────── */

{
    nome: "BR-040",
    cor: "#9c27ff",

    cidades: [

        { nome: "Brasília", coords: [-15.7939, -47.8828] },

        { nome: "Belo Horizonte", coords: [-19.9167, -43.9345] },

        { nome: "Juiz de Fora", coords: [-21.7642, -43.3503] },

        { nome: "Rio de Janeiro", coords: [-22.9068, -43.1729] }

    ]
}

];

// CONTAINER DAS ROTAS
const todasRotas = [];

// CRIAR RODOVIAS
rodovias.forEach(rodovia => {

    const coordsLinha = [];

    rodovia.cidades.forEach(cidade => {

        coordsLinha.push(cidade.coords);

        // MARCADOR
     criarPonto(cidade.coords, rodovia.cor)

.addTo(map)

        .addTo(map)

        .bindPopup(`

            <div class="popup-map">

                <h3>${cidade.nome}</h3>

                <p>${rodovia.nome}</p>

            </div>

        `);

    });

    // LINHA
    const linha = L.polyline(coordsLinha, {

        color: rodovia.cor,
        weight: 5,
        opacity: 0.85,
        smoothFactor: 1

    }).addTo(map);

    todasRotas.push(linha);

});

// AJUSTAR VISÃO
const grupo = L.featureGroup(todasRotas);

map.fitBounds(grupo.getBounds(), {

    padding: [60, 60]

});

// ÍNDICE
const legenda = L.control({ position: 'topleft' });
legenda.onAdd = function () {

    const div = L.DomUtil.create('div', 'map-legenda');

   div.innerHTML = `

<h4>Rodovias</h4>

<div><span style="background:#ff7a00"></span> BR-116</div>

<div><span style="background:#7c5cff"></span> BR-101</div>

<div><span style="background:#00c896"></span> BR-230</div>

<div><span style="background:#00b4ff"></span> BR-163</div>

<div><span style="background:#ff3d71"></span> BR-364</div>

<div><span style="background:#ffd600"></span> BR-153</div>

<div><span style="background:#9c27ff"></span> BR-040</div>

`;

    return div;
};

legenda.addTo(map);