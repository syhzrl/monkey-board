import React, { FunctionComponent, useContext, useRef } from 'react';

import { ItemCRUDContext } from 'contexts/ItemCRUD';

import { trpc } from 'utils/trpc';

import useDetectClickOutside from 'hooks/useDetectClickOutside';

import { Close } from 'assets/icons';

import Spinner from 'components/Spinner';

interface DeleteItemModalProps {
    isOpen: boolean;
    closeModalHandler: (state: boolean) => void;
}

const DeleteItemModal: FunctionComponent<DeleteItemModalProps> = (props: DeleteItemModalProps) => {
    const { isOpen, closeModalHandler } = props;

    const { selectedCRUDType, selectedItem } = useContext(ItemCRUDContext);
    const { id, name } = selectedItem;

    const utils = trpc.useContext();

    const { mutate: deleteBoard, isLoading: isDeleteBoardLoading, error: deleteBoardError } = trpc.boards.deleteBoard.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getProjectDetails.invalidate();
        },
    });

    const { mutate: deleteFile, isLoading: isDeleteFileLoading, error: deleteFileError } = trpc.files.deleteFile.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getProjectDetails.invalidate();
        },
    });

    const { mutate: deleteDrawing, isLoading: isDeleteDrawingLoading, error: deleteDrawingError } = trpc.drawings.deleteDrawing.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getProjectDetails.invalidate();
        },
    });

    const ref = useRef<HTMLDivElement>(null);

    useDetectClickOutside(ref, closeModalHandler);

    const confirmClickHandler = () => {
        const dataToSubmit = {
            id,
        };

        switch (selectedCRUDType) {
            case 'board': deleteBoard(dataToSubmit); break;
            case 'file': deleteFile(dataToSubmit); break;
            case 'drawing': deleteDrawing(dataToSubmit); break;
            default: break;
        }
    };

    const renderError = () => {
        let errorMsg = '';

        if (deleteBoardError) {
            errorMsg = deleteBoardError.shape?.frontEndMessage || '';
        }

        if (deleteFileError) {
            errorMsg = deleteFileError.shape?.frontEndMessage || '';
        }

        if (deleteDrawingError) {
            errorMsg = deleteDrawingError.shape?.frontEndMessage || '';
        }

        return (
            <p className='text-red-800'>
                {errorMsg}
            </p>
        );
    };

    const renderSpinner = () => {
        if (isDeleteBoardLoading || isDeleteFileLoading || isDeleteDrawingLoading) {
            return (
                <div className='w-[40px] h-[40px]'>
                    <Spinner />
                </div>
            );
        }

        return null;
    };

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/[40%]'>
            <div ref={ref} className='p-4 rounded-md w-[40%] h-fit bg-primary-light flex flex-col gap-4 text-secondary-grey'>
                <div className='flex justify-between'>
                    <p>{`Are you sure you want to delete ${name}`}</p>

                    <button
                        onClick={() => closeModalHandler(false)}
                        className='group'
                    >
                        <Close className='transition-colors duration-150 group-hover:text-white' />
                    </button>
                </div>

                {renderError()}

                <div className='flex justify-start gap-4'>
                    <button
                        onClick={confirmClickHandler}
                        className='p-2 px-4 transition-colors duration-150 rounded-md text-accent-green w-fit bg-button-grey hover:bg-button-grey-hover'
                    >
                        <p>Confirm</p>
                    </button>

                    <button
                        onClick={() => closeModalHandler(false)}
                        className='p-2 px-4 transition-colors duration-150 rounded-md text-accent-yellow w-fit bg-button-grey hover:bg-button-grey-hover'
                    >
                        <p>Cancel</p>
                    </button>

                    {renderSpinner()}
                </div>
            </div>
        </div>
    );
};

export default DeleteItemModal;
