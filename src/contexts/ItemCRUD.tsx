import React, { createContext, useState, FunctionComponent, useMemo } from 'react';

interface ItemCRUDInterface {
    selectedCRUDType: string;
    setSelectedCRUDType: React.Dispatch<React.SetStateAction<string>>;

    selectedItem: { id: string, name: string };
    setSelectedItem: React.Dispatch<React.SetStateAction<{ id: string, name: string }>>;

    isCreateModalOpen: boolean;
    setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

    isEditModalOpen: boolean;
    setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

    currentProjectDetailsId: string;
    setCurrentProjectDetailsId: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: ItemCRUDInterface = {
    selectedCRUDType: '',
    setSelectedCRUDType: () => null,

    selectedItem: { id: '', name: '' },
    setSelectedItem: () => null,

    isCreateModalOpen: false,
    setIsCreateModalOpen: () => null,

    isEditModalOpen: false,
    setIsEditModalOpen: () => null,

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: () => null,

    currentProjectDetailsId: '',
    setCurrentProjectDetailsId: () => null,
};

export const ItemCRUDContext = createContext<ItemCRUDInterface>(initialState);

interface ItemCRUDProviderProps {
    children: React.ReactNode;
}

const ItemCRUDProvider: FunctionComponent<ItemCRUDProviderProps> = (props: ItemCRUDProviderProps) => {
    const { children } = props;

    const [selectedCRUDType, setSelectedCRUDType] = useState('');
    const [selectedItem, setSelectedItem] = useState({ id: '', name: '' });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProjectDetailsId, setCurrentProjectDetailsId] = useState('');

    const memoValue: ItemCRUDInterface = useMemo(() => ({
        selectedCRUDType,
        setSelectedCRUDType,

        selectedItem,
        setSelectedItem,

        isCreateModalOpen,
        setIsCreateModalOpen,

        isEditModalOpen,
        setIsEditModalOpen,

        isDeleteModalOpen,
        setIsDeleteModalOpen,

        currentProjectDetailsId,
        setCurrentProjectDetailsId,
    }), [
        selectedCRUDType,
        setSelectedCRUDType,

        selectedItem,
        setSelectedItem,

        isCreateModalOpen,
        setIsCreateModalOpen,

        isEditModalOpen,
        setIsEditModalOpen,

        isDeleteModalOpen,
        setIsDeleteModalOpen,

        currentProjectDetailsId,
        setCurrentProjectDetailsId,
    ]);

    return (
        <ItemCRUDContext.Provider value={memoValue}>
            {children}
        </ItemCRUDContext.Provider>
    );
};

export default ItemCRUDProvider;
