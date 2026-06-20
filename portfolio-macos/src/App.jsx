import { useState, useEffect } from 'react';
import BootScreen from './components/BootScreen/BootScreen';
import MenuBar from './components/MenuBar/MenuBar';
import Desktop from './components/Desktop/Desktop';
import Dock from './components/Dock/Dock';
import { useWindowStore } from './stores/windowStore';
import './App.css';

function App() {
  const bootState = useWindowStore((state) => state.bootState);

  return (
    <div className="app">
      {bootState === 'booting' || bootState === 'logo' ? (
        <BootScreen />
      ) : (
        <>
          <MenuBar />
          <Desktop />
          <Dock />
        </>
      )}
    </div>
  );
}

export default App;
