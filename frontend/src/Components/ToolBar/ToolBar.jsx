import { useCallback, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { saveAs } from 'file-saver';
import { marked } from 'marked';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import './ToolBar.css';
import PropTypes from 'prop-types';

const ToolBar = ({ onSave, mdxRef }) => {
  const [title, setTitle] = useState('Document_Title');
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    setContent("");
  })

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // Toggle between editable and non-editable state
  const toggleEdit = () => {
    if (isEditing == false) {
      if (title == "Add Title Here") {
        setTitle("");
      }
    }

    setIsEditing(!isEditing);
  };

  // Handle download as MD
  const handleDownloadMD = useCallback(() => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, `${title}.md`);
  }, [content]);

  // Handle download as PDF
  const handleDownloadPDF = () => {
    let markdownContent = mdxRef.current.getMarkdown();
    markdownContent = markdownContent.replaceAll("```json", "\n");

    const htmlContent = marked(markdownContent);

    // Convert HTML to a format suitable for PDFMake
    const pdfContent = htmlToPdfmake(htmlContent);

    // Define the PDF document
    const documentDefinition = { content: pdfContent };

    // Generate and download the PDF
    pdfMake.createPdf(documentDefinition).download('document.pdf');
  };

  // Handle save
  const handleSave = useCallback(() => {

    let result = onSave(document.querySelector(".toolbar input").value, content); // Pass title to onSave callback
    console.log(title, content);
    
    console.log(result);

  }, [content]);

  // Handle title blur to stop editing
  const handleBlur = () => {
    setIsEditing(false);
    setTitle(document.querySelector(".toolbar input").value)
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
  onSave: PropTypes.func,
  mdxRef: PropTypes.object
}

export default ToolBar;
