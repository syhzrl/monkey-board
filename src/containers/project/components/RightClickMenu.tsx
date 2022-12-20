import React, { FunctionComponent, useContext, useRef } from 'react';
import { Delete, Edit } from 'assets/icons';

import { RightClickMenuContext } from 'contexts/RightClickMenu';
import { ItemCRUDContext } from 'contexts/ItemCRUD';

import useDetectClickOutside from 'hooks/useDetectClickOutside';

const RightClickMenu: FunctionComponent = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { coords, isOpen, setIsOpen } = useContext(RightClickMenuContext);
    const { setIsEditModalOpen, setIsDeleteModalOpen } = useContext(ItemCRUDContext);

    const { x, y } = coords;

    useDetectClickOutside(ref, () => setIsOpen(false));

    const editClickHandler = (isEdit: boolean) => {
        if (isEdit) {
            setIsEditModalOpen(true);
        } else {
            setIsDeleteModalOpen(true);
        }
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div
            ref={ref}
            style={{ top: y, left: x }}
            className='fixed flex flex-col items-center justify-center bg-primary-light text-secondary-grey border border-line rounded-md w-[150px]'
        >
            <button
                onClick={() => editClickHandler(true)}
                className='flex items-center justify-between w-full gap-4 p-2 px-4 transition-colors duration-150 group hover:bg-line'
            >
                <p>
                    Edit
                </p>

                <Edit className='text-xl transition-colors duration-150 group-hover:text-accent-orange' />
            </button>

            <button
                onClick={() => editClickHandler(false)}
                className='flex items-center justify-between w-full gap-4 p-2 px-4 transition-colors duration-150 group hover:bg-line'
            >
                <p>
                    Delete
                </p>

                <Delete className='text-xl transition-colors duration-150 group-hover:text-red-800' />
            </button>
        </div>
    );
};

export default RightClickMenu;
