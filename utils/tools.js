const Tools = {};
module.exports = { Tools };

Tools.add = (a, b) => a + b;
Tools.random = (from = 1, to = 100) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};
