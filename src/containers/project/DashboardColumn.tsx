import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { Boards, Files, Drawings } from '@prisma/client';
import { useRouter } from 'next/router';

import { ItemCRUDContext } from 'contexts/ItemCRUD';
import { TabsContext } from 'contexts/Tabs';

import { Board, File, Pencil, Plus } from 'assets/icons';

import { ModuleType, Tab } from '../../entities/tabs';

interface DashboardColumnProps {
    label: string;
    data: Boards[] | Files[] | Drawings[];
}

const DashboardColumn: FunctionComponent<DashboardColumnProps> = (props: DashboardColumnProps) => {
    const { label, data } = props;

    const [buttonHoverColour, setButtonHoverColour] = useState('');

    const { setSelectedItemType, setIsCreateModalOpen } = useContext(ItemCRUDContext);
    const { setOpenedTabs } = useContext(TabsContext);

    const router = useRouter();

    const { projectId = '' } = router.query as { projectId: string };

    useEffect(() => {
        switch (label) {
            case 'Boards': setButtonHoverColour('hover:text-accent-yellow'); break;
            case 'Files': setButtonHoverColour('hover:text-accent-green'); break;
            case 'Drawings': setButtonHoverColour('hover:text-secondary-purple'); break;
            default:
        }
    }, [label]);

    const createClickHandler = () => {
        switch (label) {
            case 'Boards': setSelectedItemType(ModuleType.board); break;
            case 'Files': setSelectedItemType(ModuleType.file); break;
            case 'Drawings': setSelectedItemType(ModuleType.drawing); break;
            default:
        }

        setIsCreateModalOpen(true);
    };

    const itemClickHandler = (itemId: string) => {
        setOpenedTabs((prev: Tab[]) => {
            let itemType = ModuleType.none;

            switch (label) {
                case 'Boards': itemType = ModuleType.board; break;
                case 'Files': itemType = ModuleType.file; break;
                case 'Drawings': itemType = ModuleType.drawing; break;
                default:
            }

            if (prev.find(item => item.label === label)) return prev;
            return [...prev, { label, type: itemType }];
        });

        router.push(`${projectId}/${itemId}`);
    };

    const renderIcon = () => {
        switch (label) {
            case 'Boards': return <Board className='text-8xl text-inherit' />;
            case 'Files': return <File className='text-8xl text-inherit' />;
            case 'Drawings': return <Pencil className='text-8xl text-inherit' />;
            default: return <Board className='text-8xl text-inherit' />;
        }
    };

    return (
        <div className='flex flex-col gap-2 mb-12'>
            <h2 className='text-xl text-white'>
                {label}
            </h2>

            <div className='w-full mb-2 border-b border-b-line' />

            <div className='flex flex-wrap gap-6'>
                {data.map((item) => {
                    const { id, name } = item;
                    return (
                        <button
                            key={id}
                            // onClick={() => router.push(`${projectId}/${id}`)}
                            onClick={() => itemClickHandler(id)}
                            className={`flex flex-col gap-1 transition-colors duration-150 ${buttonHoverColour}`}
                        >

                            <div className='flex items-center justify-center p-4 border rounded-md border-line'>
                                {renderIcon()}
                            </div>

                            <p>{name}</p>

                        </button>
                    );
                })}

                <button
                    onClick={createClickHandler}
                    className='flex flex-col gap-1 transition-colors duration-150 hover:text-white'
                >
                    <div className='flex items-center justify-center p-4 border rounded-md border-line'>
                        <Plus className='text-8xl text-inherit' />
                    </div>

                    <p>Create new</p>
                </button>
            </div>
        </div>
    );
};

export default DashboardColumn;
