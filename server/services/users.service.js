const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");

async function login({ username, password },  callback) {
  const user = await User.findOne({ username });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = auth.generateAccessToken(username);

      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({
        message: "Invalid username/password",
      });
    }
  } else {
    return callback({
      message: "Invalid username/password",
    });
  }
}

async function register(params, callback) {
    if(params.username ===undefined) {
        return callback({
            message: "Username required."
        })
    }
  const user = new User(params);
  user.save()
  .then((res) => {
      return callback(null, res)
  })
  .catch((err) => {
    return callback(err)
  });
}

async function getById(id) {
  const user = await User.findById(id);
  return user.toJSON();
}

module.exports = {
  login,
  register,
  getById,
};
