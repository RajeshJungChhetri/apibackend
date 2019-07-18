var db = require('../database/db')

const Estimated = db.sequelize.define('Estimated', {

        id: {
            type: db.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        user_id: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        amount: {
            type: db.Sequelize.STRING,
            allowNull: false
        },


    },

    {
        // options
        freezeTableName: true,
        tableName: 'estimated'
    }
);

Estimated.sync({force: false})
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err)
    })


module.exports = {
    Estimated
}
