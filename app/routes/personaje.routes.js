module.exports = app => {
    const personajes = require("../controllers/personajedao.controller.js");
    let router = require("express").Router();
    router.get("/", personajes.findAll);

    app.use('/api/personaje', router);
};