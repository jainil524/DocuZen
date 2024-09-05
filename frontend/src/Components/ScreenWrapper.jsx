import { useState, useRef, useCallback } from 'react';
import MarkdownEditor from './MarkdownEditor';
import CodeEditor from './CodeEditor';
import ToolBar from './ToolBar/ToolBar';

export default function ScreenWrapper() {
    // State to manage column widths
    const [leftColumnWidth, setLeftColumnWidth] = useState(50);
    const [rightColumnWidth, setRightColumnWidth] = useState(50);

    // Ref for the resizer
    const resizerRef = useRef(null);

    // Mouse move handler to adjust column width
    const handleMouseMove = useCallback((e) => {
        const newLeftWidth = ((e.clientX / window.innerWidth) * 100);
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


    return (
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <ToolBar />
            <div className="screen-wrapper"
                style={{
                    display: 'grid',
                    gap: "0",
                    background: "#1e1e1e",
                    gridTemplateColumns: `${leftColumnWidth}% ${resizerRef.current ? 'auto' : '.5rem'} ${rightColumnWidth}%`,
                    gridAutoFlow: "column", height: 'calc(100% - 5.2%)'
                }}>
                <CodeEditor />
                <div
                    className='resizer'
                    style={{ cursor: "ew-resize", background: "#1e1e1e", width: '5px', }}
                    ref={resizerRef}
                    onMouseDown={handleMouseDown}
                ></div>
                <MarkdownEditor />
            </div>
        </div>
    );
}
