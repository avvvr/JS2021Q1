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
  if (event.target.classList.contains('piano-key')) {

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
  }
});

piano.addEventListener('mouseover', (event) => {
  if (event.target.classList.contains('piano-key')) {
    if (isLettersDisplay) {
      const letter_text = document.querySelector(`#letters_text_${event.target.id}`);
      letter_text.style.fontSize = '550px';
      letter_text.style.transition='all 0.2s';
    } else if (isNotesDisplay) {
      const note_text = document.querySelector(`#notes_text_${event.target.id}`);
      note_text.style.fontSize = '550px';
      note_text.style.transition='all 0.2s';
    }
  }
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
  if (event.target.classList.contains('piano-key')) {
    if (isLettersDisplay) {
      const letter_text = document.querySelector(`#letters_text_${event.target.id}`);
      letter_text.style.fontSize = '493.54px';
      letter_text.style.transition='all 0.2s';
    } else if (isNotesDisplay) {
      const note_text = document.querySelector(`#notes_text_${event.target.id}`);
      note_text.style.fontSize = '493.54px';
      note_text.style.transition='all 0.2s';
    }

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
  }
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

const notes_radioBtn = document.querySelector('#notes-radiobtn');
const letters_radioBtn = document.querySelector('#letters-radiobtn');
const radio = document.querySelector('.form_toggle');
const notes = document.querySelector('#notes');
const letters = document.querySelector('#letters');
radio.addEventListener('change', () => {
  if (isLettersDisplay) {
    isLettersDisplay = false;
    isNotesDisplay = true;
    letters.classList.add('letters-hidden');
    notes.classList.remove('notes-hidden');

  } else if (isNotesDisplay) {
    isNotesDisplay = false;
    isLettersDisplay = true;
    notes.classList.add('notes-hidden');
    letters.classList.remove('letters-hidden');
  }
})

let isFullscreen = false;
const fullscreenBtn = document.querySelector('#fullscreen-btn');
fullscreenBtn.addEventListener('click', () => {
  fullscreenBtn.classList.toggle('fullscreen-btn');
  fullscreenBtn.classList.toggle('fullscreen-exit-btn');
  const html = document.documentElement;
  if (isFullscreen) {
    isFullscreen = false;
    fullScreenCancel();
  } else {
    isFullscreen = true;
    fullScreen(html);
  }
})

function fullScreen(element) {
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
}

function fullScreenCancel() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}