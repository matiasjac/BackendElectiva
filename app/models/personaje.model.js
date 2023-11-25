module.exports = (sequelize, Sequelize) => {
    const Personaje = sequelize.define("Personaje", {
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
    });
    return Personaje;
};