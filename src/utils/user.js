const jwt = require("jsonwebtoken");
const User = {};

User.setCookie = (res, token) => {
  res.cookie("token", token, {
    expires: new Date(Date.now() + 86400000),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  res.setHeader("Set-Cookie", "token=" + token + "; HttpOnly; Expires=" + new Date(Date.now() + 86400000) + "; SameSite=Lax" + "; Path=/");
};

User.RemoveCookie = (res) => {
  res.setHeader("Set-Cookie", "token=; HttpOnly; Expires=" + new Date(Date.now()) + "; SameSite=Lax" + "; Path=/");
};

User.generateToken = (user) => {
  console.log("user generete token ", user);
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

module.exports = { User };
