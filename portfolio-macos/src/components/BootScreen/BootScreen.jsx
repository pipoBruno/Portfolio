import { useEffect, useState } from 'react';
import { useWindowStore } from '../../stores/windowStore';
import './BootScreen.css';

const BootScreen = () => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const setBootState = useWindowStore((state) => state.setBootState);

  useEffect(() => {
    // Show Apple logo after initial boot screen
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 500);

    // Simulate boot progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setBootState('desktop');
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressInterval);
    };
  }, [setBootState]);

  return (
    <div className="boot-screen">
      <div className="boot-content">
        {showLogo && (
          <>
            <div className="apple-logo"></div>
            <div className="loading-bar">
              <div 
                className="loading-progress" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BootScreen;
