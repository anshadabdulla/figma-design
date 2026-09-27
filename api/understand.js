/*!
 * Restaurant AI Ordering Agent — message understanding (Vercel serverless function)
 * Built by Ads n' Codes · adsncodes.com · © 2026 Ads n' Codes. All rights reserved.
 *
 * POST /api/understand  { text, stage, cart:[{id,qty}], pending }
 * → { intent, items:[{id,qty|null}], quantity, notes:[{id,note}], address, phone, unavailable, reply }
 *
 * The Gemini key is read from the GEMINI_API_KEY environment variable (set in Vercel →
 * Settings → Environment Variables). It never reaches the browser.
 */

// Keep in sync with MENU / MODS in app.js
const MENU = [
  ['chicken-biryani', 'Chicken Biryani', 16, 'mains', 'Less spicy, Extra raita, Extra spicy'],
  ['mutton-biryani', 'Mutton Biryani', 23, 'mains', 'Less spicy, Extra raita, Extra spicy'],
  ['grilled-chicken', 'Grilled Chicken (Half)', 20, 'mains', 'Less spicy, Extra garlic sauce, No fries'],
  ['charcoal-chicken', 'Charcoal Grilled Chicken (Half)', 23, 'mains', 'Less spicy, Extra garlic sauce, No fries'],
  ['chicken-shawarma', 'Chicken Shawarma', 8, 'mains', 'Extra garlic, No pickles, Not spicy, Extra spicy'],
  ['chicken-burger', 'Chicken Burger', 10, 'mains', 'No cheese, Extra sauce, No onions'],
  ['club-sandwich', 'Club Sandwich', 15, 'mains', 'No mayo, Extra fries, Toasted well'],
  ['naan-butter-chicken', 'Naan & Butter Chicken Combo', 22, 'mains', 'Less spicy, Extra naan, Extra spicy'],
  ['karak-tea', 'Karak Tea', 1, 'tea & coffee', 'Less sugar, No sugar, Extra strong'],
  ['milk-tea', 'Fresh Milk Tea', 2, 'tea & coffee', 'Less sugar, No sugar, Extra strong'],
  ['milk-coffee', 'Fresh Milk Coffee', 3, 'tea & coffee', 'Less sugar, No sugar, Extra strong'],
  ['mango-lassi', 'Mango Lassi', 9, 'cold drinks', 'No ice, Less sugar'],
  ['lime-mint', 'Fresh Lime Mint', 7, 'cold drinks', 'No ice, Less sugar'],
  ['pepsi', 'Pepsi (330ml can)', 3, 'soft drinks', 'Extra chilled'],
  ['coca-cola', 'Coca-Cola (330ml can)', 3, 'soft drinks', 'Extra chilled'],
  ['7up', '7 Up (330ml can)', 3, 'soft drinks', 'Extra chilled'],
  ['apple-juice', 'Apple Juice', 16, 'fresh juices', 'No ice, Less sugar'],
  ['avocado-juice', 'Avocado Juice', 14, 'fresh juices', 'No ice, Less sugar'],
  ['orange-juice', 'Orange Juice', 12, 'fresh juices', 'No ice, Less sugar'],
];
const IDS = new Set(MENU.map(m => m[0]));

const INTENTS = [
  'add_items', 'set_items', 'remove_items', 'quantity', 'customize', 'no_changes',
  'order_this', 'confirm', 'pickup', 'delivery', 'pay_online',
  'show_menu', 'show_full_menu', 'show_drinks', 'show_juices', 'show_cart', 'clear_cart',
  'change_address', 'change_phone', 'greeting', 'thanks', 'not_on_menu', 'question', 'unknown',
];

const SYSTEM = `You are the order-understanding brain of the Grill House restaurant WhatsApp ordering agent (Al Nahda, UAE).
Read ONE customer message and return what it means as JSON. You never talk to the customer yourself except in "reply" for questions.

MENU (id | name | AED price | category | available changes):
${MENU.map(m => `${m[0]} | ${m[1]} | ${m[2]} | ${m[3]} | ${m[4]}`).join('\n')}

Store facts: delivery by default, AED 5 fee, 25–40 minutes; pickup is free and ready in 15–20 minutes; cash on delivery by default, online card payment available; open daily 11am–2am. All meat is halal. Biryanis are medium-spicy (can be made less or extra spicy); grills are mildly spiced with garlic sauce. Every main comes as one portion for one person.

Rules:
- Customers type casually, misspell, use Arabic, Hindi, Malayalam, Urdu, Tagalog or mixed languages ("chiken biriyani", "2 briyani", "shawarama", "coke", "chai", "ek biryani", "واحد شاورما"). Map every dish to the closest menu id.
- "biryani" alone = chicken-biryani; "tea"/"chai" alone = karak-tea; "coffee" = milk-coffee; "coke"/"cola" = coca-cola; "juice" with no fruit = ask by using show_juices.
- Quantities: digits or words in any language ("two", "do", "ethnayn", "a", "an", "couple"=2). Set "qty" ONLY when the customer states how many ("2 biryani", "a coke", "one tea", "do chai"). When they just name a dish ("chicken biryani", "shawarma please") leave "qty" out so we can ask how many.
- add_items: the customer wants dishes added. set_items: they change an existing quantity ("make it 3 biryani", "only 1 tea"). remove_items: they remove dishes.
- quantity: the message is only a number/quantity answering "how many?" (use "quantity").
- customize: they ask for a change to dishes (spice, sugar, ice, sauce, no cheese...). Put each change in notes with the matching cart item id. If a message both adds dishes and asks for changes, use add_items AND fill notes.
- Notes must keep the customer's EXACT meaning. Use a listed change only when it means the same thing: same ingredient AND same direction (no / less / extra). Never swap in a different listed change just because it looks similar: "no spicy" is NOT "no pickles", "no garlic" is NOT "extra garlic", "extra cheese" is NOT "no cheese". If nothing listed means the same, write a short lowercase note in their words ("not spicy", "no garlic", "extra cheese", "well done"). Examples: shawarma "no spicy" → "not spicy"; biryani "no spicy" → "not spicy"; biryani "not too spicy" → "less spicy"; burger "extra cheese" → "extra cheese".
- no_changes: "no", "no changes", "that's all fine" while being asked about customizing.
- order_this: they want to check out / finish ("that's all", "order now", "checkout"). confirm: they confirm the final order ("yes confirm", "place it", "ok go").
- change_address / change_phone: they give a new delivery address or phone number (put it in address / phone).
- not_on_menu: they ask for something we do not sell (pizza, pasta...). Put what they asked for in "unavailable".
- question: a question about the food, prices, timing, spice, halal, delivery, payment. Answer in "reply": one or two short friendly WhatsApp sentences, in the customer's language, using ONLY the facts above. Never invent dishes or prices.
- Only use item ids from the menu. Stage and cart are context: e.g. in stage "customize" a plain "less spicy" is customize; in stage "qty" a plain "3" is quantity.`;

