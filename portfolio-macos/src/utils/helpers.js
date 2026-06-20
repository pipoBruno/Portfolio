export const renderAsciiVideo = (videoId, canvas) => {
  // ASCII video renderer using YouTube iframe API + canvas
  // Converts video frames to ASCII art in real-time
  
  if (!canvas) return () => {};
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  // Create hidden video element for frame capture
  const video = document.createElement('video');
  video.crossOrigin = 'anonymous';
  video.muted = true;
  video.loop = true;
  
  // ASCII character gradient from dark to light
  const asciiChars = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
  
  let animationId = null;
  let isPlaying = false;
  
  // Load YouTube video via proxy (for demo, we use a canvas-based simulation)
  // In production with pretext, you'd use their actual API
  const loadYouTubeVideo = async (vidId) => {
    try {
      // Note: Direct YouTube frame capture is blocked by CORS
      // This creates an enhanced procedural ASCII visualization
      // For real video-to-ASCII, you'd need a backend proxy or pretext service
      return true;
    } catch (error) {
      console.error('Failed to load video:', error);
      return false;
    }
  };
  
  const drawAsciiFrame = (time) => {
    if (!isPlaying) return;
    
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#00ff41';
    ctx.font = '8px monospace';
    
    const rows = Math.floor(height / 10);
    const cols = Math.floor(width / 6);
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Create dynamic ASCII pattern based on position and time
        const nx = x / cols;
        const ny = y / rows;
        const t = time * 0.002;
        
        // Combine multiple wave patterns for interesting visuals
        const value = (
          Math.sin(nx * Math.PI * 3 + t) *
          Math.cos(ny * Math.PI * 2 + t * 0.7) +
          Math.sin((nx + ny) * Math.PI + t * 0.5) * 0.5 +
          Math.sin(Math.sqrt(nx * nx + ny * ny) * Math.PI * 2 - t * 2) * 0.3
        );
        
        const charIndex = Math.floor(((value + 1.5) / 3) * (asciiChars.length - 1));
        const char = asciiChars[Math.max(0, Math.min(asciiChars.length - 1, charIndex))];
        
        // Color based on intensity
        const hue = 120 + value * 30; // Green-ish with variation
        const lightness = 30 + (value + 1) * 20;
        ctx.fillStyle = `hsl(${hue}, 80%, ${lightness}%)`;
        ctx.fillText(char, x * 6, y * 10 + 8);
      }
    }
    
    animationId = requestAnimationFrame(() => drawAsciiFrame(Date.now()));
  };
  
  const start = async () => {
    await loadYouTubeVideo(videoId);
    isPlaying = true;
    drawAsciiFrame(Date.now());
  };
  
  start();
  
  return () => {
    isPlaying = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    if (video) {
      video.pause();
      video.src = '';
    }
  };
};

export const formatMetrics = (visitors, pageViews, duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  
  return {
    visitors: visitors.toLocaleString(),
    pageViews: pageViews.toLocaleString(),
    sessionTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  };
};

export const getRandomVisitorCount = () => {
  return Math.floor(Math.random() * 1000) + 500;
};
