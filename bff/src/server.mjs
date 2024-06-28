import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const apiKey = 'AIzaSyDoI0OjREKgXYach9sdQU6BtzjV8lWeE9o'; 

app.use(cors());
app.use(express.json());

// Obter o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const favoritesFilePath = path.resolve(__dirname, 'favorites.json');

// Função para inicializar o arquivo favorites.json se ele não existir ou estiver vazio
function initializeFavoritesFile() {
    if (!fs.existsSync(favoritesFilePath) || fs.readFileSync(favoritesFilePath, 'utf-8').trim() === '') {
        fs.writeFileSync(favoritesFilePath, JSON.stringify([]));
    }
}

// Função para ler os favoritos do arquivo JSON
function readFavorites() {
    try {
        initializeFavoritesFile();
        const data = fs.readFileSync(favoritesFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading favorites:', error);
        return [];
    }
}

// Função para salvar os favoritos no arquivo JSON
function saveFavorites(favorites) {
    try {
        fs.writeFileSync(favoritesFilePath, JSON.stringify(favorites, null, 2));
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
}

// Endpoint para busca de vídeos
app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}`);
    const data = await response.json();
    res.json(data);
});

// Endpoint para adicionar/remover vídeo dos favoritos
app.post('/api/favorite/:id', (req, res) => {
    const videoId = req.params.id;
    let favorites = readFavorites();

    if (favorites.includes(videoId)) {
        favorites = favorites.filter(id => id !== videoId);
        saveFavorites(favorites);
        res.json({ message: 'Removed from favorites', favorites });
    } else {
        favorites.push(videoId);
        saveFavorites(favorites);
        res.json({ message: 'Added to favorites', favorites });
    }
});

// Endpoint para obter os vídeos favoritos
app.get('/api/favorites', async (req, res) => {
    const favorites = readFavorites();
    console.log('Loaded favorites:', favorites); // Log para depuração

    if (favorites.length === 0) {
        return res.json({ items: [] });
    }
    
    const favoriteDetails = await Promise.all(favorites.map(async id => {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${apiKey}`);
        const data = await response.json();
        return data.items[0];
    }));

    res.json({ items: favoriteDetails });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => console.log('Server running on port 3000'));