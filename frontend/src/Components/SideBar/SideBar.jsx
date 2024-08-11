import React, { useState } from 'react';
import { FaHistory, FaFileAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Sidebar.css'; // Optional: Add your custom styles here

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className="sidebar-header" onClick={toggleCollapse}>
        <img src='/public/favicon1/favicon-16x16.png' />
        {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
      </div>
      <div className={`sidebar-menu ${isCollapsed ? 'hidden' : 'visible'}`}>
        <div className="sidebar-section">
          <div className="sidebar-item" onClick={toggleHistory}>
            <FaHistory />
            <span className="item-text">History</span>
            {isHistoryOpen ? <FaChevronUp className="collapse-icon" /> : <FaChevronDown className="collapse-icon" />}
          </div>
          {isHistoryOpen && (
            <div className="history-content">
              {/* Render your history content here */}
              <p>History Item 1</p>
              <p>History Item 2</p>
              {/* Add more history items as needed */}
            </div>
          )}
        </div>
        <a href="#create-new" className="sidebar-item">
          <FaFileAlt />
          <span className="item-text">Create New Document</span>
        </a>
      </div>
    </div>
  );
};

export default SideBar;
