import { useEffect, useState } from 'react';
import { useWindowStore } from '../../stores/windowStore';
import './BootScreen.css';

const AppleLogo = () => (
  <svg viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.473-10.11-5.214-19.9-5.214-29.382 0-10.857 2.346-20.221 7.045-28.093 6.866-11.728 17.603-17.593 32.203-17.593 4.361 0 9.355 1.283 14.993 3.85 5.63 2.56 10.32 3.85 14.07 3.85 3.913 0 8.616-1.34 14.11-4.02 5.49-2.68 10.86-4.02 16.13-4.02 11.76 0 21.65 4.48 29.67 13.44-13.02 7.73-19.48 18.97-19.4 33.72.06 11.52 4.28 21.09 12.67 28.71 1.21 1.15 2.5 2.23 3.87 3.24-.31.91-.63 1.81-.97 2.71zm-23.2-93.08c0 8.12-2.95 15.69-8.85 22.71-7.11 8.39-15.75 13.22-24.44 12.28-.11-.97-.17-1.97-.17-3.01 0-7.77 3.38-16.08 9.38-22.95 2.95-3.41 6.73-6.33 11.34-8.76 4.61-2.34 8.76-3.65 12.45-3.91.2 1.21.29 2.43.29 3.64z"/>
  </svg>
);

const BootScreen = () => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const setBootState = useWindowStore((state) => state.setBootState);
  
  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 500);

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
            <div className="apple-logo">
              <AppleLogo />
            </div>
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
