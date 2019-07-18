var estimateModel = require('../model/EstimatedModel')

function addEstimate(req,res,next) {

    estimateModel.Estimated.create({
        user_id:req.body.user_id,
        amount:req.body.amount


    })
        .then(function (result) {

            next();
        })
        .catch(function (err) {

            next({"status":500,"message":"DB error"});
        })
}


module.exports = {
    addEstimate
}