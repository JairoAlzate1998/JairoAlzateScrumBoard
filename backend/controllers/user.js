const User = require("../models/user");
const Role = require("../models/role");
const bcryt = require("bcrypt");

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data, Transaction declined");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).send("User already exist, Transaction declined");

  let hash = await bcryt.hash(req.body.password, 10);

  let role = await Role.findOne({ name: "user" });
  if (!role) return res.status(400).send("No role");

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role._id,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result) res.status(400).send("Failed to register user");
  try {
    let jwt = user.generateJWT();
    return res.status(200).send({ jwt });
  } catch (e) {
    return res.status(400).send("Failed to registred user");
  }
};

const listUser = async (req, res) => {
  let user = await User.find({ name: new RegExp(req.params["name"], "i") })
    .populate("roleId")
    .exec();
  if(!user || user.length === 0) return res.status(400).send("No users");
  return res.status(200).send({ user });
};

module.exports = { registerUser, listUser };
