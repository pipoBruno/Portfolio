import { useWindowStore } from '../../../stores/windowStore';
import { fileSystemData } from '../../../data/mockData';
import './Finder.css';

const Finder = () => {
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);

  const renderFileItem = (item, depth = 0) => {
    return (
      <div key={item.name} className="file-item" style={{ paddingLeft: `${depth * 16}px` }}>
        <div className="file-icon">{item.icon || '📁'}</div>
        <span className="file-name">{item.name}</span>
        {item.type === 'folder' && item.children && (
          <div className="folder-children">
            {item.children.map((child) => renderFileItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="window finder-window">
      <div className="window-header">
        <div className="window-controls">
          <button className="control close" onClick={() => closeWindow('finder')} />
          <button className="control minimize" onClick={() => minimizeWindow('finder')} />
          <button className="control maximize" />
        </div>
        <span className="window-title">Finder</span>
      </div>
      
      <div className="finder-content">
        <div className="finder-sidebar">
          <div className="sidebar-section">
            <h4>Favorites</h4>
            <ul>
              <li>🏠 Home</li>
              <li>📄 Documents</li>
              <li>⬇️ Downloads</li>
              <li>🎵 Music</li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h4>iCloud</h4>
            <ul>
              <li>☁️ iCloud Drive</li>
              <li>📱 Desktop</li>
            </ul>
          </div>
        </div>
        
        <div className="finder-main">
          <div className="finder-toolbar">
            <span className="toolbar-path">Home / Portfolio</span>
          </div>
          <div className="file-grid">
            {fileSystemData.children.map((item) => (
              <div key={item.name} className="grid-item">
                <div className="grid-icon">{item.icon || '📁'}</div>
                <span className="grid-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finder;
