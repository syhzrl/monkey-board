import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { Boards, Files, Drawings } from '@prisma/client';
import { useRouter } from 'next/router';

import { ItemCRUDContext } from 'contexts/ItemCRUD';
import { SelectedItemContext } from 'contexts/SelectedItem';
import { RightClickMenuContext } from 'contexts/RightClickMenu';

import { Board, File, Pencil, Plus } from 'assets/icons';

interface DashboardColumnProps {
    type: string;
    data: Boards[] | Files[] | Drawings[];
}

const DashboardColumn: FunctionComponent<DashboardColumnProps> = (props: DashboardColumnProps) => {
    const { type, data } = props;

    const [buttonHoverColour, setButtonHoverColour] = useState('');
    const [columnLabel, setColumnLabel] = useState('');

    const { setIsCreateModalOpen, setSelectedCRUDType, setSelectedItem: setSelectedCRUDItem } = useContext(ItemCRUDContext);
    const { setSelectedItem } = useContext(SelectedItemContext);
    const { setCoords, setIsOpen } = useContext(RightClickMenuContext);

    const router = useRouter();

    const { projectId = '' } = router.query as { projectId: string };

    useEffect(() => {
        switch (type) {
            case 'board': setColumnLabel('Boards'); setButtonHoverColour('hover:text-accent-yellow'); break;
            case 'file': setColumnLabel('Files'); setButtonHoverColour('hover:text-accent-green'); break;
            case 'drawing': setColumnLabel('Drawings'); setButtonHoverColour('hover:text-secondary-purple'); break;
            default:
        }
    }, [type]);

    const createClickHandler = () => {
        setSelectedCRUDType(type);
        setIsCreateModalOpen(true);
    };

    const itemClickHandler = (itemId: string) => {
        setSelectedItem({
            id: itemId,
            type,
        });

        router.push({ pathname: `/project/${projectId}`, query: { selectedItemId: itemId, selectedItemType: type } });
    };

    const renderIcon = () => {
        switch (type) {
            case 'board': return <Board className='text-8xl text-inherit' />;
            case 'file': return <File className='text-8xl text-inherit' />;
            case 'drawing': return <Pencil className='text-8xl text-inherit' />;
            default: return <Board className='text-8xl text-inherit' />;
        }
    };

    return (
        <div className='flex flex-col gap-2 mb-12'>
            <h2 className='text-xl text-white'>
                {columnLabel}
            </h2>

            <div className='w-full mb-2 border-b border-b-line' />

            <div className='flex flex-wrap gap-6'>
                {data.map((item) => {
                    const { id, name } = item;
                    return (
                        <button
                            key={id}
                            onClick={() => itemClickHandler(id)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setCoords({
                                    x: e.clientX,
                                    y: e.clientY,
                                });
                                setSelectedCRUDType(type);
                                setSelectedCRUDItem({ id, name });
                                setIsOpen(true);
                            }}
                            className={`flex flex-col gap-1 transition-colors duration-150 ${buttonHoverColour} focus:outline-none`}
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
