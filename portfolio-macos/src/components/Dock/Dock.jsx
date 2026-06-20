import { useWindowStore } from '../../stores/windowStore';
import { FolderIcon, TerminalSquareIcon, MusicIcon, BriefcaseIcon, FileTextIcon } from 'lucide-react';
import './Dock.css';

const apps = [
  { id: 'finder', icon: FolderIcon, label: 'Finder' },
  { id: 'terminal', icon: TerminalSquareIcon, label: 'Terminal' },
  { id: 'spotify', icon: MusicIcon, label: 'Spotify' },
  { id: 'projects', icon: BriefcaseIcon, label: 'Projects' },
  { id: 'resume', icon: FileTextIcon, label: 'Resume' },
];

const Dock = () => {
  const openWindow = useWindowStore((state) => state.openWindow);
  const openWindows = useWindowStore((state) => state.openWindows);
  
  return (
    <div className="dock-container">
      <div className="dock">
        {apps.map((app) => {
          const IconComponent = app.icon;
          const isActive = openWindows.includes(app.id);
          
          return (
            <div 
              key={app.id} 
              className={`dock-item ${isActive ? 'active' : ''}`}
              onClick={() => openWindow(app.id)}
              data-title={app.label}
            >
              <IconComponent size={40} strokeWidth={1.5} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
