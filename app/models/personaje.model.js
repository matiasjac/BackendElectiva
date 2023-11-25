module.exports = (sequelize, Sequelize) => {
    const Personaje = sequelize.define("personajes", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING
        },
        poder: {
            type: Sequelize.STRING
        },
    },{
        timestamps : false
    });
    return Personaje;
};