const apiUrl = 'http://localhost:3000/api/';

async function searchVideos() {
    const query = document.getElementById('searchQuery').value;
    const response = await fetch(`${apiUrl}search?query=${query}`);
    const data = await response.json();
    displayVideos(data.items);
}

function displayVideos(videos) {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = '';
    videos.forEach(video => {
        const li = document.createElement('li');
        li.innerHTML = `
            <iframe width="200" height="150" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
            <span>${video.snippet.title}</span>
            <button onclick="toggleFavorite('${video.id.videoId}')">Favoritar</button>
        `;
        videoList.appendChild(li);
    });
}

async function toggleFavorite(videoId) {
    await fetch(`${apiUrl}/favorite/${videoId}`, { method: 'POST' });
    alert('Favorito atualizado!');
}

async function loadFavorites() {
    const response = await fetch(`${apiUrl}/favorites`);
    const data = await response.json();
    displayFavorites(data.items);
}

function displayFavorites(videos) {
    const favoriteList = document.getElementById('favoriteList');
    favoriteList.innerHTML = '';
    videos.forEach(video => {
        const li = document.createElement('li');
        li.innerHTML = `
            <iframe width="200" height="150" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
            <span>${video.snippet.title}</span>
            <button onclick="toggleFavorite('${video.id}')">Remover Favorito</button>
        `;
        favoriteList.appendChild(li);
    });
}

if (window.location.pathname.includes('favorites.html')) {
    loadFavorites();
}
