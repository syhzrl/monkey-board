import React, { createContext, useState, FunctionComponent, useMemo } from 'react';

interface ItemCRUDInterface {
    selectedCRUDType: string;
    setSelectedCRUDType: React.Dispatch<React.SetStateAction<string>>;

    isCreateModalOpen: boolean;
    setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

    currentProjectDetailsId: string;
    setCurrentProjectDetailsId: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: ItemCRUDInterface = {
    selectedCRUDType: '',
    setSelectedCRUDType: () => null,

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

    const [selectedCRUDType, setSelectedCRUDType] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentProjectDetailsId, setCurrentProjectDetailsId] = useState('');

    const memoValue: ItemCRUDInterface = useMemo(() => ({
        selectedCRUDType,
        setSelectedCRUDType,
        isCreateModalOpen,
        setIsCreateModalOpen,
        currentProjectDetailsId,
        setCurrentProjectDetailsId,
    }), [
        selectedCRUDType,
        setSelectedCRUDType,
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
