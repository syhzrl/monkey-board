import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical/LexicalEditorState';

const LocalStoragePlugin: FC = (): JSX.Element => {
    const [editor] = useLexicalComposerContext();
    // const [serializedEditorState, setSerializedEditorState] = useState<string | null>(null);
    // const [isFirstRender, setIsFirstRender] = useState(true);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender) {
            isFirstRender.current = false;

            // if (serializedEditorState) {
            //     const initialEditorState = editor.parseEditorState(serializedEditorState);
            //     editor.setEditorState(initialEditorState);
            // }

            const initialEditorState = editor.parseEditorState(localStorage.getItem('lexical') || '');
            editor.setEditorState(initialEditorState);
        }
    }, [isFirstRender, editor]);

    const onChange = useCallback(
        (editorState: EditorState) => {
            localStorage.setItem('lexical', (JSON.stringify(editorState.toJSON())));
        },
        [],
    );

    // TODO: add ignoreSelectionChange
    return <OnChangePlugin onChange={onChange} />;
};

export default LocalStoragePlugin;
