const { connection } = require("./database/connection.js");
const express = require("express");
const cors = require("cors");
const { setValorDolar} = require("./modelos/ValorDolar.js");
//inicializar app
console.log("App de node arrancada");
setValorDolar();

//conectar a la base de datos
connection();

//crear servidor node
const app = express();
const puerto= 3900;

//configurar el cors

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true,
    
}));

// convertir el body a objeto js

app.use(express.json());// para recibir datos con conten type app/json
app.use(express.urlencoded({extended:true})) //recibir datos que te llegan por form-urlenconde

//crear rutas

const rutas_BLMR = require("./rutas/BLMRcarta.js");
const rutas_Otros =  require("./rutas/Otros.js");
const rutas_Carta =  require("./rutas/Carta.js");
const rutas_User = require("./rutas/User.js");
const rutas_DatosPersonales = require("./rutas/DatosPersonales.js");
const rutas_DatosEnvio = require("./rutas/DatosEnvio.js");
//cargar las rutas
app.use("/BLMR", rutas_BLMR);
app.use("/otros", rutas_Otros);
app.use("/carta", rutas_Carta);
app.use("/user", rutas_User);
app.use("/datos-personales", rutas_DatosPersonales);
app.use("/datos-envio", rutas_DatosEnvio);
//rutas harcoreada pruebas
app.get("/probando" , (req, res) => {

    console.log("se ha ejecutado el endpoint probando cartas");

    return res.status(200).json([{
        curso: "master en react",
        autor: "bryan camilo gutierrez santana",
        url:  "google.cl"
    },
    {
        curso: "master en javascript",
        autor: "bryan camilo gutierrez santana",
        url:  "google.cl"
    }
]);
});

app.get("/" , (req, res) => {

    console.log("se ha ejecutado el endpoint probando");

    return res.status(200).send(
        `<div>
             <h1>Empezando a crear una api rest con nodejs</h1>
        </div>`
    );
});


// crear el servidor y escuchar peticiones http

app.listen(puerto, () =>{
    console.log("servidor corriendo en el puerto: " + puerto);
});

//me actualice