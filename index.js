const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');

const music = new Audio();
const songs = [
    {
        path: 'songs/maneva.mp3',
        displayName: 'Cheiro das flores',
        cover: 'image/maneva.jpg',
        artist: 'Maneva'
    },
    {
        path: 'songs/maneva.mp3',
        displayName: 'Cheiro das flores',
        cover: 'image/Doctor Who.jpeg',
        artist: 'Maneva'
    },
    {
        path: 'songs/maneva.mp3',
        displayName: 'Cheiro das flores',
        cover: 'image/tardis.jpeg',
        artist: 'Maneva'
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if(isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // muda o icone play
    playBtn.classList.replace('fa-play', 'fa-Pause');
    // define butão para ver titulo
    playBtn.setAttribute('title', 'pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // muda o icone pause
    playBtn.classList.replace('fa-pause', 'fa-Play');
    // define butão para ver titulo
    playBtn.setAttribute('title', 'play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) %
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic()
}

function updateProgressBar() {
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime( currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('click', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);