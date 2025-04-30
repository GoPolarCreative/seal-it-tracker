const querystring = require('querystring');

module.exports = async (req, res) => {
  try {
    let body = '';

    await new Promise((resolve) => {
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', resolve);
    });

    const parsed = querystring.parse(body);
    const order_number = parsed.text || 'N/A';

    // Slack requires a plain 200 OK and string reply
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(`✅ Slack command received! You entered: ${order_number}`);
  } catch (error) {
    console.error('Slack handler error:', error);
    res.status(200).send(`⚠️ Something went wrong.`);
  }
};
