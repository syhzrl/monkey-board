import React, { createContext, useState, FunctionComponent, useMemo, Dispatch, SetStateAction } from 'react';

interface RightClickMenuInterface {
    coords: {
        x: number;
        y: number;
    }
    setCoords: Dispatch<SetStateAction<{ x: number, y: number }>>;

    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const initialState: RightClickMenuInterface = {
    coords: {
        x: 0,
        y: 0,
    },
    setCoords: () => null,

    isOpen: false,
    setIsOpen: () => null,
};

export const RightClickMenuContext = createContext<RightClickMenuInterface>(initialState);

interface RightClickMenuProviderProps {
    children: React.ReactNode;
}

const RightClickMenuProvider: FunctionComponent<RightClickMenuProviderProps> = (props: RightClickMenuProviderProps) => {
    const { children } = props;

    const [coords, setCoords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [isOpen, setIsOpen] = useState(false);

    const memoValue: RightClickMenuInterface = useMemo(() => ({
        coords,
        setCoords,
        isOpen,
        setIsOpen,
    }), [
        coords,
        setCoords,
        isOpen,
        setIsOpen,
    ]);

    return (
        <RightClickMenuContext.Provider value={memoValue}>
            {children}
        </RightClickMenuContext.Provider>
    );
};

export default RightClickMenuProvider;
