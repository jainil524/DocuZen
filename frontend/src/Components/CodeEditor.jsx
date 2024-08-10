import React, { useEffect, useRef } from 'react';


import Editor from '@monaco-editor/react';
import '../Css/CodeEditor.css';

export default function CodeEditor({genDoc, setEditorRef}) {
  const editorRef = useRef(null);

  useEffect(() => {
    setEditorRef(editorRef.current);
  }, [editorRef]);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  const GenerateDocument = async () => {
    const result = await fetch("http://localhost:3000/api/projects/generate-document",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          code: editorRef.current.getValue()
        }),
      }
    );

    const data = await result.text();
    
    genDoc(data);

  }

  return <div className='codeEditor'>
    <Editor height="100vh" width="50vw" defaultLanguage="javascript" defaultValue="//Enter Your code here..." onMount={handleEditorDidMount} />
    <button style={{ display: "flex", gap: ".4rem", alignItems: "center" }} className='generate-doc-btn' onClick={GenerateDocument}> <img width="18px" height="18px" src="/public/ai-technology.png" /> Generate Document</button>
  </div>
}