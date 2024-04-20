const express = require("express");
const router = express.Router();
const catController = require("../controllers/catController");

router.get("/", catController.getCats);
router.post("/", catController.addCat);
router.get("/:id", catController.getCat);
router.delete("/:id", catController.deleteCat);  // Updated to removeCat
router.put("/:id", catController.updateCat);         // Updated to putCat

module.exports = router;
