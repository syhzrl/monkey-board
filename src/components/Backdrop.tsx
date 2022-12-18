import React, { FunctionComponent, ReactNode } from 'react';

interface Backdrop {
    children: ReactNode;
}

const Backdrop: FunctionComponent<Backdrop> = (props: Backdrop) => {
    const { children } = props;

    return (
        <div className='absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/[40%]'>
            {children}
        </div>
    );
};

export default Backdrop;
