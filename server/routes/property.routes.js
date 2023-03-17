const express = require("express");
const router = express.Router();
const PropertyController = require("../controllers/property.controller");
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router
    .route("/")
    .get(PropertyController.getAllProperties)
    .post(PropertyController.createProperty);
router
    .route("/:id")
    .get(PropertyController.getPropertyDetail)
    .patch(PropertyController.updateProperty)
    .delete(PropertyController.deleteProperty);

module.exports = router;
