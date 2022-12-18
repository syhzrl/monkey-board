import React, { FunctionComponent, useState } from 'react';
// import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Chevron, Folder } from 'assets/icons';

import FileButton from './FileButton';

import { Tab } from '../entities/tabs';

interface FolderButtonProps {
    folderLabel: string;
    files: Tab[];
}

const FolderButton: FunctionComponent<FolderButtonProps> = (props: FolderButtonProps) => {
    const { folderLabel, files } = props;
    const [showFiles, setShowFiles] = useState(false);

    // const [parent] = useAutoAnimate<HTMLDivElement>();

    return (
        <div className='flex flex-col w-full'>
            <button
                onClick={() => setShowFiles(!showFiles)}
                className='flex items-center w-full gap-2 p-2 px-4 text-md'
            >
                <Chevron
                    className={`text-inherit ${showFiles && 'rotate-90'} transition-transform duration-150`}
                />

                <Folder
                    className='text-lg text-inherit'
                />

                <p className=''>
                    {folderLabel}
                </p>
            </button>

            {showFiles && (
                <>
                    {files.map(item => {
                        const { label, type } = item;
                        return (
                            <FileButton
                                key={label}
                                label={label}
                                type={type}
                            />
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default FolderButton;
