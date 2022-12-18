import React, { FunctionComponent, useContext } from 'react';
import { File, Chevron } from 'assets/icons';

import { TabsContext } from 'contexts/Tabs';
import { ModuleType, Tab } from '../entities/tabs';

interface FileButtonProps {
    label: string;
    type: ModuleType;
}

const FileButton: FunctionComponent<FileButtonProps> = (props: FileButtonProps) => {
    const { label, type } = props;

    const { setOpenedTabs, setSelectedTab, selectedTab } = useContext(TabsContext);

    const onClickHandler = () => {
        setSelectedTab({ label, type });
        setOpenedTabs((prev: Tab[]) => {
            if (prev.find(item => item.label === label)) return prev;
            return [...prev, { label, type }];
        });
    };

    return (
        <button
            onClick={onClickHandler}
            className='flex items-center w-full gap-2 p-2 px-4 text-md'
        >
            <Chevron
                className='text-transparent'
            />

            <File
                className='text-xl'
            />

            <p className={`${selectedTab.label === label ? 'text-accent-yellow' : 'text-white'}`}>
                {label}
            </p>
        </button>
    );
};

export default FileButton;
