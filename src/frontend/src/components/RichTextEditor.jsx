import React, { useEffect, useRef } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import ToolbarPlugin from '../plugins/ToolbarPlugin';
import { TextNode, $getRoot } from 'lexical';
import EditorTheme from '../EditorTheme';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

const editorConfig = {
  theme: EditorTheme,
  nodes: [TextNode],
  onError(error) {
    throw error;
  },
};

// Plugin for handling editor content changes
function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

// Plugin to load styled content in read-only mode
function LoadInitialStatePlugin({ styledText }) {
  const [editor] = useLexicalComposerContext();
  const initialized = useRef(false); // Flag to track if the editor has been initialized

  useEffect(() => {
    if (styledText && !initialized.current) {
      // Parse and set the editor state based on styledText JSON
      const parsedEditorState = editor.parseEditorState(styledText);
      
      // Use editor.update to ensure it's done optimally
      editor.update(() => {
        editor.setEditorState(parsedEditorState);
      });
      initialized.current = true; // Mark the editor as initialized
    }
  }, [editor, styledText]);

  return null;
}

export default function RichTextEditor({
  onContentChange,
  placeholder = "Enter text here...",
  readOnly = false,
  styledText = null,
  height = "h-96", // Default height
  border=true,
}) {
  // Handle editor state changes and pass them up to parent component
  function onChange(editorState) {
    const styled = JSON.stringify(editorState.toJSON());
    // Extract plain text using editorState.read to ensure it's in the proper context
    editorState.read(() => {
      const plainText = $getRoot().getTextContent();
      // Pass both plain and styled content to the parent
      onContentChange({
        plain: plainText,
        styled: styled,
      });
    });
  }

  return (
    <div className={`relative bg-white p-4 rounded-lg ${height} ${
      border ? "border border-navy-500" : ""
    }`}>
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editable: !readOnly,
          //editorState: styledText ? editorConfig.editor.parseEditorState(styledText) : null,
        }}
      >
        <div>
          {!readOnly && <ToolbarPlugin />}
          <div className="relative">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input relative focus:outline-none" />
              }
              placeholder={
                !readOnly ? (
                  <div className="absolute top-0 left-1 text-navy-500 pointer-events-none">
                    {placeholder}
                  </div>
                ) : null
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
        </div>
        {/* allows for undo and redo (only needed on edit*/}
        {!readOnly && <HistoryPlugin />}
        {!readOnly && <MyOnChangePlugin onChange={onChange} />}
        {styledText && <LoadInitialStatePlugin styledText={styledText} />}
      </LexicalComposer>
    </div>
  );
}
