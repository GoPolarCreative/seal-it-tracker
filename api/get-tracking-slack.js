export default async function handler(req, res) {
  try {
    // Vercel requires reading the body manually for form-encoded data
    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const rawBody = Buffer.concat(chunks).toString();
    const params = new URLSearchParams(rawBody);
    const order_number = params.get("text") || "N/A";

    console.log("✅ Received Slack slash command:", order_number);

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(`✅ Slack command received! You entered: ${order_number}`);
  } catch (err) {
    console.error("❌ Slack handler crashed:", err);
    res.status(200).send("⚠️ Something went wrong.");
  }
}