const SCHEMA = {
  type: 'OBJECT',
  properties: {
    intent: { type: 'STRING', enum: INTENTS },
    items: { type: 'ARRAY', items: { type: 'OBJECT', properties: { id: { type: 'STRING', enum: [...IDS] }, qty: { type: 'INTEGER' } }, required: ['id'] } },
    quantity: { type: 'INTEGER' },
    notes: { type: 'ARRAY', items: { type: 'OBJECT', properties: { id: { type: 'STRING', enum: [...IDS] }, note: { type: 'STRING' } }, required: ['id', 'note'] } },
    address: { type: 'STRING' },
    phone: { type: 'STRING' },
    unavailable: { type: 'STRING' },
    reply: { type: 'STRING' },
  },
  required: ['intent'],
};

// Best-effort abuse guard (per warm instance)
const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 60_000, max = 30;
  const arr = (hits.get(ip) || []).filter(t => now - t < win);
  arr.push(now); hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > max;
}

const clean = (s, n) => (typeof s === 'string' ? s.replace(/\s+/g, ' ').trim().slice(0, n) : '');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(503).json({ error: 'not_configured' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'anon';
  if (limited(ip)) return res.status(429).json({ error: 'rate_limited' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};
  const text = clean(body.text, 400);
  if (!text) return res.status(400).json({ error: 'empty' });

  const cart = Array.isArray(body.cart) ? body.cart.filter(l => l && IDS.has(l.id)).slice(0, 30).map(l => ({ id: l.id, qty: Math.max(1, Math.min(50, l.qty | 0)) })) : [];
  const context = {
    stage: clean(body.stage, 20) || 'browsing',
    asking_quantity_for: IDS.has(body.pending) ? body.pending : null,
    cart,
    message: text,
  };

  // Gemini latency occasionally spikes: give the main model 4 s, then retry once on a second model.
  const models = [process.env.GEMINI_MODEL || 'gemini-flash-lite-latest', process.env.GEMINI_FALLBACK_MODEL || 'gemini-3.1-flash-lite'];
  let out = null, lastErr = 'timeout';
  for (const model of models) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        signal: ctrl.signal,
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents: [{ role: 'user', parts: [{ text: JSON.stringify(context) }] }],
          generationConfig: {
            temperature: 0, maxOutputTokens: 1024, responseMimeType: 'application/json', responseSchema: SCHEMA,
            thinkingConfig: { thinkingLevel: 'minimal' },
          },
        }),
      });
      const data = await r.json();
      if (!r.ok) { lastErr = 'upstream_' + r.status; continue; }
      const raw = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';
      try { out = JSON.parse(raw); break; } catch { lastErr = 'bad_json'; }
    } catch (e) {
      lastErr = 'timeout';
    } finally { clearTimeout(timer); }
  }
  if (!out) return res.status(504).json({ error: lastErr });

  {
    // Validate everything before it reaches the page
    const intent = INTENTS.includes(out.intent) ? out.intent : 'unknown';
    const items = (Array.isArray(out.items) ? out.items : []).filter(i => IDS.has(i.id)).map(i => ({ id: i.id, qty: Number.isInteger(i.qty) && i.qty > 0 ? Math.min(50, i.qty) : null }));
    const notes = (Array.isArray(out.notes) ? out.notes : []).filter(n => IDS.has(n.id) && clean(n.note, 60)).map(n => ({ id: n.id, note: clean(n.note, 60).toLowerCase() }));
    return res.status(200).json({
      intent, items, notes,
      quantity: Number.isInteger(out.quantity) ? Math.max(1, Math.min(50, out.quantity)) : null,
      address: clean(out.address, 120), phone: clean(out.phone, 24),
      unavailable: clean(out.unavailable, 40), reply: clean(out.reply, 300),
    });
  }
};
