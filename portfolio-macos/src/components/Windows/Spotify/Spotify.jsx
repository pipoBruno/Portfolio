import { useState, useEffect, useRef } from 'react';
import { useWindowStore, useSpotifyStore } from '../../../stores/windowStore';
import { mockPlaylist } from '../../../data/mockData';
import { renderAsciiVideo } from '../../../utils/helpers';
import './Spotify.css';

const Spotify = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [showAscii, setShowAscii] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const setPlaylist = useSpotifyStore((state) => state.setPlaylist);

  useEffect(() => {
    setPlaylist(mockPlaylist);
  }, [setPlaylist]);

  useEffect(() => {
    if (showAscii && currentSong && canvasRef.current) {
      animationRef.current = renderAsciiVideo(currentSong.videoId, canvasRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        animationRef.current();
      }
    };
  }, [showAscii, currentSong]);

  const handlePlay = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setShowAscii(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentSong(null);
    setShowAscii(false);
  };

  return (
    <div className="window spotify-window">
      <div className="window-header">
        <div className="window-controls">
          <button className="control close" onClick={() => closeWindow('spotify')} />
          <button className="control minimize" onClick={() => minimizeWindow('spotify')} />
          <button className="control maximize" />
        </div>
        <span className="window-title">🎵 Spotify</span>
      </div>
      
      <div className="spotify-content">
        <div className="spotify-sidebar">
          <h3>My Playlist</h3>
          <ul className="playlist">
            {mockPlaylist.map((song) => (
              <li 
                key={song.id} 
                className={`playlist-item ${currentSong?.id === song.id ? 'active' : ''}`}
                onClick={() => handlePlay(song)}
              >
                <div className="song-info">
                  <span className="song-title">{song.title}</span>
                  <span className="song-artist">{song.artist}</span>
                </div>
                <span className="song-duration">{song.duration}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="spotify-main">
          {showAscii && currentSong ? (
            <div className="ascii-player">
              <canvas 
                ref={canvasRef} 
                width={400} 
                height={300}
                className="ascii-canvas"
              />
              <div className="now-playing">
                <h4>Now Playing</h4>
                <p>{currentSong.title} - {currentSong.artist}</p>
                <button className="stop-btn" onClick={handleStop}>
                  Stop
                </button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a song to play with ASCII visualization</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spotify;
