//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
const Opinion = require('../../models/opinions')
chai.use(chaiHttp);

const company = {  "nif": "B12345678",
    "name": "Cafetería Lamarula",
    "email": "user@example.com",
    "password": "string",
    "street":"Calle Francisco de Vitoria",
    "streetnumber":30,
    "zipcode":50008,
    "category": "Ocio",
};

const user = {
        "first_name": "string",
        "last_name":"string",
        "email": "user@example.com",
        "password": "string",
        "phone": 123456789
}

let opinion = {
    comment: 'I think that your opinion is wrong as always.',
    user_id: '',
    stars: 1,
}

const url_company = '/api/companies/';
const url_user = '/api/users/';
let token_user ='';

describe('Testing Opinion API', () => {

    before(function(done) {
        // runs before all tests in this file regardless where this line is defined.
        chai.request(server)
            .post(url_company)
            .send(company)
            .end((err, res) => {
                if(err) throw err;
                chai.request(server)
                    .post(url_user)
                    .send(user)
                    .end((err,res) => {
                        if(err) throw err;
                        opinion.user_id = res.body._id;
                        done();
                    })
            })
    });

    after(function (done) {
        chai.request(server)
            .post(url_company + 'login/')
            .send({"email": company.email,"password": company.password})
            .end((err,res)=>{
                if(err) throw err;
                let bearer = res.body.token;
                let id = res.body.company._id;
                chai.request(server)
                    .delete(url_company + id )
                    .set({ "Authorization": `${bearer}` })
                    .end((err,res)=>{
                        if(err) throw err;
                        //Deleting user
                        chai.request(server)
                            .post(url_user + 'login/')
                            .send({"email": user.email,"password": user.password})
                            .end((err,res)=>{
                                if(err) throw err;
                                let bearer = res.body.token;
                                let id = res.body.user.id;
                                chai.request(server)
                                    .delete(url_user + id )
                                    .set({ "Authorization": `${bearer}` })
                                    .end((err,res)=>{
                                        done();
                                    })
                            })

                    })
            })


    });



    const url = ('/api/companies/' + company.nif+'/opinions');
    let opinion_id = '';
    /**
     *
     */
    it('It should create an opinion for a Company',(done => {
        chai.request(server)
            .post(url_user + 'login/')
            .send({"email": user.email,"password": user.password})
            .end((err,res)=>{
                if(err) throw err;
                res.should.have.status(200);
                let bearer = res.body.token;
                token_user = bearer;
                chai.request(server)
                    .post(url)
                    .send(opinion)
                    .set({ "Authorization": `${bearer}` })
                    .timeout(5000)
                    .end((err,res)=>{
                        if(err) {
                            console.log(err);
                            throw err;}

                        else{
                            res.should.have.status(200);
                            opinion_id = res.body._id;
                            done();
                        }});
            });
    }));

    /**
     *        opinion_id: {type: String, required: true},
     user_id: {type: String, required: true}
     */
    it('It should vote an opinion',(done => {

        chai.request(server)
            .patch(url + '/' + opinion_id)
            .send(opinion)
            .set({ "Authorization": `${token_user}` })
            .timeout(5000)
            .end((err,res)=>{
                if(err) {
                    throw err;}

                else{
                    res.should.have.status(200);
                    done();
                }});

    }));


    it('It should not vote an opinion',(done => {
        chai.request(server)
            .patch(url + '/' + opinion_id)
            .send(opinion)
            .set({ "Authorization": `${token_user}` })
            .timeout(5000)
            .end((err,res)=>{
                if(err) {
                    throw err;}

                else{
                    res.should.have.status(401);
                    done();
                }});

    }));

    /**
     *
     */
    //router.get("/:nif/opinions",ControllerOpinion.get_opinion);
    it('It should get opinions of a company',(done => {
        chai.request(server)
            .get(url )
            .end((err,res)=>{
                if(err) {
                    throw err;}
                else{
                    console.log(res.body)
                    res.should.have.status(200);
                    done();
                }});

    }));

    /**
     *
     */
    it('It should delete opinions',(done => {
        console.log(opinion_id)
        chai.request(server)
            .delete(url + '/' + opinion_id)
            .send(opinion)
            .set({ "Authorization": `${token_user}` })
            .timeout(5000)
            .end((err,res)=>{
                if(err) {
                    throw err;}

                else{
                    console.log(res.body);
                    res.should.have.status(204);
                    done();
                }});

    }));
});