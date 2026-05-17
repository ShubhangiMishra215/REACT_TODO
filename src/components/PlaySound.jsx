let audioContext = null;

const soundConfig = {
  add:      { frequency: 523, duration: 0.15, type: 'sine' },
  complete: { frequency: 784, duration: 0.3,  type: 'sine' },
  delete:   { frequency: 220, duration: 0.2,  type: 'sawtooth' },
  update:   { frequency: 440, duration: 0.15, type: 'sine' },
}

export const playSound = (type) => {
  try {
    const config = soundConfig[type];
    if (!config) return;

    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = config.frequency;
    oscillator.type = config.type;

    gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001, 
      audioContext.currentTime + config.duration
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + config.duration);

  } catch (err) {
    console.log("Sound error:", err)
  }
}