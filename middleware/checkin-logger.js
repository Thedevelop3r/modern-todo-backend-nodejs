async function checkinLogger(req, res, next) {
  // ip
  const ip = req.headers["x-forwarded-for"] || req?.connection?.remoteAddress;
  // method
  const method = req.method;
  // path
  const path = req.path;
  // query
  const query = req.query;
  // body
  const body = req.body || "forbidden";
  // params
  const params = req.params;
  // timestamp -dd/mm/yyyy hh:mm:ss
  const timestamp = new Date().toLocaleString();
  // log
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
