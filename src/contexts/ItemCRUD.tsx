import React, { createContext, useState, FunctionComponent, useMemo } from 'react';
import { ModuleType } from '../entities/tabs';

interface ItemCRUDInterface {
    selectedItemType: ModuleType;
    setSelectedItemType: React.Dispatch<React.SetStateAction<ModuleType>>;

    isCreateModalOpen: boolean;
    setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

    currentProjectDetailsId: string;
    setCurrentProjectDetailsId: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: ItemCRUDInterface = {
    selectedItemType: ModuleType.none,
    setSelectedItemType: () => null,

    isCreateModalOpen: false,
    setIsCreateModalOpen: () => null,

    currentProjectDetailsId: '',
    setCurrentProjectDetailsId: () => null,
};

export const ItemCRUDContext = createContext<ItemCRUDInterface>(initialState);

interface ItemCRUDProviderProps {
    children: React.ReactNode;
}

const ItemCRUDProvider: FunctionComponent<ItemCRUDProviderProps> = (props: ItemCRUDProviderProps) => {
    const { children } = props;

    const [selectedItemType, setSelectedItemType] = useState(ModuleType.none);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentProjectDetailsId, setCurrentProjectDetailsId] = useState('');

    const memoValue: ItemCRUDInterface = useMemo(() => ({
        selectedItemType,
        setSelectedItemType,
        isCreateModalOpen,
        setIsCreateModalOpen,
        currentProjectDetailsId,
        setCurrentProjectDetailsId,
    }), [
        selectedItemType,
        setSelectedItemType,
        isCreateModalOpen,
        setIsCreateModalOpen,
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
