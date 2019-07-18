var db = require('../database/db')

const ExpenseModel = db.sequelize.define('Expense', {

        id: {
            type: db.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        item_name: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        item_price: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        user_id: {
            type: db.Sequelize.INTEGER,
            allowNull: false
        }
    },

    {
        // options
        freezeTableName: true,
        tableName: 'expenses'
    }
);

ExpenseModel.sync({force: false})
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err)
    })


module.exports = {
    Expense: ExpenseModel
}
