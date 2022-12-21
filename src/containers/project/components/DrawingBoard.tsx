import React, { FunctionComponent, useCallback } from 'react';
import { Excalidraw, getSceneVersion } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import debounce from 'lodash.debounce';

import { trpc } from 'utils/trpc';

interface DrawingBoardProps {
    drawingId: string;
    drawingData: string;
}

const DrawingBoard: FunctionComponent<DrawingBoardProps> = (props: DrawingBoardProps) => {
    const { drawingData, drawingId } = props;

    const setInitialData = () => {
        if (drawingData) {
            return JSON.parse(drawingData);
        }

        return [];
    };

    // TODO Add loading and error handling here
    const { mutate } = trpc.drawings.updateDrawingData.useMutation();

    const updateDrawingData = (elements: readonly ExcalidrawElement[]) => {
        mutate({ data: JSON.stringify(elements), id: drawingId });
    };

    const debouncedUpdateHandler = debounce(updateDrawingData, 300, { leading: false });

    const debouncedCallback = useCallback((elements: readonly ExcalidrawElement[]) => {
        // This if statements make it so that ur drawings doesnt get resetted when u exit the file
        if (elements.length > 0 && getSceneVersion(elements) !== getSceneVersion((setInitialData()))) {
            debouncedUpdateHandler(elements);
        }
    }, []);

    return (
        <Excalidraw
            initialData={{
                elements: setInitialData(),
                appState: { viewBackgroundColor: '#fff', currentItemFontFamily: 1, theme: 'dark' },
            }}
            onChange={debouncedCallback}
        />
    );
};

export default DrawingBoard;
