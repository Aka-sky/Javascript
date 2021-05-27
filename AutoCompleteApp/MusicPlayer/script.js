const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const time = document.querySelector('#time');

// Song Titles 
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of songs
let songIndex = 0

// Initially load songs
loadSong(songs[songIndex]);

// To add leading zeros
function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function loadSong(song) {
    title.innerText = song.charAt(0).toUpperCase() + song.slice(1);
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

function prevSong() {
    if(songIndex == 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex = songIndex - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong() {
    songIndex = (songIndex + 1) % 3;

    loadSong(songs[songIndex]);

    playSong();
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;

    const percentage = (currentTime / duration) * 100;

    progress.style.width = `${percentage}%`;

    const minutes = parseInt(currentTime / 60);

    const seconds = parseInt(currentTime % 60);

    time.innerText = `${minutes}:${padLeadingZeros(seconds, 2)}`
}

function setProgress(e) {
    const width = this.clientWidth; // gives total width of element
    const clickX = e.offsetX; // gives the place at which begin clicked

    audio.currentTime = audio.duration * (clickX / width);

    // progress.style.width = `${completed * 100}%`

}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
    // musicContainer.classList.toggle('play')
})

// Change songs
prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click', nextSong);

// Progress
audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);