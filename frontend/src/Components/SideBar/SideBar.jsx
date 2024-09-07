import { useContext, useEffect, useState } from 'react';
import {
  FaHistory,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import './SideBar.css'; // Optional: Add your custom styles here
import fetchDocHistory from '../../functionality/fetchDocumentHistory';
import openDoc from '../../functionality/openDocument';
import { DocumentContext } from '../Provider/DocumentProvider';

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const { setDocumentation, setCode, setHistory, history } = useContext(DocumentContext);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const newDoc = () => {
    setDocumentation("");
    setCode("//Enter Your API code here...");
  }

  useEffect(() => {
    const fetchData = async () => {
      const historyData = await fetchDocHistory();
      setHistory(historyData);
    }

    fetchData();
  }, [setHistory]);

  const changeDocumentContent = async (doc) => {
    const data = await openDoc(doc.documentId);

    let markdownContent = data.data.Document.documentContent;
    markdownContent = markdownContent.replaceAll("```json", "\n\n```json");

    setDocumentation(markdownContent);
    setCode(data.data.Document.referedCode);
  }

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className="sidebar-header" onClick={toggleCollapse}>
        <img src='/public/favicon1/favicon-16x16.png' />
        <b style={{ display: `${isCollapsed ? "none" : "block"}` }}>DocuZen</b>
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_iconCarrier">
            <path d="M4 18L20 18" stroke="#fff" strokeWidth="2" strokeLinecap="round"></path>
            <path d="M4 12L20 12" stroke="#fff" strokeWidth="2" strokeLinecap="round"></path>
            <path d="M4 6L20 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"></path>
          </g>
        </svg>
      </div>
      <div className={`sidebar-menu ${isCollapsed ? 'hidden' : 'visible'}`}>

        <div className="sidebar-item" onClick={newDoc}>
          <span className="item-text">New Document</span>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-item" onClick={toggleHistory}>
            <FaHistory />
            <span className="item-text">Documents</span>
            {isHistoryOpen ? <FaChevronUp className="collapse-icon" /> : <FaChevronDown className="collapse-icon" />}
          </div>
          <div className="history-content">
            {isHistoryOpen && (
              history.length > 0
                ?
                (
                  history.map((doc) => (
                    <div key={doc.documentId} onClick={() => { changeDocumentContent(doc) }} data-doc-id={doc.documentId}>
                      <span>
                        {doc.documentName}
                      </span>
                    </div>
                  ))
                )
                :
                <div>No document created</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};


export default SideBar;
