const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

chai.should();

chai.use(chaiHttp);

describe("/ Welcome to Bloogin App...", () => {
  it("it should get the welcome page", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
  
module.exports = describe;
