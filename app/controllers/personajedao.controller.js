const db = require("../models");
const Personaje = db.Personaje;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    let condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;
    Personaje.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los personajes."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Personaje.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al obtener personaje con id ${id}`
            });
        });
};


exports.create = (req, res) => {
    // Validate request

    const { nombre, poder } = req.body;

    if (!nombre) {
        res.status(400).send({
            message: "El personaje debe de tener un nombre"
        });
        return;
    }
    // creamos el personaje
    const personaje = {
        nombre, poder
    };
    // Guardamos a la base de datos
    Personaje.create(personaje)
        .then(data => {
            res.send({ message: 'Se ha creado correctamente el personaje', value: data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Ha ocurrido un error al crear el personaje.'
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    Personaje.destroy({ where: { id: id } })
        .then(() => {
            res.send({ message: 'Personaje eliminado exitosamente.' });
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al eliminar personaje con id ${id}`
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    Personaje.findByPk(id)
        .then(personaje => {
            if (!personaje) {
                return res.status(404).send({ message: 'No existe el personaje' });
            }
            const { nombre, poder } = req.body;
            // Actualiza los datos del personaje
            personaje.nombre = nombre;
            personaje.poder = poder;
            // guardamos los cambios
            personaje.save()
                .then(data => {
                    res.send({ message: 'Se ha actualizado correctamente', value: data });
                })
                .catch(err => {
                    res.status(500).send({
                        message: `Error al actualizar personaje con id ${id}`
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al obtener personaje con id ${id}`
            });
        });
};

