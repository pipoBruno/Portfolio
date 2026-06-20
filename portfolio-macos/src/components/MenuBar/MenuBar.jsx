import { useEffect, useState } from 'react';
import { useMetricsStore } from '../../stores/windowStore';
import { formatMetrics, getRandomVisitorCount } from '../../utils/helpers';
import { WifiIcon, BatteryFullIcon, SearchIcon } from 'lucide-react';
import './MenuBar.css';

const MenuBar = () => {
  const { uniqueVisitors, pageViews, sessionDuration, incrementVisitor, updateSessionDuration } = useMetricsStore();
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    // Initialize visitor count on mount (mock localStorage logic)
    const stored = localStorage.getItem('portfolio_metrics');
    if (!stored) {
      incrementVisitor();
      localStorage.setItem('portfolio_metrics', JSON.stringify({
        visitors: 1,
        pageViews: 1,
        startTime: Date.now()
      }));
    } else {
      const data = JSON.parse(stored);
      localStorage.setItem('portfolio_metrics', JSON.stringify({
        ...data,
        pageViews: data.pageViews + 1
      }));
    }
    
    // Update session duration every second
    const interval = setInterval(() => {
      const start = JSON.parse(localStorage.getItem('portfolio_metrics'))?.startTime || Date.now();
      const duration = Math.floor((Date.now() - start) / 1000);
      updateSessionDuration(duration);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [incrementVisitor, updateSessionDuration]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const metrics = formatMetrics(
    getRandomVisitorCount(),
    pageViews,
    sessionDuration
  );
  
  return (
    <div className="menu-bar">
      <div className="menu-left">
        <span className="menu-item apple"></span>
        <span className="menu-item bold">Portfolio</span>
        <span className="menu-item">File</span>
        <span className="menu-item">Edit</span>
        <span className="menu-item">View</span>
        <span className="menu-item">Go</span>
        <span className="menu-item">Window</span>
        <span className="menu-item">Help</span>
      </div>
      <div className="menu-right">
        <div className="metrics-display status-icon">
          <span className="metric-item">👥 {metrics.visitors}</span>
          <span className="metric-item">👁 {metrics.pageViews}</span>
          <span className="metric-item">⏱ {metrics.sessionTime}</span>
        </div>
        <div className="status-icon">
          <SearchIcon size={16} />
        </div>
        <div className="status-icon">
          <WifiIcon size={16} />
        </div>
        <div className="status-icon">
          <BatteryFullIcon size={16} />
        </div>
        <span className="time-display">{currentTime}</span>
      </div>
    </div>
  );
};

export default MenuBar;
