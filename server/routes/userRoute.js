const express = require("express");
const user = require("../controllers/userController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");
const router = express.Router();

// Create a new Tutorial
router.route("/")
  .post(tokenMiddleware, user.createUser)
  .get(tokenMiddleware, user.getListOfUsers);

router.route("/:user_id")
  .get(tokenMiddleware, user.getUserInfo)
  .put(tokenMiddleware, user.updateUser)
  .delete(tokenMiddleware, user.deleteUser);

module.exports = router;
