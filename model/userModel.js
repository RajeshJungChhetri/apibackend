var db = require('../database/db')

const User = db.sequelize.define('User', {

        //attributes
        id: {
            type: db.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        email: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        username: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        password: {
            type: db.Sequelize.STRING,
            allowNull: false
        }
    },

    {
        // options
        freezeTableName: true,
        tableName: 'users'
    }
);

User.sync({force: false})
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err)
    })


module.exports = {
    User
}
