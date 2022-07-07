function checkApiKey(req, res, next) {
  let apiKey = req.header("API-Key");
  if (!apiKey) {
    return res.status(403).json({ message: "Missing API Key" });
  }
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(403).json({ message: "Wrong API Key" });
  }
}

module.exports = {
  checkApiKey,
};
