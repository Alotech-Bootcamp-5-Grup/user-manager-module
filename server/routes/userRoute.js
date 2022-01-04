const express = require("express");
const user = require("../controllers/userController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");
const router = express.Router();

// Gelen istekleri yönetir
// İstek yapan kullanıcının yetkisi olup olmadığını 'tokenMiddleware'
// araclığıyla kontrol eder
// Kullanıcının yetkisi varsa uygun controller'a yönlendirir
router.route("/")
  .post(tokenMiddleware(['ADMIN']), user.createUser)
  .get(tokenMiddleware(['ADMIN']), user.getListOfUsers);

router.route("/:user_id")
  .get(tokenMiddleware(['ADMIN', 'USER']), user.getUserInfo)
  .put(tokenMiddleware(['ADMIN']), user.updateUser)
  .delete(tokenMiddleware(['ADMIN']), user.deleteUser);

module.exports = router;
