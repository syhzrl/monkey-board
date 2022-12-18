import React, { FunctionComponent } from 'react';

const Spinner: FunctionComponent = () => {
    return (
        <div className='w-full h-full border-4 border-solid rounded-full border-line border-t-secondary-grey animate-spin' />
    );
};

export default Spinner;
