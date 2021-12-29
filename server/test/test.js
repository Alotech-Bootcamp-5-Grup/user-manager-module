const { app } = require("../app");
const assert = require("assert");
var chai = require('chai');
var chaiHttp = require('chai-http');
const request = require("supertest");
const { deleteAllUsers, createUser, authUser, deleteTokens } = require("./services.js");
chai.use(chaiHttp);

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
  var user3 = {
    username: "example",
    user_name: "example",
    user_surname: "example",
    user_password: "example123123",
    user_email: "example@admin.com",
    user_type: "ADMIN",
  }
  var user4 = {
    username: "example1",
    user_name: "example",
    user_surname: "example",
    user_password: "example123123",
    user_email: "example1@admin.com",
    user_type: "ADMIN",
  }

  var updatedUser = {
    user_id: 1,
    username: "timur1",
    user_name: "timur",
    user_surname: "password",
    user_password: "password1",
    user_email: "normal451@admin.com",
    user_type: "USER",
  }
  before(async () => {
    await deleteAllUsers();
    await createUser(user1);
    await createUser(user2);
  });
  var commonHeaders = {
    "Content-Type": "application/json",
    "x-access-token": "",
  };
  describe("authUser Tests", () => {
    var host = "http://localhost:3010/";
    var path = "?redirectURL=http://localhost:3011";
    it("get AccessToken", function (done) {
      chai
        .request(host)
        .post(path)
        // .field('myparam' , 'test')
        .set('content-type', 'application/json')
        .send({
          username: "timur_admin",
          user_password: "password_admin"
        })
        .end(function (error, response, body) {
          commonHeaders['x-access-token'] = response.body.Access_Token;
          if (error) {
            done(error);
          } else {
            done();
          }
        });
    });
  });
  describe("getUserInfo Tests", () => {
    it("test checks status success", function (done) {
      request(app)
        .get("/user/2?redirectURL=http://localhost:3021")
        .set(commonHeaders)
        .expect(200, done)
        .expect((response) => {
          assert.ok(response.body.status == "success");
        });
    });
    it("getUserInfo, test checks length of ", function (done) {
      request(app)
        .get("/user/2?redirectURL=http://localhost:3021")
        .set(commonHeaders)
        .expect(200, done)
        .expect((response) => {
          assert.ok(response.body.user.username === "timur_admin");
        });
    });
  });
  describe("createUser Tests", () => {
    it("test checks status success", function (done) {
      request(app)
        .post("/user/?redirectURL=http://localhost:3021")
        .set(commonHeaders)
        .send(user3)
        .expect(200, done)
        .expect((response) => {
          assert.ok(response.body.status == "success");
        });
    });
    it("createUser, test checks if user created or not ", function (done) {
      request(app)
        .post("/user/?redirectURL=http://localhost:3021")
        .set(commonHeaders)
        .send(user4)
        .expect(200, done)
        .expect((response) => {
          assert.ok(response.body.message === "user created");
        });
    });
  });
  describe("updateUser Tests", () => {
    it("updateUser, test checks if user updated or not", function (done) {
      request(app)
        .put("/user/1?redirectURL=http://localhost:3021")
        .set(commonHeaders)
        .send(updatedUser)
        .expect(201, done)
        .expect((response) => {
          assert.ok(response.body.message === "user updated");
        });
    });
  });
  describe("deleteUser Tests", () => {
    it("deleteUser, test checks if user deleted or not", function (done) {
      request(app)
        .delete("/user/1?redirectURL=http://localhost:3021")
        .set(commonHeaders)
        .expect(200, done)
        .expect((response) => {
          console.log(response.body);
          assert.ok(response.body.message === "user deleted");
        });
    });
  });
  describe("getListOfUsers Tests", () => {
    it("getListOfUsers, test checks if function return number of list of users", function (done) {
      request(app)
        .get("/user/?redirectURL=http://localhost:3021")
        .set(commonHeaders)
        .expect(200, done)
        .expect((response) => {
          assert.ok(response.body.userList.length === 3);
        });
    });
  });
  
});
