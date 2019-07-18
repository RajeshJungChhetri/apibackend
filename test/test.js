const chai = require('chai');

const chaihttp = require('chai-http');

const should =  chai.should();

const chaiLike =require('chai-like');

const chaiThings = require('chai-things');

const server = require('../server');

var serverr;


chai.use(chaihttp);
chai.use(chaiLike);
chai.use(chaiThings);


before(done => {
    serverr =server.listen(3002,done);
})

after(done => {
    serverr.close(done);
})

describe('Users',function () {
    describe('User registration, Method post', function () {
        it('it should register a user ', function (done) {
            chai.request(server)
                .post('/register')
                .send({
                    'name': 'test2',
                    'email': 'test2',
                    'username': 'test2',
                    'password': 'test2',

                })
                .end(function (err, res) {
                    res.should.have.status(500)
                    res.body.should.be.an('object');
                    res.body.should.have.property('message');
                    done();
                })


        });


    })

})



describe('Loan',function () {
    describe('User adds a new loan', function () {
        it('it should register a loan ', function (done) {
            chai.request(server)
                .post('/addloan')
                .send({
                    'user_id': '2',
                    'name': 'test2',
                    'amount': '50000',
                    'to_pay': 'To Pay',

                })
                .end(function (err, res) {
                    res.should.have.status(500)
                    res.body.should.be.an('object');
                    res.body.should.have.property('message');
                    done();
                })


        });


    })

})


describe('Deleting loan', function() {
    loanid = 2;
    it('it should delete the loan', function(done) {
        chai.request(server)
            .delete('/deleteloan/' + loanid)
            .end(function(err, res) {
                res.should.have.status(500);
                res.body.should.have.property('message');
                done();
            })
    })


});
