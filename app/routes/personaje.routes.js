module.exports = app => {
    const personajeDAO = require("../controllers/personajedao.controller.js");
    let router = require("express").Router();
    router.post("/", personajeDAO.create);
    router.get("/", personajeDAO.findAll);
    router.get("/:id", personajeDAO.findOne);
    router.put("/:id", personajeDAO.update);
    router.delete("/:id", personajeDAO.delete);

    app.use('/api/personaje', router);
};