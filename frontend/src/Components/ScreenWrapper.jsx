import { useState, useRef, useCallback, useEffect } from 'react';
import MarkdownEditor from './MarkdownEditor';
import CodeEditor from './CodeEditor';
import ToolBar from './ToolBar/ToolBar';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';


export default function ScreenWrapper({ doc }) {
    const [editorRef, setEditorRef] = useState(null);
    const [mdxRef, setMDXRef] = useState(null);
    const [markdownText, setMarkdownText] = useState("");
    const cookies = new Cookies();

    useEffect(() => {
        if (doc.length != 0) {
            let markdownContent = doc.data.Document.documentContent;
            markdownContent = markdownContent.replaceAll("```json", "\n\n```json");
            mdxRef?.current.insertMarkdown(markdownContent);
            mdxRef?.current.setMarkdown(markdownContent);
            editorRef?.current.getModel().setValue(doc.data.Document.referedCode)
        }
        else {
            mdxRef?.current.insertMarkdown("");
            mdxRef?.current.setMarkdown("");
            editorRef?.current.getModel().setValue("")
        }
    }, [doc])

    // State to manage column widths
    const [leftColumnWidth, setLeftColumnWidth] = useState(50);
    const [rightColumnWidth, setRightColumnWidth] = useState(50);

    // Ref for the resizer
    const resizerRef = useRef(null);

    // Mouse move handler to adjust column width
    const handleMouseMove = useCallback((e) => {
        const newLeftWidth = ((e.clientX / window.innerWidth) * 100);
        console.log(newLeftWidth);

        const newRightWidth = 100 - newLeftWidth;

        setLeftColumnWidth(newLeftWidth);
        setRightColumnWidth(newRightWidth);
    }, []);

    // Mouse down handler to start resizing
    const handleMouseDown = useCallback(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    // Mouse up handler to stop resizing
    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    // Memoize the generateDocument function
    const generateDocument = useCallback((data) => {
        data = JSON.parse(data);
        let markdown = data.data.markdownContent;

        // Ensure MDXRef is available before calling its method
        if (mdxRef && mdxRef.current) {
            mdxRef.current.insertMarkdown(markdown);
            mdxRef.current.setMarkdown(markdown);
            setMarkdownText(markdown);
        }
    }, [mdxRef]);

    const handleSave = (async (title) => {
        const token = cookies.get('token') || localStorage.getItem("token");

        let response = await fetch(`${import.meta.env.VITE_REQUEST_TO_URL}/api/projects/create-document`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                documentName: title,
                documentContent: mdxRef.current.getMarkdown(),
                referedCode: editorRef.current.getValue()
            })
        });

        let result = await response.json();

        return result;
    });

    return (
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <ToolBar mdxRef={mdxRef} onSave={handleSave} />
            <div className="screen-wrapper" style={{ display: 'grid', gap: "0", background: "#1e1e1e", gridTemplateColumns: `${leftColumnWidth}% ${resizerRef.current ? 'auto' : '0px'} ${rightColumnWidth}%`, gridAutoFlow: "column", height: 'calc(100% - 5.2%)' }}>
                <CodeEditor genDoc={generateDocument} setEditorRef={setEditorRef} />
                <div
                    className='resizer'
                    style={{ cursor: "ew-resize", background: "#1e1e1e", width: '5px', }}
                    ref={resizerRef}
                    onMouseDown={handleMouseDown}
                ></div>
                <MarkdownEditor setMDXRef={setMDXRef} markDownText={markdownText} />
            </div>
        </div>
    );
}

ScreenWrapper.propTypes = {
    doc: PropTypes.array
}