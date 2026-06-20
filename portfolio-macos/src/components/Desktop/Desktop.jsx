import { useRef } from 'react';
import { FolderIcon, FileTextIcon, TerminalSquareIcon, MusicIcon, BriefcaseIcon } from 'lucide-react';
import { useWindowStore } from '../../stores/windowStore';
import Terminal from '../Windows/Terminal/Terminal';
import Spotify from '../Windows/Spotify/Spotify';
import Finder from '../Windows/Finder/Finder';
import Projects from '../Windows/Projects/Projects';
import Resume from '../Windows/Resume/Resume';
import './Desktop.css';

const desktopIcons = [
  { id: 'finder', name: 'Finder', icon: FolderIcon },
  { id: 'projects', name: 'Projects', icon: BriefcaseIcon },
  { id: 'resume', name: 'Resume.pdf', icon: FileTextIcon },
  { id: 'terminal', name: 'Terminal', icon: TerminalSquareIcon },
  { id: 'spotify', name: 'Spotify', icon: MusicIcon },
];

const Desktop = () => {
  const openWindows = useWindowStore((state) => state.openWindows);
  const activeWindowId = useWindowStore((state) => state.activeWindowId);
  const setActiveWindow = useWindowStore((state) => state.setActiveWindow);
  const openWindow = useWindowStore((state) => state.openWindow);
  
  const windowPositions = useRef({
    terminal: { x: 100, y: 100 },
    spotify: { x: 150, y: 150 },
    finder: { x: 200, y: 200 },
    projects: { x: 250, y: 250 },
    resume: { x: 300, y: 300 }
  });

  const handleIconClick = (id) => {
    openWindow(id);
  };

  const renderWindow = (windowId) => {
    const components = {
      terminal: Terminal,
      spotify: Spotify,
      finder: Finder,
      projects: Projects,
      resume: Resume
    };
    
    const Component = components[windowId];
    if (!Component) return null;
    
    return (
      <div
        key={windowId}
        className={`window ${activeWindowId === windowId ? 'active' : ''}`}
        style={{
          left: windowPositions.current[windowId]?.x || 100,
          top: windowPositions.current[windowId]?.y || 100,
          zIndex: activeWindowId === windowId ? 100 : 10
        }}
        onMouseDown={() => setActiveWindow(windowId)}
      >
        <Component />
      </div>
    );
  };

  return (
    <div className="desktop">
      <div className="desktop-grid">
        {desktopIcons.map((icon) => {
          const IconComponent = icon.icon;
          return (
            <div
              key={icon.id}
              className="desktop-icon"
              onDoubleClick={() => handleIconClick(icon.id)}
            >
              <IconComponent size={48} strokeWidth={1.5} />
              <span>{icon.name}</span>
            </div>
          );
        })}
      </div>
      {openWindows.map(renderWindow)}
    </div>
  );
};

export default Desktop;
