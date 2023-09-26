    const showVideoButton = document.getElementById('showVideoButton');
 const myVideo = document.getElementById('myVideo');
 myVideo.style.display = 'none';

 showVideoButton.addEventListener('click', function() {
     if (myVideo.style.display === 'none') {
         myVideo.style.display = 'block';
     } else {
         myVideo.style.display = 'none';
     }
    })
