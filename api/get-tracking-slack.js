const querystring = require('querystring');

module.exports = async (req, res) => {
  let body = '';

  await new Promise((resolve) => {
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', resolve);
  });

  const parsed = querystring.parse(body);
  const order_number = parsed.text;

  res.status(200).send(`✅ Slack command received! You entered: ${order_number}`);
};
