import React, { FunctionComponent } from 'react';

import { Caret } from 'assets/icons';

import FolderButton from './FolderButton';

import { ModuleType } from '../entities/tabs';

const SideMenu: FunctionComponent = () => {
    return (
        <div className='flex flex-col items-center w-[15%] sticky top-0 h-screen border-r border-r-line'>
            <div className='flex items-center w-full gap-2 p-2 px-4 border-b border-b-line h-fit'>
                <Caret
                    height={12}
                    width={12}
                />

                <p>
                    Project Name
                </p>
            </div>

            <FolderButton
                folderLabel='Boards'
                files={[
                    {
                        label: 'Board 1',
                        type: ModuleType.board,
                    }, {
                        label: 'Board 2',
                        type: ModuleType.board,
                    },
                ]}
            />

            <FolderButton
                folderLabel='Files'
                files={[
                    {
                        label: 'File 1',
                        type: ModuleType.file,
                    },
                ]}
            />

            <FolderButton
                folderLabel='Drawings'
                files={[]}
            />
        </div>
    );
};

export default SideMenu;
