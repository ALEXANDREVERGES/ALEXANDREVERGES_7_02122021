const Sequelize = require('sequelize');

module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('user', {
        
        prenom: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: "email"
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
      
        
    }, {
        Sequelize,
        tableName: 'user',
        timestamps: false,
        createdAt: 'created',
        updatedAt: false,
        indexes: [
             {
                name: "email",
                unique: true,
                using: "BTREE",
                fields: [
                  { name: "email" },
                ]
            },
        ]
    });
};