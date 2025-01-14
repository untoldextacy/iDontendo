// Initialize canvas and emulator
const canvas = document.getElementById('emulatorCanvas');
const ctx = canvas.getContext('2d');
const romInput = document.getElementById('romInput');

const nes = new jsnes.NES({
  onFrame: function (frameBuffer) {
    const imageData = ctx.createImageData(256, 240);
    for (let i = 0; i < frameBuffer.length; i++) {
      imageData.data[i] = frameBuffer[i];
    }
    ctx.putImageData(imageData, 0, 0);
  },
});

// Load ROM file on user selection
romInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      nes.loadROM(e.target.result);
      nes.start();
    };
    reader.readAsBinaryString(file);
  }
});
