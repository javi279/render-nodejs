//const HallClassification = require('./hallclassification.model');

module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING(75),
            allowNull: false,
        },
        apellido: {
            type: Sequelize.STRING(150),
            allowNull: false,
        },
        edad: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 1,
        }
    });
    
    return Cliente;
  };