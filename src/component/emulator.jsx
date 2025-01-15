import React, { useEffect, useRef, useState } from 'react';
import jsnes from 'jsnes';  // Make sure this is imported!

const EmulatorComponent = ({ romData }) => {
  const canvasRef = useRef(null);
  const [isEmulatorReady, setIsEmulatorReady] = useState(false);

  useEffect(() => {
    if (canvasRef.current && romData) {
      const nes = new jsnes.NES({
        onFrame: function (frameBuffer) {
          try {
            const imageData = new ImageData(new Uint8ClampedArray(frameBuffer), 256, 240);
            canvasRef.current.getContext('2d').putImageData(imageData, 0, 0);
          } catch (err) {
            console.error('Error rendering frame:', err);
          }
        },
        onAudioSample: function (left, right) {
          // Handle audio if needed
        },
      });

      console.log('Loaded ROM data:', romData);
      try {
        nes.loadROM(romData);  // Try to load the ROM directly
        nes.start();  // Start the emulator
        setIsEmulatorReady(true);
      } catch (error) {
        console.error('Error loading ROM:', error);  // Catch errors if the ROM is not valid
      }
    }
  }, [romData]);

  return (
    <div className="border-4 border-gray-700 rounded-lg overflow-hidden">
      <canvas ref={canvasRef} width="256" height="240" className="w-full"></canvas>
      {!isEmulatorReady && (
        <p className="text-white text-center mt-4">Loading emulator...</p>
      )}
    </div>
  );
};

export default EmulatorComponent;
