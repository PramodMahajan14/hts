const router = require("express").Router();
const Users = require("./model");
const bcrypt = require("bcryptjs");

router.post("/sign-up", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    console.log(req.body);
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ msg: "Please Fill All fields" });
    }

    if (!validEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }
    const userHave = await Users.findOne({ email: email });
    if (userHave)
      return res.status(400).json({ msg: "This Email has already been taken" });

    if (password.length < 6)
      return res.status(400).json({
        msg: "Password must be at least 6 characters",
      });
    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new Users({
      firstname,
      lastname,
      email,
      password: passwordHash,
    });
    await newUser.save();
    return res.status(201).json({ msg: "Registration Successfully !" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Both field are required " });
    }
    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "This email does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Password is incorrect." });

    return res.status(201).json({ msg: "Login success!", data: user });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.get("*", (req, res) => {
  res.send({ error: "No routes matched" });
  res.end();
});
const validEmail = (email) => {
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return regex.test(email);
};

module.exports = router;
