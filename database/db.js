var Sequelize = require('sequelize')

var sequelize = new Sequelize('expense_manager','root', '', {
    host : 'localhost',
    dialect: 'mysql',
    logging: false

});

sequelize.authenticate()
    .then(function (){
        console.log('db successfully connected');
    })
    .catch(function(err)
        {
            console.log(err);
        }
    )

module.exports = {
    Sequelize,
    sequelize
}