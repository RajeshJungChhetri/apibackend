var db = require('../database/db')

const query = db.sequelize.query
("SELECT SUM(item_price) as total FROM expenses WHERE user_id = '2'",
    { type: db.sequelize.QueryTypes.SELECT})
    .then(function (result) {
        console.log(result)
    })

module.exports={
    query
}