const soundMap = {

  'S': 'hihat.wav',
  'Ö': 'clap.wav',
  'Z': 'openhat.wav',
  'D': 'ride.wav',
  'A': 'kick.wav',
  'R': 'ride.wav',
  'B': 'hihat.wav',
  'boom': 'boom.mp3'
};

function playSound(key) {
  const file = soundMap[key];
  if (file) {
    const audio = new Audio(file);
    audio.play();
  }
}

// Butonlara tıklama ile ses çal
document.querySelectorAll('.drum').forEach(btn => {
  btn.addEventListener('click', function() {
    const key = this.getAttribute('data-key');
    playSound(key);
  });
});

// Klavyeden harfe basınca ses çal
document.addEventListener('keydown', function(e) {
  let key = e.key.toUpperCase();
  playSound(key);
});
