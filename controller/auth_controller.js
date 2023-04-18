const user = require("../model/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(409).json({ message: "please provide full data" });
    }
    {
      auth_user = await user.findOne({ username });
      if (auth_user) {
        const verify = await bcrypt.compare(password, auth_user.password);
        if (verify) {
          tk = jwt.sign({ auth_user }, process.env.SECRET_KEY, {
            expiresIn: "2h",
          });
          return res.status(200).json({ token: tk });
        } else {
          return res
            .status(401)
            .json({ message: "username or password incorrect" });
        }
      } else {
        return res
          .status(401)
          .json({ message: `user with ${username} no found` });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const signup = async (req, res) => {
  const { username, password, email, isAdmin } = req.body;

  try {
    if (!username || !password || !email || !isAdmin) {
      return res.status(403).json({ invalid: "please provide all data" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = await user.create({
        username,
        password: hashedPassword,
        email,
        isAdmin,
      });
      return res.status(200).json(newUser);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
};
