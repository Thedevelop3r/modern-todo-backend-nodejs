const jwt = require("jsonwebtoken");
const User = {};

User.SetCookie = (res, user) => {
  res.cookie("token", user, {
    expires: new Date(Date.now() + 86400000),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  res.setHeader("Set-Cookie", "token=" + user + "; HttpOnly; Expires=" + new Date(Date.now() + 86400000) + "; SameSite=Lax" + "; Path=/");
};

User.generateToken = (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

module.exports = { User };
