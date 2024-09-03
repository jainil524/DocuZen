import { createContext, useRef, useState } from "react"
import { PropTypes } from 'prop-types';

export const DocumentContext = createContext();

export default function DocumentProvider({ children }) {
    const [code, setCode] = useState("//Enter Your API code here...");
    const [documentation, setDocumentation] = useState("");
    const mdxRef = useRef(null);
    const editorRef = useRef(null);

    return (
        <DocumentContext.Provider value={{ code, setCode, documentation, setDocumentation, mdxRef, editorRef }}>
            {children}
        </DocumentContext.Provider>
    )
}

DocumentProvider.propTypes = {
    children: PropTypes.element
}