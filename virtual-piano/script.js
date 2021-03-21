const piano = document.querySelector('#piano');
const pianoKey = document.querySelectorAll('.piano-key');
//const audio = document.querySelector('audio');

let isMouseDown = false;

piano.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('piano-key')) {
    isMouseDown = true;
    const note = event.target.id;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);

    event.target.classList.add('piano-key-active');
  }
});

window.addEventListener('mouseup', (event) => {
  isMouseDown = false;

  event.target.classList.remove('piano-key-active');
});

piano.addEventListener('mouseover', (event) => {
  if (isMouseDown) {
    if (event.target.classList.contains('piano-key')) {
      isMouseDown = true;
      const note = event.target.id;
      const src = `assets/audio/${note}.mp3`;
      playAudio(src);
      
      event.target.classList.add('piano-key-active');
    }
  }
})

piano.addEventListener('mouseout', (event) => {
  event.target.classList.remove('piano-key-active');
})

function playAudio(src) {
  let audio = document.createElement('audio');
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}