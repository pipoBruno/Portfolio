import { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../../../stores/windowStore';
import { architectureDiagrams, terminalCommands } from '../../../data/mockData';
import './Terminal.css';

const Terminal = () => {
  const [history, setHistory] = useState([terminalCommands.welcome]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const setActiveWindow = useWindowStore((state) => state.setActiveWindow);
  const openWindow = useWindowStore((state) => state.openWindow);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let output = '';

    switch (cmd) {
      case 'help':
        output = terminalCommands.help;
        break;
      case 'about':
        output = terminalCommands.about;
        break;
      case 'skills':
        output = terminalCommands.skills;
        break;
      case 'contact':
        output = terminalCommands.contact;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'architecture':
        output = architectureDiagrams;
        break;
      case 'open spotify':
        openWindow('spotify');
        output = 'Opening Spotify...';
        break;
      case 'open finder':
        openWindow('finder');
        output = 'Opening Finder...';
        break;
      case 'open projects':
        openWindow('projects');
        output = 'Opening Projects...';
        break;
      case 'open resume':
        openWindow('resume');
        output = 'Opening Resume...';
        break;
      case '':
        output = '';
        break;
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory([...history, `$ ${input}`, output].filter(Boolean));
    setInput('');
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="window terminal-window" onClick={handleClick}>
      <div className="window-header">
        <div className="window-controls">
          <button className="control close" onClick={() => closeWindow('terminal')} />
          <button className="control minimize" onClick={() => minimizeWindow('terminal')} />
          <button className="control maximize" />
        </div>
        <span className="window-title">Terminal</span>
      </div>
      <div className="window-content terminal-content" ref={outputRef}>
        {history.map((line, index) => (
          <div key={index} className="terminal-line">
            <pre>{line}</pre>
          </div>
        ))}
        <form onSubmit={handleCommand} className="terminal-input-line">
          <span className="prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="terminal-input"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
