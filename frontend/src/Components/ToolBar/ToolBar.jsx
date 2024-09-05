import { useCallback, useContext, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { saveAs } from 'file-saver';
import { marked } from 'marked';
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import './ToolBar.css';
import { DocumentContext } from '../Provider/DocumentProvider';
import saveDocument from '../../functionality/saveDocument';

const ToolBar = () => {
  const [title, setTitle] = useState('Document_Title');
  const [isEditing, setIsEditing] = useState(false);
  const { mdxRef, editorRef, setHistory } = useContext(DocumentContext);

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

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // Toggle between editable and non-editable state
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle download as MD
  const handleDownloadMD = useCallback(() => {
    const blob = new Blob([mdxRef.current?.getMarkdown()], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, `${title}.md`);
  }, []);

  // Handle download as PDF
  const handleDownloadPDF = () => {
    let markdownContent = mdxRef.current?.getMarkdown();
    markdownContent = markdownContent.replaceAll("```json", "\n");

    const htmlContent = marked(markdownContent);
    const pdfContent = htmlToPdfmake(htmlContent);
    const documentDefinition = { content: pdfContent };
    pdfMake.createPdf(documentDefinition).download('document.pdf');
  };

  // Handle save
  const handleSave = useCallback(async () => {
    let result = await saveDocument(title, mdxRef.current.getMarkdown(), editorRef.current.getValue());
    let markdown = result.data.savedDocument;

    setHistory([...history, [markdown._id, markdown.documentId, markdown.documentName]])
  }, [title]);

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

export default ToolBar;
