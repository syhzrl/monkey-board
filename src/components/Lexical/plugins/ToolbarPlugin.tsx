import React, { FC } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { FORMAT_TEXT_COMMAND } from 'lexical';
import { Bold, Code, Italics, TypeStrike, Underline } from 'assets/icons';

const ToolbarPlugin: FC = () => {
    const [editor] = useLexicalComposerContext();

    return (
        <div className='flex items-center justify-start w-full gap-2 p-4 border-b border-b-line'>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                }}
                className='flex items-center justify-center p-2 transition-colors duration-150 rounded-md bg-button-grey text-secondary-grey hover:text-secondary-white'
            >
                <Bold className='text-xl' />
            </button>

            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                }}
                className='flex items-center justify-center p-2 transition-colors duration-150 rounded-md bg-button-grey text-secondary-grey hover:text-secondary-white'
            >
                <Italics className='text-xl' />
            </button>

            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                }}
                className='flex items-center justify-center p-2 transition-colors duration-150 rounded-md bg-button-grey text-secondary-grey hover:text-secondary-white'
            >
                <Underline className='text-xl' />
            </button>

            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
                }}
                className='flex items-center justify-center p-2 transition-colors duration-150 rounded-md bg-button-grey text-secondary-grey hover:text-secondary-white'
            >
                <TypeStrike className='text-xl' />
            </button>

            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
                }}
                className='flex items-center justify-center p-2 transition-colors duration-150 rounded-md bg-button-grey text-secondary-grey hover:text-secondary-white'
            >
                <Code className='text-xl' />
            </button>
        </div>
    );
};

export default ToolbarPlugin;
