import React, { useEffect, useState } from 'react';
import {
  FaHistory,
  FaFile,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import Cookies from "universal-cookie";
import './Sidebar.css'; // Optional: Add your custom styles here

const SideBar = ({setDoc}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [documentHistory, setDocumentHistory] = useState([]);
  const cookies = new Cookies();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const handleOpenDoc = async (docId)=>{
    let token = cookies.get("token") || localStorage.getItem("token");

    let response = await fetch(`http://localhost:3000/api/projects/getdocwhole`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        documentId: docId
      })
    });

    let result = await response.json();

    console.log(result);
    setDoc(result)
  }

  useEffect(() => {

    let token = cookies.get("token") || localStorage.getItem("token");
    console.log("Token from Cookies: ", token);

    const fetchDocHistory = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/projects/get-all-document", {
          method: "POST",
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        console.log("Fetch result: ", result);
        setDocumentHistory(result.data.Document || []);
      } catch (error) {
        console.error("Error fetching document history: ", error);
      }
    };

    fetchDocHistory();
  }, []);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className="sidebar-header" onClick={toggleCollapse}>
        <img src='/public/favicon1/favicon-16x16.png' />
        {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
      </div>
      <div className={`sidebar-menu ${isCollapsed ? 'hidden' : 'visible'}`}>

        <a href="#create-new" className="sidebar-item">
          <FaFile />
          <span className="item-text">New Document</span>
        </a>

        <div className="sidebar-section">
          <div className="sidebar-item" onClick={toggleHistory}>
            <FaHistory />
            <span className="item-text">History</span>
            {isHistoryOpen ? <FaChevronUp className="collapse-icon" /> : <FaChevronDown className="collapse-icon" />}
          </div>
          {isHistoryOpen && (
            <div className="history-content">
              {
                documentHistory.length > 0
                  ?
                  (
                    documentHistory.map((doc) => (
                      <div key={doc.documentId} onClick={()=> handleOpenDoc(doc.documentId)} data-docId={doc.documentId}>
                        <span>
                          {doc.documentName}
                        </span>
                      </div>
                    ))
                  )
                  :
                  <div>
                    No document created
                  </div>
              }

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SideBar;
