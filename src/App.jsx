import React, { useState, useEffect, useRef } from 'react';

const EmulatorComponent = ({ romData }) => {
  const canvasRef = useRef(null);
  const [webnesLoaded, setWebnesLoaded] = useState(false);

  // Dynamically load the WebNES script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/simonh1000/WebNES@v0.0.1/webnes.min.js';
    script.onload = () => setWebnesLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Clean up the script on unmount
    };
  }, []);

  // Initialize WebNES when it's loaded
  useEffect(() => {
    if (!webnesLoaded || !romData || !canvasRef.current) return;  // Make sure WebNES and romData are available

    const webnes = new WebNES.WebNES();
    webnes.load(romData); // Load the ROM data
    webnes.start(canvasRef.current); // Start WebNES with the canvas reference
  }, [webnesLoaded, romData]);

  return (
    <div className="flex justify-center items-center p-4 bg-gray-800 rounded-lg shadow-lg">
      <canvas ref={canvasRef} width="256" height="240" className="border-4 border-white"></canvas>
    </div>
  );
};

const App = () => {
  const [romData, setRomData] = useState(null);

  const handleRomChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const data = new Uint8Array(arrayBuffer);
        setRomData(data); // Store the ROM data for emulator
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-center text-yellow-400">WebNES Emulator</h1>
      <input
        type="file"
        accept=".nes"
        onChange={handleRomChange}
        className="mb-4 px-4 py-2 bg-yellow-400 text-black rounded-lg cursor-pointer"
      />
      {romData && <EmulatorComponent romData={romData} />}
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>&copy; 2025 WebNES Emulator Project</p>
      </footer>
    </div>
  );
};

export default App;
