var loanModel = require('../model/loanModel')


function addLoan(req,res,next) {

    loanModel.Loan.create({
        user_id:req.body.user_id,
        name: req.body.name,
        amount:req.body.amount,
        to_pay:req.body.to_pay


    })
        .then(function (result) {

            next();
        })
        .catch(function (err) {

            next({"status":500,"message":"DB error"});
        })
}


module.exports = {
    addLoan
}