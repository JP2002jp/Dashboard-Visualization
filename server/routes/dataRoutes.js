const express = require("express");
const router = express.Router();
const {
  getData,
  getDistinct,
  getFData,
} = require("../controllers/dataControllers");
router.route("/").get(getData);
router.route("/filter").get(getDistinct).post(getFData);
module.exports = router;
