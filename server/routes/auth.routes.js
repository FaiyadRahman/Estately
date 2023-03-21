const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.route("/").post(authController.login);

router.route("/signup").post(authController.signup);

router.route("/refresh").get(authController.refresh);

router.route("/logout").post(authController.logout);

module.exports = router;
