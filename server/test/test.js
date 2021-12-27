const { app } = require("../app");
const assert = require("assert");
const request = require("supertest");
const { deleteAllUsers, createUser, authUser, deleteTokens } = require("./services");
// const axios = require('axios');
// const nock = require('nock');
// var supertest = require('supertest');
// var requestModule = supertest(app) 
describe("User Manager Modüle Tests", () => {
  var user1 = {
    username: "timur",
    user_name: "timur",
    user_surname: "password",
    user_password: "password",
    user_email: "normal45@admin.com",
    user_type: "USER",
  };
  var user2 = {
    username: "timur_admin",
    user_name: "timur_admin",
    user_surname: "password_admin",
    user_password: "password_admin",
    user_email: "normal123@admin.com",
    user_type: "ADMIN",
  };
  before(async () => {
    // await deleteTokens();
    // await deleteAllUsers();
    await createUser(user1);
    await createUser(user2);
  });

  // describe("authUser Tests", () => {
  //   it("test checks status success", function (done) {
  //     requestModule.post('http://localhost:3010?redirectURL=http://localhost:3011')
  //       .set("Content-Type", "application/json")
  //       .send({
  //         "username": "timur_admin",
  //         "user_password": "password_admin"
  //       }).expect(200, done);

  //   });
  // });
  describe("getUserInfo Tests", () => {
    /* beforeEach(() => {
          console.log( "executes before every test" );
        }); */
    var commonHeaders = {
      "Content-Type": "application/json",
      "x-access-token": "92fe339f-5764-4c88-824e-ae28b8230940",
    };
    it("test checks status success", function (done) {
      request(app)
        .get("/user/1?redirectURL=http://localhost:3021")
        .set(commonHeaders)
        .expect(200, done)
        .expect((response) => {
          console.log(response.body);
          assert.ok(response.body.status == "success");
        });
    });
    it("getUserInfo, test checks length of ", function (done) {
      request(app)
        .get("/user/1?redirectURL=http://localhost:3021")
        .set(commonHeaders)
        .expect(200, done)
        .expect((response) => {
          assert.ok(response.body.userInfo.username === "timur");
        });
    });
  });
});



