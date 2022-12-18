import React, { createContext, useState, FunctionComponent, useMemo } from 'react';
import { ModuleType, Tab } from '../entities/tabs';

interface TabsContextInterface {
    selectedTab: Tab;
    setSelectedTab: React.Dispatch<React.SetStateAction<Tab>>;

    openedTabs: Tab[];
    setOpenedTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
}

const initialState: TabsContextInterface = {
    selectedTab: {
        label: '',
        type: ModuleType.none,
    },
    setSelectedTab: () => null,

    openedTabs: [],
    setOpenedTabs: () => null,
};

export const TabsContext = createContext<TabsContextInterface>(initialState);

interface TabsProviderProps {
    children: React.ReactNode;
}

const TabsProvider: FunctionComponent<TabsProviderProps> = (props: TabsProviderProps) => {
    const { children } = props;

    const [selectedTab, setSelectedTab] = useState<Tab>({
        label: '',
        type: ModuleType.none,
    });

    const [openedTabs, setOpenedTabs] = useState<Tab[]>([]);

    const memoValue: TabsContextInterface = useMemo(() => ({
        selectedTab,
        setSelectedTab,

        openedTabs,
        setOpenedTabs,
    }), [
        selectedTab,
        setSelectedTab,

        openedTabs,
        setOpenedTabs,
    ]);

    return (
        <TabsContext.Provider value={memoValue}>
            {children}
        </TabsContext.Provider>
    );
};

export default TabsProvider;
