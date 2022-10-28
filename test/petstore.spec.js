const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should()
chai.use(chaiHttp)
const baseUrl = "https://petstore.swagger.io/v2"

describe('Petstore API', () => {

    describe('GET /pet/{petId}', () => {
        it('It should GET a pet by ID', (done) => {
            const petId = 6;
            chai.request(baseUrl)
                .get("/pet/" + petId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('name');
                    response.body.should.have.property('status');
                    response.body.should.have.property('id').eq(petId);
                    done();

                })
        })
    })
    it('It should NOT GET a pet by ID - Wrong Endpoint', (done) => {
        const petId = 6;
        chai.request(baseUrl)
            .get("/pett/" + petId)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
    })

    it('It should NOT GET a pet by ID - ', (done) => {
        const petId = 123123;
        chai.request(baseUrl)
            .get("/pet/" + petId)
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.have.property('message').eq("Pet not found")
                response.body.should.have.property('type').eq("error")
                response.body.should.have.property('code').eq(1)
                done();
            })
    })

    describe('POST /pet/{petId}', () => {
        it('It should POST a new pet', (done) => {
            const pet = {
                id: 3,
                name: "cat",
                status: "available"
            }
            chai.request(baseUrl)
                .post("/pet/")
                .send(pet)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name').eq("cat");
                    response.body.should.have.property('status').eq("available");
                    response.body.should.have.property('id').eq(3);
                    done();

                })
        })
    })

    describe('PUT /pet', () => {
        it('It should PUT a new pet', (done) => {
            const pet = {
                "id": 0,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": "doggie",
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": "available"
            }
            chai.request(baseUrl)
                .put("/pet/")
                .send(pet)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name').eq("doggie");
                    response.body.should.have.property('status').eq("available");
                    response.body.should.have.property('id').eq(9223372036854292000);
                    done();

                })
        })

    })
})













