const express = require("express");
const db = require("./app/models");
const Personaje = db.Personaje;
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

var corsOptions = {

    origin: "http://localhost:4200"  // Cambia esto a la dirección correcta de tu aplicación Angular

};

app.use(cors(corsOptions));

// parse requests of content-type - application/json

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

// simple route

app.get("/", (req, res) => {

    res.json({ message: "Bienvenido Node backend 2020" });

});

require("./app/routes/personaje.routes")(app);

// set port, listen for requests

const PORT = process.env.PORT || 9090;

const initServer = async () => {
    await db.sequelize.sync(); // para que cree la base de datos
    app.listen(PORT, () => {
        console.log('Servidor corriendo en puerto 9090.');
    });
}

initServer();