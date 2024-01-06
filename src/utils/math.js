const Math = {};

Math.add = (a, b) => a + b;

Math.random = (from = 1, to = 100) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

module.exports = { Math };
