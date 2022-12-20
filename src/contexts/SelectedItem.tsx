import React, { createContext, useState, FunctionComponent, useMemo, Dispatch, SetStateAction } from 'react';

interface SelectedItemInterface {
    selectedItem: {
        id: string;
        type: string;
    }

    setSelectedItem: Dispatch<SetStateAction<{
        id: string;
        type: string;
    }>>;
}

const initialState: SelectedItemInterface = {
    selectedItem: {
        id: '',
        type: '',
    },

    setSelectedItem: () => null,
};

export const SelectedItemContext = createContext<SelectedItemInterface>(initialState);

interface SelectedItemProviderProps {
    children: React.ReactNode;
}

const SelectedItemProvider: FunctionComponent<SelectedItemProviderProps> = (props: SelectedItemProviderProps) => {
    const { children } = props;

    const [selectedItem, setSelectedItem] = useState<{ id: string, type: string }>({ id: '', type: '' });

    const memoValue: SelectedItemInterface = useMemo(() => ({
        selectedItem,
        setSelectedItem,
    }), [
        selectedItem,
        setSelectedItem,
    ]);

    return (
        <SelectedItemContext.Provider value={memoValue}>
            {children}
        </SelectedItemContext.Provider>
    );
};

export default SelectedItemProvider;
