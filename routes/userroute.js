const express = require("express");
const user_route = express();

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

const user_controller = require("../controllers/userController");
const auth = require("../middleware/auth");

user_route.post("/register", user_controller.register_user);

user_route.post("/login", user_controller.login_user);

user_route.get("/test", auth, function (req, res) {
  res.status(200).send({ success: true, msg: "auth successful" });
});

user_route.post("/update-password", auth,user_controller.update_password);

user_route.post("/forget-password", user_controller.forget_password);

module.exports = user_route;
