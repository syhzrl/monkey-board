import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

import { trpc } from 'utils/trpc';

import Spinner from 'components/Spinner';

import editorTheme from './editorTheme';
import CodeHighlighterPlugin from './plugins/CodeHighlighterPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import FileDataPlugin from './plugins/FileDataPlugin';

const LexicalEditor: FC = () => {
    const [fileName, setFileName] = useState('File Name');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState('');

    const router = useRouter();
    const { selectedItemId = '' } = router.query as { selectedItemId: string };

    const { data, isLoading, error: getFileDataError } = trpc.files.getFileData.useQuery({ fileId: selectedItemId });

    const editorConfig = {
        editorState: null,
        theme: editorTheme,
        namespace: 'something',
        onError(error: Error) {
            throw error;
        },
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            AutoLinkNode,
            LinkNode,
        ],
    };

    useEffect(() => {
        if (data) {
            const { name } = data;
            setFileName(name);
        }
    }, [data]);

    const renderErrorOrSpinner = () => {
        if (isLoading || updateLoading) {
            return (
                <div className='w-[40px] h-[40px]'>
                    <Spinner />
                </div>
            );
        }

        if (getFileDataError || updateError) {
            return (
                <p>
                    {updateError || getFileDataError?.shape?.frontEndMessage}
                </p>
            );
        }

        return null;
    };

    return (
        <div className='flex flex-col items-center justify-center flex-1 w-full gap-4 mt-10 mb-4'>
            <div className='flex w-[80%] items-center justify-between gap-4 bg-primary-med p-4 rounded-md'>
                <h1 className='text-5xl font-bold text-secondary-purple'>
                    {fileName}
                </h1>

                {renderErrorOrSpinner()}
            </div>

            <LexicalComposer initialConfig={editorConfig}>
                <div className='w-[80%] flex flex-col flex-1 bg-primary-med rounded-md'>
                    <ToolbarPlugin />
                    <div className='relative w-full h-fit'>
                        <RichTextPlugin
                            contentEditable={<ContentEditable className='editor-input' />}
                            placeholder={<div />}
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <AutoFocusPlugin />
                        <ListPlugin />
                        <LinkPlugin />
                        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                        <FileDataPlugin
                            fileData={data}
                            setUpdateLoading={setUpdateLoading}
                            setUpdateError={setUpdateError}
                        />
                        <CodeHighlighterPlugin />
                        <AutoFocusPlugin />
                    </div>
                </div>
            </LexicalComposer>
        </div>
    );
};

export default LexicalEditor;
