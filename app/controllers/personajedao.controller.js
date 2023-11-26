const db = require("../models");
const Personaje = db.Personaje;
const Op = db.Sequelize.Op;
const PDFDocument = require('pdfkit'); // para crear el pdf


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

    const { nombre, poder, pelicula } = req.body;

    if (!nombre) {
        res.status(400).send({
            message: "El personaje debe de tener un nombre"
        });
        return;
    }
    // creamos el personaje
    const personaje = {
        nombre, poder, pelicula
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
            const { nombre, poder, pelicula } = req.body;
            // Actualiza los datos del personaje
            personaje.nombre = nombre;
            personaje.poder = poder;
            personaje.pelicula = pelicula;
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

exports.descargar = async (req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    Personaje.findAll().then(personajes => {
        const doc = new PDFDocument();
        doc.pipe(res);
        doc.fontSize(14).text('Informe de Registros', { align: 'center' }).moveDown();
        
        let posY = 100;
        // columnas del reporte
        doc.text('Codigo', 50, posY, { columnGap: 15 });
        doc.text('Nombre', 150, posY);
        doc.text('Poder', 300, posY);
        doc.text('Pelicula', 450, posY);

        const margin = 30;
        personajes.forEach((personaje) => {
            posY += margin;
            doc.text(personaje.id, 50, posY, { columnGap: 15 });
            doc.text(personaje.nombre, 150, posY);
            doc.text(personaje.poder, 300, posY);
            doc.text(personaje.pelicula, 450, posY);
        });
        doc.end();
    }).catch(error => {
        console.error('Error al generar reporte ', error);
        res.status(500).send({
            message: `Error al generar el reporte con los registros`
        });
    });
}