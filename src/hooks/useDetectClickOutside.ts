import { RefObject, useEffect } from 'react';

const useDetectClickOutside = (ref: RefObject<HTMLDivElement>, callback: (state: boolean) => void): void => {
    useEffect(() => {
        const handleClick = (event: Event) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(false);
            }
        };

        const hideDropdownKeyboardHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                callback(false);
            }
        };

        document.addEventListener('click', handleClick, true);
        document.addEventListener('keydown', hideDropdownKeyboardHandler, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
            document.addEventListener('keydown', hideDropdownKeyboardHandler, true);
        };
    }, [ref, callback]);
};

export default useDetectClickOutside;
