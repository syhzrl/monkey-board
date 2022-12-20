import React, { FunctionComponent, useContext } from 'react';
import { useRouter } from 'next/router';

import { SelectedItemContext } from 'contexts/SelectedItem';

import { File, Chevron, Board, Pencil } from 'assets/icons';

interface FileButtonProps {
    id: string;
    label: string;
    parentLabel: string;
}

const FileButton: FunctionComponent<FileButtonProps> = (props: FileButtonProps) => {
    const { id, label, parentLabel } = props;

    const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

    const { id: selectedItemId = '' } = selectedItem;

    const router = useRouter();

    const { projectId = '' } = router.query as { projectId: string };

    const onClickHandler = () => {
        let type = '';

        switch (parentLabel) {
            case 'Boards': type = 'board'; break;
            case 'Files': type = 'file'; break;
            case 'Drawings': type = 'drawing'; break;
            default: type = ''; break;
        }

        setSelectedItem({
            id,
            type,
        });

        router.push({
            pathname: `/project/${projectId}`,
            query: {
                selectedItemId: id,
                selectedItemType: type,
            },
        });
    };

    const renderIcon = () => {
        switch (parentLabel) {
            case 'Boards': return <Board className='text-xl' />;
            case 'Files': return <File className='text-xl' />;
            case 'Drawings': return <Pencil className='text-xl' />;
            default: return <Board className='text-xl' />;
        }
    };

    return (
        <button
            onClick={onClickHandler}
            className='flex items-center w-full gap-2 p-2 px-4 text-md'
        >
            <Chevron
                className='text-transparent'
            />

            {renderIcon()}

            <p className={`${selectedItemId === id ? 'text-accent-yellow' : 'text-white'}`}>
                {label}
            </p>
        </button>
    );
};

export default FileButton;
