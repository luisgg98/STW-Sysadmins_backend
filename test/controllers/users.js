//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
chai.use(chaiHttp);

let user = {
    "first_name": "string",
    "last_name":"string",
    "email": "user@example.com",
    "password": "string",
    "phone": 123456789};


let user_update=  {
    "first_name": "This is a test",
    "last_name":"This is a test",
    "email": "user@example.com",
    "password": "string",
    "phone": 123456789
};


let wrong_user = {
    "first_name": "string",
    "last_name":"string",
    "email": "userWRONGexample.com",
    "password": "string",
    "phone": 777456789};

const url = '/api/users/'
//Our parent block
describe('Testing User API', () => {

    //router.get("/:phone", ControllerUser.fetchUser)

        /*
      * Test the /GET route
      */

    //router.get("/", ControllerUser.getAllUsers)
    it('it should GET all the users', (done) => {
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
                });
        });

    //router.post("/", ControllerUser.register)
    it('it should create a new user using POST',(done => {
        chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                if(err) throw err;
                res.should.have.status(200);
                done();
            })
    }));


    //router.post("/", ControllerUser.register)
    it('it should not create the same user using POST, SAME USER',(done => {
        chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                if(err) throw err;
                res.should.have.status(409);
                done();
            })
    }));

    //wrong_user

    it('it should not create the same user using POST, WRONG FORMAT',(done => {
        chai.request(server)
            .post(url)
            .send(wrong_user)
            .end((err, res) => {
                if(err) throw err;
                res.should.have.status(405);
                done();
            })
    }));



    //wrong user
    it('It should NOT LOG, wrong user',(done => {
        chai.request(server)
            .post(url + 'login/')
            .send({"email": user.email+"wrong","password": user.password})
            .end((err,res)=>{
                if(err) throw err;
                res.should.have.status(404);
                done();

            })
    }));
    //NO LOGIN
    it('It should NOT LOG, wrong password',(done => {
        chai.request(server)
            .post(url + 'login/')
            .send({"email": user.email,"password": user.password +"WRONG"})
            .end((err,res)=>{
                if(err) throw err;
                res.should.have.status(401);
                done();
            })
    }));


    //router.patch("/:id",jwt_login_strategy.authenticate,ControllerUser.update);
    let token_user='';
    let id_user = '';
    it('It should update a new user using PATCH',(done => {
        chai.request(server)
            .post(url + 'login/')
            .send({"email": user.email,"password": user.password})
            .end((err,res)=>{
                if(err) throw err;
                res.should.have.status(200);
                let bearer = res.body.token;
                token_user= bearer;
                id_user = res.body.user.id;
                chai.request(server)
                    .patch(url + id_user )
                    .send({"last_name": "This is a test"})
                    .set({ "Authorization": `${bearer}` })
                    .end((err,res)=>{
                        if(err) throw err;
                        res.should.have.status(200);
                        done();
                    })
            })
    }));

    //WRONG UPDATE NO CREDENTIALS
    it('It should NOT update a new user using PATCH, NO CREDENTIALS',(done => {
        chai.request(server)
            .patch(url + id_user )
            .send(user_update)
            .end((err,res)=>{
                if(err) throw err;
                res.should.have.status(401);
                done();
            });
    }));

    //router.delete("/:id",jwt_login_strategy.authenticate, ControllerUser.delete)


    it('It should delete a new user using DELETE',(done => {
        chai.request(server)
            .delete(url + id_user)
            .end((err,res)=>{
                if(err) throw err;
                res.should.have.status(401);
                done();
            })

    }))

    //router.get("/:phone", ControllerUser.fetchUser)
    it('Ir should fetch a user by their phone',(done => {
        chai.request(server)
            .get(url + user.phone.toString())
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });

    }));


    it('Ir should fetch a user by their phone',(done => {
        chai.request(server)
            .get(url + "wrong")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });

    }))

    it('It should delete a new user using DELETE',(done => {
                chai.request(server)
                    .delete(url + id_user)
                    .set({ "Authorization": `${token_user}` })
                    .end((err,res)=>{
                        if(err) throw err;
                        res.should.have.status(204);
                        done();
                    })

    }));

});