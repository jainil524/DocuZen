import Editor from '@monaco-editor/react';

export default function CodeEditor() {
  return <Editor height="100vh" width="50vw" defaultLanguage="javascript" defaultValue="//Enter Your code here..." />;
}