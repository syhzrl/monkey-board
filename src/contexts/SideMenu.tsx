import React, { createContext, useState, FunctionComponent, useMemo, Dispatch } from 'react';
import { Boards, Files, Drawings } from '@prisma/client';

interface SideMenuInterface {
    boardsData: Boards[];
    setBoardsData: Dispatch<React.SetStateAction<Boards[]>>;

    filesData: Files[];
    setFilesData: Dispatch<React.SetStateAction<Files[]>>;

    drawingsData: Drawings[];
    setDrawingsData: Dispatch<React.SetStateAction<Drawings[]>>;
}

const initialState: SideMenuInterface = {
    boardsData: [],
    setBoardsData: () => null,

    filesData: [],
    setFilesData: () => null,

    drawingsData: [],
    setDrawingsData: () => null,

};

export const SideMenuContext = createContext<SideMenuInterface>(initialState);

interface SideMenuProviderProps {
    children: React.ReactNode;
}

const SideMenuProvider: FunctionComponent<SideMenuProviderProps> = (props: SideMenuProviderProps) => {
    const { children } = props;

    const [boardsData, setBoardsData] = useState<Boards[]>([]);
    const [filesData, setFilesData] = useState<Files[]>([]);
    const [drawingsData, setDrawingsData] = useState<Drawings[]>([]);

    const memoValue: SideMenuInterface = useMemo(() => ({
        boardsData,
        setBoardsData,
        filesData,
        setFilesData,
        drawingsData,
        setDrawingsData,
    }), [
        boardsData,
        setBoardsData,
        filesData,
        setFilesData,
        drawingsData,
        setDrawingsData,
    ]);

    return (
        <SideMenuContext.Provider value={memoValue}>
            {children}
        </SideMenuContext.Provider>
    );
};

export default SideMenuProvider;
