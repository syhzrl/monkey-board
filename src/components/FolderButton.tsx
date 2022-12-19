import React, { FunctionComponent, useState } from 'react';
import { Boards, Files, Drawings } from '@prisma/client';

import { Chevron, Folder } from 'assets/icons';

import FileButton from './FileButton';
import { ModuleType } from '../entities/tabs';

interface FolderButtonProps {
    folderLabel: string;
    files: Boards[] | Files[] | Drawings[];
    type: ModuleType
}

const FolderButton: FunctionComponent<FolderButtonProps> = (props: FolderButtonProps) => {
    const { folderLabel, files, type } = props;
    const [showFiles, setShowFiles] = useState(false);

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
                    {files.map((item) => {
                        const { id, name } = item;
                        return (
                            <FileButton
                                key={id}
                                label={name}
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
