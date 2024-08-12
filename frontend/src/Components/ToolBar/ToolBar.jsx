import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import './ToolBar.css';
import PropTypes from 'prop-types';

const ToolBar = ({ onSave }) => {
  const [title, setTitle] = useState('Document_Title');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Toggle between editable and non-editable state
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle download as MD
  const handleDownloadMD = () => {
    const content = '# Markdown Content\nYour content goes here...';
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, `${title}.md`);
  };

  // Handle download as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Your content goes here...', 10, 10); // Replace with actual content
    doc.save(`${title}.pdf`);
  };

  // Handle save
  const handleSave = () => {
    onSave(title); // Pass title to onSave callback
  };

  // Handle title blur to stop editing
  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="toolbar">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        onDoubleClick={toggleEdit}
        onBlur={handleBlur}
        readOnly={!isEditing}
        style={{
          fontWeight: isEditing ? 'normal' : 'bold',
          fontSize: '16px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        }}
      />

      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" variant="primary">
          <FaDownload style={{ marginRight: '5px' }} />
          Download
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleDownloadMD}>
            <FaDownload style={{ marginRight: '5px' }} />
            MD
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDownloadPDF}>
            <FaFilePdf style={{ marginRight: '5px' }} />
            PDF
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button onClick={handleSave} variant="success">Save</Button>
    </div>
  );
};

ToolBar.propTypes = {
  onSave: PropTypes.func
}

export default ToolBar;
