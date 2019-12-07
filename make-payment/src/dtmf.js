const context = new AudioContext();
const analyser = context.createAnalyser();
const distortion = context.createWaveShaper();
const gainNode = context.createGain();
const biquadFilter = context.createBiquadFilter();
const fftSize = 4096;
var source, intervalRef;
analyser.fftSize = fftSize;
analyser.smoothingTimeConstant = 0;

export function getMicrophone() {
  navigator.getUserMedia(
    {
      audio: true
    },
    stream => {
      source = context.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(context.destination);
      intervalRef = setInterval(analyse, 500);
    },
    console.error
  );
}

const keys = [];
const notes = [1209, 1336, 1477, 1633, 697, 770, 852, 941];
const coeffs = [0, 1, 2, 3, 0, 4, 8, 12];
const pads = [
  "1",
  "2",
  "3",
  "A",
  "4",
  "5",
  "6",
  "B",
  "7",
  "8",
  "9",
  "C",
  "*",
  "0",
  "#",
  "D"
];

notes.forEach(note => {
  keys.push(Math.round(note / (44100 / fftSize)));
});

function analyse() {
  // console.log("analysed");
  let count = 0;
  let data = new Uint8Array(analyser.frequencyBinCount);
  let coeff = null;
  analyser.getByteFrequencyData(data);

  for (let i = 0; i < analyser.frequencyBinCount; ++i) {
    if (keys.indexOf(i) !== -1 && data[i] > 150) {
      if (coeff === null) coeff = 0;
      count += 1;
      coeff += coeffs[keys.indexOf(i)];
    }
  }
  if (coeff !== null && count === 2) {
    clearInterval(intervalRef);
    console.log(pads[coeff]);
    intervalRef = setInterval(analyse, 400);
  }
}

export function startDecode() {
  context.resume().then(() => {
    console.log("DTMF decoder init");
  });
}
