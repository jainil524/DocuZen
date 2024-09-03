import { useContext, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import '../Css/CodeEditor.css';
import GenerateDocument from '../functionality/generateDocument';
import { DocumentContext } from './Provider/DocumentProvider';

export default function CodeEditor() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { editorRef, code, setDocumentation } = useContext(DocumentContext);

  useEffect(() => {
    editorRef?.current?.getModel().setValue(code)
  }, [code, editorRef])

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  const generate = async () => {
    setIsGenerating(true);

    const data = await GenerateDocument(editorRef);
    setDocumentation(data.data.markdownContent);

    setIsGenerating(false);
  }

  return (
    <div className='codeEditor'>
      <Editor
        height="100vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue="//Enter Your API code here..."
        options={{
          minimap: { enabled: false },
          scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
        }}
        onMount={handleEditorDidMount}
      />
      <button style={{ display: "flex", gap: ".4rem", alignItems: "center" }} className='generate-doc-btn' onClick={generate}>
        <img width="18px" height="18px" src="/public/ai-technology.png" />
        {isGenerating ? "Generating..." : "Generate Document"}
      </button>
    </div>
  );
}
