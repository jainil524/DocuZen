// src/App.js

import MarkdownEditor from './Components/MarkdownEditor';
import CodeEditor from './Components/CodeEditor';

const markdownText = `
`;

const App = () => {
  return (
    <div className="App" style={{ display: 'flex', padding: '0rem 2rem' }}>
      <div>
        <CodeEditor />
      </div>
      <MarkdownEditor markDownText={markdownText} />
    </div>
  );
};

export default App;
