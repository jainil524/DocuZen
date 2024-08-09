import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    toolbarPlugin,
    BlockTypeSelect,
    CodeToggle, InsertFrontmatter,
    CreateLink,
    DiffSourceToggleWrapper, codeBlockPlugin, InsertCodeBlock, InsertSandpack,
    InsertImage, sandpackPlugin, codeMirrorPlugin, ConditionalContents, ChangeCodeMirrorLanguage, ShowSandpackInfo
} from '@mdxeditor/editor';

import '@mdxeditor/editor/style.css';

function MarkdownEditor() {
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
        <MDXEditor
            markdown="# Hello world"
            plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),

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
                            <InsertFrontmatter />
                            <BoldItalicUnderlineToggles />
                            <BlockTypeSelect />
                            <CodeToggle />
                            <CreateLink />
                            <DiffSourceToggleWrapper />
                            <InsertImage />
                        </>
                    )
                })
            ]}
        />
    );
}

export default MarkdownEditor;
