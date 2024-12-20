const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const { post, post2 } = require("./posts-data");
const { user } = require("./user-signIn-data");


chai.should();
chai.use(chaiHttp);

describe("Add a post", () => {
  let userToken;
  before((done) => {
    chai
      .request(server)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(user)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow user with token create a post", (done) => {
    chai
      .request(server)
      .post("/posts/create")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(post)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("should not allow user without token create a post", (done) => {
    chai
      .request(server)
      .post("/posts/reviews")
      .send(post2)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
  
describe("Update post", () => {
  let userToken;
  before((done) => {
    chai
      .request(server)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(user)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow User update/edit a post", (done) => {
    chai
      .request(server)
      .patch("/posts/63646719a67fb9bc6d318361")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send({ post: "Nice new post" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  
  //   describe("GET post api route", () => {
  //     beforeEach(async () => {
  //       await db.Review.create(review4);
  //       await db.Review.create(review5);
  //     });
  //     let userToken;
  //     before((done) => {
  //       chai
  //         .request(server)
  //         .post("/api/v1/users/signin")
  //         .set("Accept", "application/json")
  //         .send(user)
  //         .end((err, res) => {
  //           if (err) throw err;
  //           userToken = res.body.data;
  //           done();
  //         });
  //     });
  //     it("returns all reviews", (done) => {
  //       chai
  //         .request(server)
  //         .get("/api/v1/reviews")
  //         .set("Authorization", `Bearer ${userToken}`)
  //         .end((err, res) => {
  //           const { status, body } = res;
  //           const { data } = body;
  //           expect(status).to.equal(200);
  //           expect(body.status).to.equal(200);
  //           expect(body.message).to.equal("Successfully retrived all Reviews.");
  
  //           data.forEach((reviews) => {
  //             expect(reviews).to.have.property("_id");
  //             expect(reviews).to.have.property("name");
  //             expect(reviews).to.have.property("lanlordReview");
  //             expect(reviews).to.have.property("enviromentReview");
  //             expect(reviews).to.have.property("apartmentLocation");
  //             expect(reviews).to.have.property("amenitiesQuality");
  //             expect(reviews).to.have.property("isHelpful");
  //           });
  
  //           expect(data).to.be.an("array");
  //           done();
  //         });
  //     });
  
  //     it("returns review with specific id", (done) => {
  //       chai
  //         .request(server)
  //         .get("/api/v1/reviews/62823d2735be3a9454def9a3")
  //         .set("Authorization", `Bearer ${userToken}`)
  //         .end((err, res) => {
  //           const { status, body } = res;
  //           const { data } = body;
  //           expect(status).to.equal(200);
  //           expect(body.status).to.equal(200);
  //           expect(body.message).to.equal("Successfully retrived Review.");
  //           expect(data).to.have.property("_id");
  //           expect(data).to.have.property("name");
  //           expect(data).to.have.property("lanlordReview");
  //           expect(data).to.have.property("enviromentReview");
  //           expect(data).to.have.property("apartmentLocation");
  //           expect(data).to.have.property("amenitiesQuality");
  //           expect(data).to.have.property("isHelpful");
  
  //           expect(data).to.be.an("object");
  //           done();
  //         });
  //     });
  //   });
  
//   describe("Delete review", () => {
//     beforeEach(async () => {
//       await db.Review.create(review4);
//     });
//     let userToken;
//     before((done) => {
//       chai
//         .request(server)
//         .post("/api/v1/users/signin")
//         .set("Accept", "application/json")
//         .send(user)
//         .end((err, res) => {
//           if (err) throw err;
//           userToken = res.body.data;
//           done();
//         });
//     });
//     it("should allow User Delete a review", (done) => {
//       chai
//         .request(server)
//         .delete("/api/v1/reviews/62823d2735be3a9454def9a3")
//         .set("Authorization", `Bearer ${userToken}`)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body.message).to.equal("Successfully Deleted Review.");
//           done();
//         });
//     });
//     it("should not allow user delete a review with invalid ID data type", (done) => {
//       chai
//         .request(server)
//         .delete("/api/v1/reviews/8d58")
//         .set("Authorization", `Bearer ${userToken}`)
//         .end((err, res) => {
//           expect(res).to.have.status(422);
//           done();
//         });
//     });
//     it("returns 404 when deleting review which is not in db", (done) => {
//       chai
//         .request(server)
//         .delete("/api/v1/reviews/6186e80aa8a6d3abae02d434")
//         .set("Authorization", `Bearer ${userToken}`)
//         .end((err, res) => {
//           expect(res).to.have.status(404);
//           expect(res.body.error).to.equal("Review not found.");
//           done();
//         });
//     });
});