import { useWindowStore } from '../../stores/windowStore';
import './Dock.css';

const Dock = () => {
  const openWindow = useWindowStore((state) => state.openWindow);
  
  const apps = [
    { id: 'finder', icon: '😊', label: 'Finder' },
    { id: 'terminal', icon: '💻', label: 'Terminal' },
    { id: 'spotify', icon: '🎵', label: 'Spotify' },
    { id: 'projects', icon: '📁', label: 'Projects' },
    { id: 'resume', icon: '📄', label: 'Resume' },
  ];
  
  return (
    <div className="dock">
      <div className="dock-content">
        {apps.map((app) => (
          <div 
            key={app.id} 
            className="dock-item"
            onClick={() => openWindow(app.id)}
            title={app.label}
          >
            <span className="dock-icon">{app.icon}</span>
            <span className="dock-label">{app.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock;
