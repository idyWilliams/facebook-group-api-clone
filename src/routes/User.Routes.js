const { Router } = require("express");
const {
  getUser,
  getProfile,
  updateProfile,
} = require("../controllers/User.Controllers");

const router = Router();

router.route("/").get(getUser);
router.route("/profile").get(getProfile).put(updateProfile);

module.exports = router;
