import React, { FunctionComponent, useState } from 'react';
import { Boards, Files, Drawings } from '@prisma/client';

import { Chevron, Folder } from 'assets/icons';

import FileButton from './FileButton';

interface FolderButtonProps {
    folderLabel: string;
    files: Boards[] | Files[] | Drawings[];
}

const FolderButton: FunctionComponent<FolderButtonProps> = (props: FolderButtonProps) => {
    const { folderLabel, files } = props;

    const [showFiles, setShowFiles] = useState(true);

    return (
        <div className='flex flex-col w-full'>
            <button
                onClick={() => setShowFiles(!showFiles)}
                className='flex items-center w-full gap-2 p-2 px-4 text-md text-secondary-grey'
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
                    {files.map((item) => {
                        const { id, name } = item;
                        return (
                            <FileButton
                                key={id}
                                id={id}
                                label={name}
                                parentLabel={folderLabel}
                            />
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default FolderButton;
