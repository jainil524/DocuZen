import React, { useEffect, useCallback } from 'react';
import MarkdownEditor from './MarkdownEditor';
import CodeEditor from './CodeEditor';


export default function ScreenWrapper() {

    const [EditorRef, setEditorRef] = React.useState(null);
    const [MDXRef, setMDXRef] = React.useState(null);
    const [markdownText, setMarkdownText] = React.useState("");

    useEffect(() => {
        console.log(EditorRef, MDXRef);
    }, [EditorRef, MDXRef]);

    // Memoize the generateDocument function
    const generateDocument = useCallback((data) => {
        data = JSON.parse(data);
        console.log(data.data.markdownContent);

        let markdown = data.data.markdownContent;

        console.log(MDXRef, MDXRef.current);
        // Ensure MDXRef is available before calling its method
        if (MDXRef && MDXRef.current) {
            MDXRef.current.insertMarkdown(markdown);
            MDXRef.current.setMarkdown(markdown);
            setMarkdownText(markdown);
        }
    }, [MDXRef]);


    return (
        <div className="screen-wrapper" style={{ display: 'flex', width: "100%" }}>
            <div>
                <CodeEditor genDoc={generateDocument} setEditorRef={setEditorRef} />
            </div>
            <MarkdownEditor setMDXRef={setMDXRef} markDownText={markdownText} />
        </div>
    );
}