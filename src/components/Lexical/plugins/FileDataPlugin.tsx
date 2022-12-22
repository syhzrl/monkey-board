import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical/LexicalEditorState';

import { trpc } from 'utils/trpc';
import debounce from 'lodash.debounce';
import { FileDetails } from '@prisma/client';

interface FileDataPluginProps {
    fileData: FileDetails | null | undefined;
    setUpdateLoading: (state: boolean) => void;
    setUpdateError: (err: string) => void;
}

const FileDataPlugin: FC<FileDataPluginProps> = (props: FileDataPluginProps): JSX.Element => {
    const { fileData, setUpdateLoading, setUpdateError } = props;

    const [editor] = useLexicalComposerContext();

    const { mutate: updateFile, isLoading, error } = trpc.files.updateFileData.useMutation();

    const isFirstRender = useRef(true);

    useEffect(() => {
        setUpdateLoading(isLoading);
        setUpdateError(error?.shape?.frontEndMessage || '');
    }, [fileData, isLoading, error]);

    useEffect(() => {
        if (isFirstRender) {
            isFirstRender.current = false;
            if (fileData && fileData.data) {
                const initialEditorState = editor.parseEditorState(fileData.data);
                editor.setEditorState(initialEditorState);
            } else {
                const emptyData = editor.parseEditorState('{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}');
                editor.setEditorState(emptyData);
            }
        }
    }, [isFirstRender, editor, fileData]);

    const onChangeHandler = (onChangeData: string) => {
        if (fileData) {
            updateFile({
                id: fileData.id,
                fileData: onChangeData,
            });
        }
    };

    const debouncedUpdateHandler = debounce(onChangeHandler, 500, { leading: false });

    const onChange = useCallback((editorState: EditorState) => {
        debouncedUpdateHandler(JSON.stringify(editorState.toJSON()));
    }, [fileData]);

    return <OnChangePlugin onChange={onChange} />;
};

export default FileDataPlugin;
