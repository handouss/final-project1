const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.send("hello user");
});

router.post("/signup", async (req, res) => {
  if (req.body.password) {
    let encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      password: encryptedPassword,
      email: req.body.email,
    });
    try {
      const userCreated = await user.save();
      res.send(userCreated);
    } catch (error) {
      res.status(500).send({ error: "error creation" });
    }
  } else {
    res.status(500).send({ error: "error creation" });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  try {
    console.log(req.body);
    console.log(user);
    console.log(await bcrypt.compare(req.body.password, user.password));
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.send({ success: false, message: "password incorrect" });
    } else {
      user.token = jwt.sign(
        { user_id: user._id, name: user.name },
        "?|Ih**>?&l!>=R}xMi'aJjaC{TF+1!cD?V2Y%1~$ktLF)QX4_EYXtQp4HQaz8IW",
        {
          expiresIn: "2h",
        }
      );
      res.send({ success: true, data: user });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({ error: "check your name & password" });
  }
});

router.patch("/", async (req, res) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
      password: req.body.password,
      img: req.body.img,
    });
  } catch (error) {
    res.status(500).send({ error: "fail update" });
  }
});

router.delete("/:userId", auth, async (req, res) => {
  try {
    const userRemoved = await User.A.findByIdAndRemove(req.params.userId);
    res.status(200).send("user deleted");
  } catch (error) {
    res.status(500).send({ error: "fail delete" });
  }
});

module.exports = router;
