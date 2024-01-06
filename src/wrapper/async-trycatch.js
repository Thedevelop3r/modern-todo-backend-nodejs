// async try catch wrapper

const asyncTryCatchWrapper = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = { asyncTryCatchWrapper };
