const { Router } = require("express");
const UserRoute = require("./User.Routes");
const GroupRoutes = require("./Group.Routes");
const PostRoutes = require("./Post.Routes");
const { NOT_FOUND, OK } = require("http-status-codes");
const { prepareError } = require("../utils/functions");
const { TokenModel } = require("../models/Token.Models");

const router = Router();

router.use("/user", UserRoute);
router.use("/group", GroupRoutes);
router.use("/post", PostRoutes);
router.route("/logout").post(async (req, res) => {
  const user = req?.user;
  if (!user) {
    res
      .status(NOT_FOUND)
      .send(prepareError("User not found", "Not Found", "user"));
  }
  const logout = await TokenModel.findOneAndUpdate(
    { user: user.id },
    { token: "" }
  );
  if (logout) {
    res.status(OK).send({ data: "Success" });
  }
});

module.exports = router;
