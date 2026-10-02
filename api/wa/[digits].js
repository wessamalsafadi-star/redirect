// api/wa/[digits].js
const WEBHOOK_URL = 'https://engageteam.app.n8n.cloud/webhook/fff658f2-df95-4970-a32e-775e4895cd4c'; // ← EDIT

module.exports = async function handler(req, res) {
  // lead/ref are tracking params — pulled out so they don't reach wa.me
  const { digits, lead, ref, ...query } = req.query;

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lead: lead || null,        // number of the person who clicked
      ref: ref || null,          // listing reference
      digits,                    // agent WhatsApp line
      query,                     // remaining params (text=...)
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
