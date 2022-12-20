import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { SelectedItemContext } from 'contexts/SelectedItem';
import { ItemCRUDContext } from 'contexts/ItemCRUD';
import { RightClickMenuContext } from 'contexts/RightClickMenu';

import { File, Chevron, Board, Pencil } from 'assets/icons';

interface FileButtonProps {
    id: string;
    label: string;
    parentLabel: string;
}

const FileButton: FunctionComponent<FileButtonProps> = (props: FileButtonProps) => {
    const { id, label, parentLabel } = props;

    const [iconColour, setIconColour] = useState('');
    const [buttonType, setButtonType] = useState('');

    const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);
    const { setSelectedCRUDType, setSelectedItem: setSelectedCRUDItem } = useContext(ItemCRUDContext);
    const { setCoords, setIsOpen } = useContext(RightClickMenuContext);

    const { id: selectedItemId = '' } = selectedItem;

    const router = useRouter();

    const { projectId = '' } = router.query as { projectId: string };

    useEffect(() => {
        switch (parentLabel) {
            case 'Boards': setIconColour('text-accent-yellow'); setButtonType('board'); break;
            case 'Files': setIconColour('text-accent-green'); setButtonType('file'); break;
            case 'Drawings': setIconColour('text-secondary-purple'); setButtonType('drawing'); break;
            default: setIconColour('text-accent-yellow');
        }
    }, [parentLabel]);

    const onClickHandler = () => {
        setSelectedItem({
            id,
            type: buttonType,
        });

        router.push({
            pathname: `/project/${projectId}`,
            query: {
                selectedItemId: id,
                selectedItemType: buttonType,
            },
        });
    };

    const renderIcon = () => {
        switch (parentLabel) {
            case 'Boards': return <Board className={`text-xl ${selectedItemId === id ? iconColour : 'text-secondary-grey'}`} />;
            case 'Files': return <File className={`text-xl ${selectedItemId === id ? iconColour : 'text-secondary-grey'}`} />;
            case 'Drawings': return <Pencil className={`text-xl ${selectedItemId === id ? iconColour : 'text-secondary-grey'}`} />;
            default: return <Board className={`text-xl ${selectedItemId === id ? iconColour : 'text-secondary-grey'}`} />;
        }
    };

    return (
        <button
            onClick={onClickHandler}
            onContextMenu={(e) => {
                e.preventDefault();
                setCoords({
                    x: e.clientX,
                    y: e.clientY,
                });
                setSelectedCRUDType(buttonType);
                setSelectedCRUDItem({ id, name: label });
                setIsOpen(true);
            }}
            className='flex items-center w-full gap-2 p-2 px-4 transition-colors duration-150 text-md hover:bg-primary-light whitespace-nowrap'
        >
            <Chevron
                className='text-transparent'
            />

            {renderIcon()}

            <p className={`${selectedItemId === id ? 'text-secondary-white' : 'text-secondary-grey'}`}>
                {label}
            </p>
        </button>
    );
};

export default FileButton;
