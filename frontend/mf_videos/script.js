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
        if (!video || !video.id || !video.snippet) {
            console.error('Invalid video data:', video);
            return;
        }

        const videoId = video.id.videoId;
        const li = document.createElement('li');
        li.innerHTML = `
            <iframe width="200" height="150" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            <div class="video-info">
                <span>${video.snippet.title}</span>
                <i class="fas fa-heart favorite" onclick="toggleFavorite('${videoId}', this)"></i>
            </div>
        `;
        videoList.appendChild(li);
    });
}

async function toggleFavorite(videoId, element) {
    const response = await fetch(`${apiUrl}favorite/${videoId}`, { method: 'POST' });
    const data = await response.json();
    if (data.message.includes('Added')) {
        element.classList.add('active');
    } else if (data.message.includes('Removed')) {
        element.classList.remove('active');
        removeFavorite(videoId);
    }
    alert(data.message);
}

async function loadFavorites() {
    const response = await fetch(`${apiUrl}favorites`);
    const data = await response.json();
    displayFavorites(data.items);
}

function displayFavorites(videos) {
    const favoriteList = document.getElementById('favoriteList');
    favoriteList.innerHTML = '';
    videos.forEach(video => {
        if (!video || !video.id || !video.snippet) {
            console.error('Invalid video data:', video);
            return;
        }

        const videoId = video.id; // Favoritos usam 'video.id' diretamente
        const li = document.createElement('li');
        li.id = `favorite-${videoId}`;
        li.innerHTML = `
            <iframe width="200" height="150" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            <div class="video-info">
                <span>${video.snippet.title}</span>
                <i class="fas fa-heart favorite active" onclick="toggleFavorite('${videoId}', this)"></i>
            </div>
        `;
        favoriteList.appendChild(li);
    });
}

async function removeFavorite(videoId) {
    const response = await fetch(`${apiUrl}favorite/${videoId}`, { method: 'DELETE' });
    const data = await response.json();
    if (data.message.includes('Removed')) {
        // Remove o item da lista de favoritos
        const item = document.getElementById(`favorite-${videoId}`);
        if (item) {
            item.remove();
        }
    } else {
        console.error('Erro ao remover o vídeo dos favoritos:', data.message);
    }
}

if (window.location.pathname.includes('favorites.html')) {
    loadFavorites();
}
