var db = require('../database/db')

const Loan = db.sequelize.define('Loan', {

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

        name: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        amount: {
            type: db.Sequelize.INTEGER,
            allowNull: false
        },

        to_pay: {
            type: db.Sequelize.STRING,
            allowNull: false
        }
    },

    {
        // options
        freezeTableName: true,
        tableName: 'loan'
    }
);

Loan.sync({force: false})
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err)
    })


module.exports = {
    Loan
}
