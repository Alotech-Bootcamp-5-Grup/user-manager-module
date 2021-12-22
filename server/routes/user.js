const express = require("express");
const users = require("../controllers/user");
const router = express.Router();

// Create a new Tutorial
router.route("/")
  .post(users.createUser)
  .get(users.getListOfUsers);

router.route("/:user_id")
  .get(users.getUserInfo)
  .put(users.updateUser)
  .delete(users.deleteUser);

module.exports = router;
