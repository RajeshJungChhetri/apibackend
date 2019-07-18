const express = require('express');

const userController =  require('./controller/UserController')

const loanController =  require('./controller/LoanController')

const loginController =  require('./controller/loginController')

const loanModel = require('./model/loanModel')

const db= require('./database/db')

// const sumModel = require('./model/sumModel')

const estimatedModel = require('./model/EstimatedModel')


const expenseModel = require('./model/ExpenseModel')

const expenseController =  require('./controller/ExpenseController')

const estimatedController =  require('./controller/EstimatedController')

const bodyParser = require('body-parser')



const app = express();

app.use(function (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,authorization');
    next();
})

app.use(bodyParser.json());

app.post('/register',userController.validator,userController.hashGenerator,userController.register,function (req,res,next) {
    res.status(201);
    res.send({"message":"User registered successfully"});
})

app.post('/login',loginController.verify,loginController.check,loginController.jwtTokenGen,loginController.sendUserData,function (req,res,next) {
    res.status(205);
    res.send(
        {
            "message": "Login success !",
            "token": req.genToken,
        }
    );

    console.log(req.genToken)
})

app.post('/addloan',loanController.addLoan,function (req,res,next) {
    res.status(201);
    res.send({"message":"Loan added successfully"});
})


app.get('/getLoan/:user_id',function (req,res) {

    loanModel.Loan.findAll({
        where:{ user_id:req.params.user_id }

    })
        .then(function (result) {
            res.status(201)
            res.json(result)
        })
        .catch(function (err) {
            next({"status":500,"message":"error"})
        })
})


app.get('/geteachloan/:loanid',function (req,res) {

    // console.log(loanid)
    loanModel.Loan.findAll({
        where:{ id:req.params.loanid }

    })
        .then(function (result) {
            res.status(201)
            res.json(result)
        })
        .catch(function (err) {
            next({"status":500,"message":"error"})
        })
})




app.delete('/deleteloan/:loanid',function (req,res) {

    loanModel.Loan.destroy({
        where: { id : req.params.loanid }
    })
        .then(function () {
            res.status(201)
            res.send({"message":"Deleted successfully"})
        })
        .catch(function (err) {
            next({"status":"500","message":"Error in deleting Loan"})
        })
})




app.put('/updateloan/:loanid', function(req, res) {

// console.log('kjkhvb')
    loanModel.Loan.update({
        name: req.body.name,
        amount: req.body.amount,
        to_pay: req.body.to_pay,
    }, {
        where: {
            id: req.params.loanid
        }
    })
        .then(function(result) {
            res.status(201);
            res.send({
                "message": "Loan Edited successfully"
            })

        })
        .catch(function(err) {
            console.log(err)
        })
})



app.post('/addestimate',estimatedController.addEstimate,function (req,res,next) {
    res.status(201);
    res.send({"message":"Estimated added successfully"});
})

app.get('/getestimated/:user_id',function (req,res) {

    // console.log(loanid)
    estimatedModel.Estimated.findAll({
        where:{ user_id:req.params.user_id }

    })
        .then(function (result) {
            res.status(201)
            res.json(result)
        })
        .catch(function (err) {
            next({"status":500,"message":"error"})
        })
})

app.get('/getexpense/:user_id',function (req,res) {


    expenseModel.Expense.findAll({
        where:{ user_id:req.params.user_id }

    })
        .then(function (result) {
            res.status(201)
            res.json(result)
        })
        .catch(function (err) {
            next({"status":500,"message":"error"})
        })
})


app.get('/getex/:user_id',function (req,res) {


    db.sequelize.query
    ("SELECT SUM(item_price) as total " +
        "FROM expenses " +
        "WHERE " +
        "user_id=2",
        { type: db.sequelize.QueryTypes.SELECT})
        .then(function (result) {

           res.json(result)
        })
        .catch(function (err) {
            next({"status":500,"message":"error"})
        })
})




app.post('/addexpense',expenseController.addExpense,function (req,res,next) {
    res.status(201);
    res.send({"message":"Expense added successfully"});
})


app.delete('/deleteexpense/:expenseid',function (req,res) {

    expenseModel.Expense.destroy({
        where: { id : req.params.expenseid }
    })
        .then(function () {
            res.status(201)
            res.send({"message":"Deleted successfully"})
        })
        .catch(function (err) {
            next({"status":"500","message":"Error in deleting Expense"})
        })
})

app.get('/geteachexpense/:expenseid',function (req,res) {

    expenseModel.Expense.findAll({
        where:{ id:req.params.expenseid }

    })
        .then(function (result) {
            res.status(201)
           res.json(result)
        })
        .catch(function (err) {
            next({"status":500,"message":"error"})
        })
})


var userModel = require('./model/userModel')
app.get('/viewusers/:user_id',function (req,res) {

    // console.log(loanid)
    userModel.User.findAll({
        where:{ id:req.params.user_id }

    })
        .then(function (result) {
            res.status(201)
            res.json(result)
        })
        .catch(function (err) {
            next({"status":500,"message":"error"})
        })
})

app.put('/updateuser/:user_id', function(req, res) {


    userModel.User.update({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
    }, {
        where: {
            id: req.params.user_id
        }
    })
        .then(function(result) {
            res.status(201);
            res.send({
                "message": "Profile updated successfully"
            })

        })
        .catch(function(err) {
            console.log(err)
        })
})



app.put('/updateexp', function(req, res) {


    expenseModel.Expense.update({
        item_name: req.body.item_name,
        item_price: req.body.item_price,

    }, {
        where: {
            id: req.body.itemid
        }
    })
        .then(function(result) {
            res.status(201);
            res.send({
                "message": "Expenses updated successfully"
            })

        })
        .catch(function(err) {
            console.log(err)
        })
})


app.use(function (err,req,res,next) {
    res.status(err.status);
    res.send({"message":err.message});
})
app.listen(8080);


module.exports = app;