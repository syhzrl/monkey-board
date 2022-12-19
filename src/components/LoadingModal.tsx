import React, { FunctionComponent } from 'react';

import Spinner from 'components/Spinner';

interface LoadingModalProps {
    isOpen: boolean;
}

const LoadingModal: FunctionComponent<LoadingModalProps> = (props: LoadingModalProps) => {
    const { isOpen } = props;

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/[40%]'>
            <div className='w-[150px] h-[150px]'>
                <Spinner />
            </div>
        </div>
    );
};

export default LoadingModal;
