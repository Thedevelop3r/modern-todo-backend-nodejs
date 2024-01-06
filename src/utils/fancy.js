const Fancy = {};

Fancy.Display = function (...args) {
  console.log("\n\n\n\n\n");
  console.log("========================================");
  console.log("\n\n");
  console.log(...args);
  console.log("\n\n");
  console.log("========================================");
  console.log("\n\n\n\n\n");
};

Fancy.DisplayError = function (...args) {
  console.log("\n\n\n\n\n");
  console.log("========================================");
  console.log("\n\n");
  console.error(...args);
  console.log("\n\n");
  console.log("========================================");
  console.log("\n\n\n\n\n");
};

Fancy.DisplayWarning = function (...args) {
  console.log("\n\n\n\n\n");
  console.log("========================================");
  console.log("\n\n");
  console.warn(...args);
  console.log("\n\n");
  console.log("========================================");
  console.log("\n\n\n\n\n");
};

module.exports = { Fancy };