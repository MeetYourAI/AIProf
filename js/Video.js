function toggleVideo(videoId) {
    const video = document.getElementById(videoId);
    if (video.style.display === 'none' || video.style.display === '') {
        video.style.display = 'block'; 
    } else {
        video.style.display = 'none'; 
    }
}

document.getElementById('toggleButton1').addEventListener('click', () => {
    toggleVideo('video1');
});

document.getElementById('toggleButton2').addEventListener('click', () => {
    toggleVideo('video2');
});

document.getElementById('toggleButton3').addEventListener('click', () => {
    toggleVideo('video3');
});

document.getElementById('toggleButton4').addEventListener('click', () => {
    toggleVideo('video4');
});