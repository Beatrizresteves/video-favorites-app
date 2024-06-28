import express from 'express';
import fetch from 'node-fetch';

const app = express();
const apiKey = 'YOUR_API_KEY'; // Substitua 'YOUR_API_KEY' pela sua chave de API do YouTube

app.use(express.json());

app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}`);
    const data = await response.json();
    res.json(data);
});

app.post('/api/favorite/:id', (req, res) => {
    res.sendStatus(200);
});

app.get('/api/favorites', (req, res) => {
    res.json({ items: [] });
});

app.listen(3000, () => console.log('BFF running on port 3000'));
