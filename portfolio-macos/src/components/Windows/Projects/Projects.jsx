import { useWindowStore } from '../../../stores/windowStore';
import './Projects.css';

const Projects = () => {
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      status: 'Completed'
    },
    {
      title: 'Task Management App',
      description: 'Real-time collaborative task manager with WebSocket integration',
      tech: ['Vue.js', 'Socket.io', 'MongoDB', 'Redis'],
      status: 'In Progress'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather visualization using multiple API sources',
      tech: ['React', 'D3.js', 'OpenWeather API', 'AWS Lambda'],
      status: 'Completed'
    },
    {
      title: 'Social Media Clone',
      description: 'Twitter-like platform with real-time updates and notifications',
      tech: ['Next.js', 'GraphQL', 'PostgreSQL', 'AWS S3'],
      status: 'Beta'
    }
  ];

  return (
    <div className="window projects-window">
      <div className="window-header">
        <div className="window-controls">
          <button className="control close" onClick={() => closeWindow('projects')} />
          <button className="control minimize" onClick={() => minimizeWindow('projects')} />
          <button className="control maximize" />
        </div>
        <span className="window-title">📁 Projects</span>
      </div>
      
      <div className="projects-content">
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
