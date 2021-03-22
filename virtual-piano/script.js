const piano = document.querySelector('#piano');
const pianoKey = document.querySelectorAll('.piano-key');
const keySoundsMap = new Map([
  ['KeyD', {
    id: 'c',
    link: 'assets/audio/c.mp3'
  }],
  ['KeyF', {
    id: 'd',
    link: 'assets/audio/d.mp3'
  }],
  ['KeyG', {
    id: 'e',
    link: 'assets/audio/e.mp3'
  }],
  ['KeyH', {
    id: 'f',
    link: 'assets/audio/f.mp3'
  }],
  ['KeyJ', {
    id: 'g',
    link: 'assets/audio/g.mp3'
  }],
  ['KeyK', {
    id: 'a',
    link: 'assets/audio/a.mp3'
  }],
  ['KeyL', {
    id: 'b',
    link: 'assets/audio/b.mp3'
  }],

  ['KeyT', {
    id: 'c♯',
    link: 'assets/audio/c♯.mp3'
  }],
  ['KeyY', {
    id: 'd♯',
    link: 'assets/audio/d♯.mp3'
  }],
  ['KeyU', {
    id: 'f♯',
    link: 'assets/audio/f♯.mp3'
  }],
  ['KeyI', {
    id: 'g♯',
    link: 'assets/audio/g♯.mp3'
  }],

  ['KeyO', {
    id: 'a♯',
    link: 'assets/audio/a♯.mp3'
  }]
]);

let isMouseDown = false;
let isLettersDisplay = false;
let isNotesDisplay = true;

// по нажатию лкм

piano.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('piano-key')) {
    isMouseDown = true;
    const note = event.target.id;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);

    event.target.classList.add('piano-key-active');
    if (isNotesDisplay) {
      const element = document.querySelector(`#notes_text_${note}`);
      element.style.fill = '#FFCD0A';
    }
    if (isLettersDisplay) {
      const element = document.querySelector(`#letters_text_${note}`);
      element.style.fill = '#FFCD0A';
    }

    const line = document.querySelector(`#undeline_${note}`);
    line.classList.remove('underline-hidden');
  }
});

window.addEventListener('mouseup', (event) => {
  isMouseDown = false;
  event.target.classList.remove('piano-key-active');
  if (isNotesDisplay) {
    const element = document.querySelector(`#notes_text_${event.target.id}`);
    element.style.fill = '#FFFFFF';
  }
  if (isLettersDisplay) {
    const element = document.querySelector(`#letters_text_${event.target.id}`);
    element.style.fill = '#FFF';
  }

  const line = document.querySelector(`#undeline_${event.target.id}`);
  line.classList.add('underline-hidden');
});

piano.addEventListener('mouseover', (event) => {
  if (isMouseDown) {
    if (event.target.classList.contains('piano-key')) {
      isMouseDown = true;
      const note = event.target.id;
      const src = `assets/audio/${note}.mp3`;
      playAudio(src);

      event.target.classList.add('piano-key-active');

      if (isNotesDisplay) {
        const element = document.querySelector(`#notes_text_${note}`);
        element.style.fill = '#FFCD0A';
      }
      if (isLettersDisplay) {
        const element = document.querySelector(`#letters_text_${note}`);
        element.style.fill = '#FFCD0A';
      }

      const line = document.querySelector(`#undeline_${note}`);
      line.classList.remove('underline-hidden');
    }
  }
})

piano.addEventListener('mouseout', (event) => {
  event.target.classList.remove('piano-key-active');

  if (isNotesDisplay) {
    const element = document.querySelector(`#notes_text_${event.target.id}`);
    element.style.fill = '#FFFFFF';
  }
  if (isLettersDisplay) {
    const element = document.querySelector(`#letters_text_${event.target.id}`);
    element.style.fill = '#FFF';
  }

  const line = document.querySelector(`#undeline_${event.target.id}`);
  line.classList.add('underline-hidden');
})

// по нажатию клавиатуры

window.addEventListener('keydown', (event) => {
  for (let key of keySoundsMap.keys()) {
    if (key === event.code) {
      let element = document.querySelector(`#${keySoundsMap.get(key).id}`);
      element.classList.add('piano-key-active');
      playAudio(`${keySoundsMap.get(key).link}`);

      if (isNotesDisplay) {
        const element = document.querySelector(`#notes_text_${keySoundsMap.get(key).id}`);
        element.style.fill = '#FFCD0A';
      }
      if (isLettersDisplay) {
        const element = document.querySelector(`#letters_text_${keySoundsMap.get(key).id}`);
        element.style.fill = '#FFCD0A';
      }

      const line = document.querySelector(`#undeline_${keySoundsMap.get(key).id}`);
      line.classList.remove('underline-hidden');
    }
  }
})

window.addEventListener('keyup', (event) => {
  for (let key of keySoundsMap.keys()) {
    if (key === event.code) {
      let element = document.querySelector(`#${keySoundsMap.get(key).id}`);
      element.classList.remove('piano-key-active');

      if (isNotesDisplay) {
        const element = document.querySelector(`#notes_text_${keySoundsMap.get(key).id}`);
        element.style.fill = '#FFF';
      }
      if (isLettersDisplay) {
        const element = document.querySelector(`#letters_text_${keySoundsMap.get(key).id}`);
        element.style.fill = '#FFF';
      }

      const line = document.querySelector(`#undeline_${keySoundsMap.get(key).id}`);
      line.classList.add('underline-hidden');
    }
  }
})

function playAudio(src) {
  let audio = document.createElement('audio');
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}