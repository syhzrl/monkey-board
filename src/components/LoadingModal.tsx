import React, { FunctionComponent } from 'react';

import Spinner from 'components/Spinner';

interface LoadingModalProps {
    isOpen: boolean;
    isError: boolean;
    error: string;
}

const LoadingModal: FunctionComponent<LoadingModalProps> = (props: LoadingModalProps) => {
    const { isOpen, isError, error } = props;

    const renderSpinnerOrError = () => {
        if (error) {
            return (
                <p className='text-3xl text-red-800'>
                    {error}
                </p>
            );
        }

        return (
            <div className='w-[150px] h-[150px]'>
                <Spinner />
            </div>
        );
    };

    if (!isOpen && !isError) return null;

    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/[40%]'>
            {renderSpinnerOrError()}
        </div>
    );
};

export default LoadingModal;
