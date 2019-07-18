var userModel = require('../model/userModel')


var bcrypt = require('bcrypt');
var saltRounds = 10;

function hashGenerator(req,res,next) {

    bcrypt.hash(req.body.password,saltRounds)
        .then(function (hash) {
            // console.log(hash);
            req.hashvalue = hash;
            next();

        })
        .catch(function (err) {

        })
}


function register(req,res,next) {

    userModel.User.create({


        name: req.body.name,
        email:req.body.email,
        username: req.body.username,
        password: req.hashvalue


    })
        .then(function (result) {

            next();
        })
        .catch(function (err) {

            next({"status":500,"message":"DB error"});
        })
}

function validator(req,res,next){
    userModel.User.findOne({
        where:{username:req.body.username}
    })
        .then(function (result) {

            if (result.dataValues != ''){
                next({"status":400,"message":"user already exists"})
            }
        })
        .catch(function (err) {
            next();

        })
}
module.exports = {
    register,
    hashGenerator,
    validator
}