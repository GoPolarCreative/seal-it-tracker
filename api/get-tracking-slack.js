import querystring from 'querystring';

export default async function handler(req, res) {
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

    console.log(`✅ Received order: ${order_number}`);

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(`✅ Slack command received! You entered: ${order_number}`);
  } catch (err) {
    console.error('❌ Error handling Slack command:', err);
    res.status(200).send('⚠️ Error handling Slack command.');
  }
}
