async function checkinLogger(req, res, next) {
  const ip = req.headers["x-forwarded-for"] || req?.connection?.remoteAddress;
  const method = req.method;
  const path = req.path;
  const query = { ...req?.query };
  const body = { ...req?.body } || "forbidden";
  if (body && body.password) delete body.password;
  const params = { ...req?.params };
  const timestamp = new Date().toLocaleString();
  console.log(
    `[${timestamp}] ${ip} ${method} ${path} ${JSON.stringify({
      query,
      body,
      params,
    })}`
  );
  next();
}

module.exports = { checkinLogger };
