import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { trpc } from 'utils/trpc';

import Spinner from 'components/Spinner';

const Loader: FunctionComponent = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-4'>
            <div className='w-[200px] h-[200px]'>
                <Spinner />
            </div>

            <p className='text-secondary-grey'>
                Initializing Excalidraw
            </p>
        </div>

    );
};

const Draw: FunctionComponent = () => {
    const DrawingBoard = dynamic(
        () => import('./components/DrawingBoard'),
        {
            ssr: true,
            loading: Loader,
        },
    );

    const router = useRouter();
    const { selectedItemId = '' } = router.query as { selectedItemId: string };

    // TODO Add loading and error handling here
    const { data } = trpc.drawings.getDrawingData.useQuery({ drawingId: selectedItemId });

    return (
        <div className='flex flex-col items-center justify-center flex-1'>
            <DrawingBoard
                drawingId={data?.id || ''}
                drawingData={data?.data || ''}
            />
        </div>
    );
};

export default Draw;
