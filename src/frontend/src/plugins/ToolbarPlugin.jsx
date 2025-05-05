import React, { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FaUndo, FaRedo, FaBold, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from 'react-icons/fa';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
} from 'lexical';

// Divider component for toolbar spacing
const Divider = () => <div className="border-l border-gray-300 h-6 mx-2" />;

export default function ToolbarPlugin() {
  // Get the editor context
  const [editor] = useLexicalComposerContext();
  
  // State to manage the status of undo/redo buttons
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  
  // State to track formatting options
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  // Alignment state tracking
  const [isLeftAlign, setIsLeftAlign] = useState(false);
  const [isCenterAlign, setIsCenterAlign] = useState(false);
  const [isRightAlign, setIsRightAlign] = useState(false);
  const [isJustifyAlign, setIsJustifyAlign] = useState(false);

  // Function to update toolbar state based on selection
  const updateToolbar = useCallback(() => {
    const selection = $getSelection(); // Get the current selection
    if ($isRangeSelection(selection)) {
      // Update formatting states based on the selection
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));

      // Get the alignment of the selected node
      const anchorNode = selection.anchor.getNode();
      const parent = anchorNode.getParent();
      const alignment = parent ? parent.getFormatType() : null;

      // Update alignment states based on the alignment type
      setIsLeftAlign(alignment === 'left');
      setIsCenterAlign(alignment === 'center');
      setIsRightAlign(alignment === 'right');
      setIsJustifyAlign(alignment === 'justify');
    }
  }, []);

  // Effect to register the update listener on the editor
  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(updateToolbar); // Call updateToolbar to sync formatting states
    });
  }, [editor, updateToolbar]);

  // Effect to register the undo command
  useEffect(() => {
    return editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload); // Update canUndo state
        return false;
      },
      1,
    );
  }, [editor]);

  // Effect to register the redo command
  useEffect(() => {
    return editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload); // Update canRedo state
        return false;
      },
      1,
    );
  }, [editor]);

  return (
    <div className="flex items-center p-2 bg-gray-100 border-b border-gray-300">
      {/* Undo button */}
      <button
        disabled={!canUndo} // Disable if no undo available
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="p-2 text-gray-700 hover:bg-gray-200 rounded"
        aria-label="Undo"
      >
        <FaUndo />
      </button>
      {/* Redo button */}
      <button
        disabled={!canRedo} // Disable if no redo available
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="p-2 text-gray-700 hover:bg-gray-200 rounded"
        aria-label="Redo"
      >
        <FaRedo />
      </button>
      <Divider />
      {/* Bold button */}
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className={`p-2 ${isBold ? 'font-bold text-navy-600 bg-gray-200' : 'text-gray-700 hover:bg-gray-200'} rounded`}
        aria-label="Bold"
      >
        <FaBold />
      </button>
      {/* Italic button */}
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className={`p-2 ${isItalic ? 'italic text-navy-600 bg-gray-200' : 'text-gray-700 hover:bg-gray-200'} rounded`}
        aria-label="Italic"
      >
        <FaItalic />
      </button>
      {/* Underline button */}
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        className={`p-2 ${isUnderline ? 'underline text-navy-600 bg-gray-200' : 'text-gray-700 hover:bg-gray-200'} rounded`}
        aria-label="Underline"
      >
        <FaUnderline />
      </button>
      {/* Strikethrough button */}
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
        className={`p-2 ${isStrikethrough ? 'line-through text-navy-600 bg-gray-200' : 'text-gray-700 hover:bg-gray-200'} rounded`}
        aria-label="Strikethrough"
      >
        <FaStrikethrough />
      </button>
      <Divider />
      {/* Alignment buttons */}
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
        className={`p-2 ${isLeftAlign ? 'text-navy-600 bg-gray-200' : 'text-gray-700 hover:bg-gray-200'} rounded`}
        aria-label="Align Left"
      >
        <FaAlignLeft />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
        className={`p-2 ${isCenterAlign ? 'text-navy-600 bg-gray-200' : 'text-gray-700 hover:bg-gray-200'} rounded`}
        aria-label="Align Center"
      >
        <FaAlignCenter />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
        className={`p-2 ${isRightAlign ? 'text-navy-600 bg-gray-200' : 'text-gray-700 hover:bg-gray-200'} rounded`}
        aria-label="Align Right"
      >
        <FaAlignRight />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
        className={`p-2 ${isJustifyAlign ? 'text-navy-600 bg-gray-200' : 'text-gray-700 hover:bg-gray-200'} rounded`}
        aria-label="Justify"
      >
        <FaAlignJustify />
      </button>
    </div>
  );
}
