const express = require("express");
const user = require("../controllers/userController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");
const router = express.Router();

// Create a new Tutorial
router.route("/")
  .post(tokenMiddleware(['ADMIN']), user.createUser)
  .get(tokenMiddleware(['ADMIN']), user.getListOfUsers);

router.route("/:user_id")
  .get(tokenMiddleware(['ADMIN', 'USER']), user.getUserInfo)
  .put(tokenMiddleware(['ADMIN']), user.updateUser)
  .delete(tokenMiddleware(['ADMIN']), user.deleteUser);

module.exports = router;
