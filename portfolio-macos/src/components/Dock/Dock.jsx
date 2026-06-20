import { useWindowStore } from '../../stores/windowStore';
import './Dock.css';

const apps = [
  { id: 'finder', icon: '/icons/finder.png', label: 'Finder' },
  { id: 'terminal', icon: '/icons/terminal.png', label: 'Terminal' },
  { id: 'spotify', icon: '/icons/music.png', label: 'Spotify' },
  { id: 'projects', icon: '/icons/folder.png', label: 'Projects' },
  { id: 'resume', icon: '/icons/document.png', label: 'Resume' },
];

const Dock = () => {
  const openWindow = useWindowStore((state) => state.openWindow);
  const openWindows = useWindowStore((state) => state.openWindows);
  
  return (
    <div className="dock-container">
      <div className="dock">
        {apps.map((app) => {
          const isActive = openWindows.includes(app.id);
          
          return (
            <div 
              key={app.id} 
              className={`dock-item ${isActive ? 'active' : ''}`}
              onClick={() => openWindow(app.id)}
              data-title={app.label}
            >
              <img src={app.icon} alt={app.label} width={40} height={40} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
