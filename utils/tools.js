const jwt = require("jsonwebtoken");
const { User } = require("./user");
const { Math } = require("./math");
const { Fancy } = require("./fancy");

const Tools = {
  User,
  Math,
  Fancy,
};

module.exports = { Tools };
