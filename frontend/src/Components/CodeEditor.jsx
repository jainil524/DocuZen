import Editor from '@monaco-editor/react';
import '../Css/CodeEditor.css';
import { useRef } from 'react';

export default function CodeEditor() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  const GenerateDocument = async () => {
    const result = await fetch("",
      {
        body: {
          code: editorRef.current.getValue()
        },
      }
    );

    const data = await result.text();
  }

  return <div className='codeEditor'>
    <Editor height="100vh" width="50vw" defaultLanguage="javascript" defaultValue="//Enter Your code here..." onMount={handleEditorDidMount} />
    <button className='generate-doc-btn' onClick={GenerateDocument}>Generate Markdown</button>
  </div>
}