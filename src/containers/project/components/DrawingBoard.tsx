import React, { FunctionComponent, useCallback } from 'react';
import { Excalidraw, getSceneVersion } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import debounce from 'lodash.debounce';

import { trpc } from 'utils/trpc';
import Spinner from 'components/Spinner';

interface DrawingBoardProps {
    drawingId: string;
    drawingData: string;
    queryLoading: boolean;
    queryError: string;
}

const DrawingBoard: FunctionComponent<DrawingBoardProps> = (props: DrawingBoardProps) => {
    const { drawingData, drawingId, queryLoading, queryError } = props;

    const setInitialData = () => {
        if (drawingData) {
            return JSON.parse(drawingData);
        }

        return [];
    };

    // TODO Add loading and error handling here
    const { mutate, isLoading, error } = trpc.drawings.updateDrawingData.useMutation();

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

    const renderErrorOrSpinner = () => {
        if (queryLoading || isLoading) {
            return (
                <div className='w-[30px] h-[30px]'>
                    <Spinner />
                </div>
            );
        }

        if (queryError || error) {
            return (
                <p>
                    {queryError || error?.shape?.frontEndMessage}
                </p>
            );
        }

        return null;
    };

    return (
        <>
            <div className='absolute top-0 right-0 z-50 p-2'>
                {renderErrorOrSpinner()}
            </div>
            <Excalidraw
                initialData={{
                    elements: setInitialData(),
                    appState: { viewBackgroundColor: '#fff', currentItemFontFamily: 1, theme: 'dark' },
                }}
                onChange={debouncedCallback}
            />
        </>
    );
};

export default DrawingBoard;
