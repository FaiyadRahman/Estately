const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route("/:id").get(userController.getUserInfoById);

module.exports = router;
