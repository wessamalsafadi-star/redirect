// api/wa/[digits].js
const WEBHOOK_URL = 'https://engageteam.app.n8n.cloud/webhook/fff658f2-df95-4970-a32e-775e4895cd4c';

module.exports = async function handler(req, res) {
  const { digits, ...query } = req.query;

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      digits,
      query,
      full_url: req.url,
      referer: req.headers['referer'] || null,
      user_agent: req.headers['user-agent'],
      ip: req.headers['x-forwarded-for'],
      country: req.headers['x-vercel-ip-country'],
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {});

  const qs = new URLSearchParams(query).toString();
  res.redirect(302, `https://wa.me/${digits}${qs ? '?' + qs : ''}`);
};
