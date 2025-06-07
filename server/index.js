
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/nlp', (req, res) => {
  const { text } = req.body;
  let handle = 'ss-ton-gladiator-english-willow-bat';
  if (text.toLowerCase().includes('klr')) handle = 'sg-klr-xtreme-english-willow-cricket-bat';
  res.json({ handle });
});

app.post('/api/vision', (req, res) => {
  res.json({ handle: 'ss-ton-gladiator-english-willow-bat' });
});

const fetch = require('node-fetch');

app.get('/api/product/:handle', async (req, res) => {
  const { handle } = req.params;
  const url = `https://cricketershop.com/products/${handle}.json`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    const product = json.product;
    const variant = product.variants.find(v => v.available);
    res.json({
      title: product.title,
      price: variant.price,
      image: product.images[0],
      available: true
    });
  } catch (err) {
    res.status(500).json({ error: 'Product fetch failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
