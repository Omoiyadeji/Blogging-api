const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const { user, user2, user3 } = require("./user-signIn-data");

// const { expect } = chai;

chai.should();
chai.use(chaiHttp);
describe("Should test all users", async () => {
  describe("/users/login should sign in a user", () => {
    it("it should sign in a user with complete details successfully", (done) => {
      chai
        .request(server)
        .post("/users/login")
        .set("Accept", "application/json")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
    it("it should not sign in a user with incomplete details", (done) => {
      chai
        .request(server)
        .post("/users/login")
        .set("Accept", "application/json")
        .send(user2)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("it should not sign in a user without a registered email", (done) => {
      chai
        .request(server)
        .post("/users/login")
        .set("Accept", "application/json")
        .send(user3)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});