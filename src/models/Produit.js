const { Sequelize, DataTypes } = require("sequelize");

const db = require('./index.js');
const Categorie = require("./Categorie.js");
const sequelize = db.sequelize;

const Produit = sequelize.define('produit',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    prix:{
        type: DataTypes.FLOAT,
        validate:{
            min:0
        }
    },
    marque:{
        type: DataTypes.STRING,
    },
    quantite:{
        type: DataTypes.INTEGER,
        validate:{
            min:0
        }
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    condition:{
        type: DataTypes.ENUM(['Nouveau','Utiliser']),
        allowNull: false,
    },
    categorieId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming a product must have a category
        references: {
            model: Categorie, // This references the 'Categorie' model
            key: 'id'
        }
    }

});

module.exports = Produit;