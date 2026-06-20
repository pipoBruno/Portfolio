import { useWindowStore } from '../../../stores/windowStore';
import './Resume.css';

const Resume = () => {
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);

  return (
    <div className="window resume-window">
      <div className="window-header">
        <div className="window-controls">
          <button className="control close" onClick={() => closeWindow('resume')} />
          <button className="control minimize" onClick={() => minimizeWindow('resume')} />
          <button className="control maximize" />
        </div>
        <span className="window-title">📄 Resume</span>
      </div>
      
      <div className="resume-content">
        <div className="resume-header">
          <h1>John Doe</h1>
          <p className="resume-title">Full Stack Developer</p>
          <div className="contact-info">
            <span>📧 john.doe@example.com</span>
            <span>📱 +1 (555) 123-4567</span>
            <span>🌐 github.com/johndoe</span>
          </div>
        </div>

        <div className="resume-section">
          <h2>Experience</h2>
          <div className="resume-item">
            <div className="item-header">
              <h3>Senior Full Stack Developer</h3>
              <span className="item-date">2021 - Present</span>
            </div>
            <p className="item-company">Tech Company Inc.</p>
            <ul>
              <li>Led development of microservices architecture serving 1M+ users</li>
              <li>Reduced API response time by 60% through optimization</li>
              <li>Mentored team of 5 junior developers</li>
            </ul>
          </div>
          
          <div className="resume-item">
            <div className="item-header">
              <h3>Full Stack Developer</h3>
              <span className="item-date">2019 - 2021</span>
            </div>
            <p className="item-company">StartupXYZ</p>
            <ul>
              <li>Built real-time collaboration features using WebSockets</li>
              <li>Implemented CI/CD pipelines reducing deployment time by 80%</li>
              <li>Developed responsive UI components used across 10+ products</li>
            </ul>
          </div>
        </div>

        <div className="resume-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <p>React, Vue.js, TypeScript, TailwindCSS, Next.js</p>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <p>Node.js, Python, PostgreSQL, MongoDB, Redis</p>
            </div>
            <div className="skill-category">
              <h3>DevOps</h3>
              <p>AWS, Docker, Kubernetes, GitHub Actions, Terraform</p>
            </div>
          </div>
        </div>

        <div className="resume-section">
          <h2>Education</h2>
          <div className="resume-item">
            <div className="item-header">
              <h3>B.S. Computer Science</h3>
              <span className="item-date">2015 - 2019</span>
            </div>
            <p className="item-company">University of Technology</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
