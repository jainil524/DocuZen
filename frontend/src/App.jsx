import MarkdownEditor from './Components/MarkdownEditor';
import CodeEditor from './Components/CodeEditor';
import './App.css';

const markdownText = ``;

const App = () => {
  return (
    <div className="App">
      <div>
        <CodeEditor />
      </div>
      <MarkdownEditor markDownText={markdownText} />
    </div>
  );
};

export default App;
