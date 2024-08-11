import React, { useEffect, useCallback } from 'react';
import MarkdownEditor from './MarkdownEditor';
import CodeEditor from './CodeEditor';


export default function ScreenWrapper() {
    const [EditorRef, setEditorRef] = React.useState(null);
    const [MDXRef, setMDXRef] = React.useState(null);
    const [markdownText, setMarkdownText] = React.useState("");

    // Memoize the generateDocument function
    const generateDocument = useCallback((data) => {
        data = JSON.parse(data);

        let markdown = data.data.markdownContent;

        // Ensure MDXRef is available before calling its method
        if (MDXRef && MDXRef.current) {
            MDXRef.current.insertMarkdown(markdown);
            MDXRef.current.setMarkdown(markdown);
            setMarkdownText(markdown);
        }
    }, [MDXRef]);


    return (
        <div className="screen-wrapper" style={{ display: 'grid', gap: "1rem", gridTemplateColumns: "50% 50%", gridAutoFlow: "column"}}>
            <CodeEditor genDoc={generateDocument} setEditorRef={setEditorRef} />
            <MarkdownEditor setMDXRef={setMDXRef} markDownText={markdownText} />
        </div>
    );
}