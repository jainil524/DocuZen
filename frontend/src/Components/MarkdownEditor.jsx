import {
    MDXEditor,

    headingsPlugin,
    listsPlugin,
    tablePlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    sandpackPlugin,
    codeMirrorPlugin,
    codeBlockPlugin,
    diffSourcePlugin,
    linkPlugin,
    linkDialogPlugin,

    InsertCodeBlock,
    InsertSandpack,
    InsertImage,
    InsertTable,
    UndoRedo,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    CodeToggle,
    CreateLink,
    DiffSourceToggleWrapper,
    ConditionalContents,
    ChangeCodeMirrorLanguage,
    ShowSandpackInfo
} from '@mdxeditor/editor';
import PropTypes from 'prop-types';
import '@mdxeditor/editor/style.css';

import { useRef } from 'react';

function MarkdownEditor({ markDownText }) {

    const MDXEditorRef = useRef(null);

    const defaultSnippetContent = `
            export default function App() {
            return (
                <div className="App">
                <h1>Hello CodeSandbox</h1>
                <h2>Start editing to see some magic happen!</h2>
                </div>
            );
            }
            `.trim()

    const simpleSandpackConfig = {
        defaultPreset: 'react',
        presets: [
            {
                label: 'React',
                name: 'react',
                meta: 'live react',
                sandpackTemplate: 'react',
                sandpackTheme: 'light',
                snippetFileName: '/App.js',
                snippetLanguage: 'jsx',
                initialSnippetContent: defaultSnippetContent
            },
        ]
    }
    return (
        <div className='markDown'>
            <button onClick={() => console.log(MDXEditorRef.current?.getMarkdown())}>Get Text</button>

            <MDXEditor
                ref={MDXEditorRef}
                markdown={markDownText}
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    markdownShortcutPlugin(),
                    tablePlugin(),
                    linkPlugin(),
                    linkDialogPlugin(),
                    diffSourcePlugin({ diffMarkdown: '', viewMode: 'rich-text' }),
                    // the default code block language to insert when the user clicks the "insert code block" button
                    codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                    sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                    codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                <ConditionalContents
                                    options={[
                                        { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                                        { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                                        {
                                            fallback: () => (<>
                                                <InsertCodeBlock />
                                                <InsertSandpack />
                                            </>)
                                        }
                                    ]}
                                />
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                <BlockTypeSelect />
                                <CodeToggle />
                                <CreateLink />
                                <InsertImage />
                                <InsertTable />
                                <DiffSourceToggleWrapper>
                                </DiffSourceToggleWrapper>
                            </>
                        )
                    })
                ]}
            />
        </div>
    );
}

MarkdownEditor.propTypes = {
    markDownText: PropTypes.string.isRequired
}

export default MarkdownEditor;
