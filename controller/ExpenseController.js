var expenseModel = require('../model/ExpenseModel')

function addExpense(req,res,next) {

    expenseModel.Expense.create({

        item_name: req.body.item_name,
        item_price:req.body.item_price,
        user_id:req.body.user_id,


    })
        .then(function (result) {

            next();
        })
        .catch(function (err) {

            next({"status":500,"message":"DB error"});
        })
}


module.exports = {
    addExpense
}

