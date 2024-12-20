const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const {
  user,
  user2,
  user3
} = require("./user-signUp-data");

chai.should();
chai.use(chaiHttp);
describe("Should test all users", async () => {
  describe("/api/users/register should create a user", () => {
    it("it should create a user with complete details successfully", done => {
      chai
        .request(server)
        .post("/api/users/register")
        .set("Accept", "application/json")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.status(201);
          // res.body.should.have.property("message").eql("Account created successfully.");
          done();
        });
    });
    it("it should not create a user with incomplete details", done => {
      chai
        .request(server)
        .post("/users/register")
        .set("Accept", "application/json")
        .send(user2)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("it should not signup a user with an already registered email", done => {
      chai
        .request(server)
        .post("/users/register")
        .set("Accept", "application/json")
        .send(user3)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
  });
});