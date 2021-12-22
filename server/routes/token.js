const express = require("express");
const tokens = require("../controllers/token");
const router = express.Router();

router.route("/")
  .get(tokens.getTokenList);

module.exports = router;
