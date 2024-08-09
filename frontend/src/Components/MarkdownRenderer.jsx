import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types'; // Corrected import

const MarkdownRenderer = ({ markdownText }) => {
    return (
        <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownText}
            </ReactMarkdown>
        </div>
    );
};

// Corrected propTypes definition
MarkdownRenderer.propTypes = {
    markdownText: PropTypes.string.isRequired
};

export default MarkdownRenderer;
