import React, { FunctionComponent, useContext, MouseEvent } from 'react';
import { useRouter } from 'next/router';

import { TabsContext } from 'contexts/Tabs';
import { ModuleType, Tab } from '../entities/tabs';

const TopBar: FunctionComponent = () => {
    const { openedTabs, setOpenedTabs, setSelectedTab, selectedTab } = useContext(TabsContext);

    const router = useRouter();

    const { projectId = '' } = router.query as { projectId: string };

    console.log(router.query);

    const onMiddleClickHandler = (event: MouseEvent, clickedTab: Tab) => {
        const { button } = event;

        if (button === 1) {
            event.preventDefault();

            const filteredTabs = openedTabs.filter(item => item !== clickedTab);
            const indexOfClosedTab = openedTabs.indexOf(clickedTab);

            setOpenedTabs(filteredTabs);

            // // If you close a tab using the top bar while ure on a file, it will default to the first opened file just like in vscode
            if (filteredTabs.length > 0) {
                setSelectedTab(indexOfClosedTab > 0 ? openedTabs[0] : openedTabs[1]);
            } else {
                setSelectedTab({
                    label: '',
                    type: ModuleType.none,
                });
                router.replace(`/project/${projectId}`);
            }
        }
    };

    if (openedTabs.length < 1) return null;

    return (
        <div className='sticky top-0 w-full border-b border-b-line bg-primary-med'>
            {openedTabs.map(tab => {
                return (
                    <button
                        key={tab.label}
                        onAuxClick={(e) => onMiddleClickHandler(e, tab)}
                        onClick={() => setSelectedTab(tab)}
                        className={`p-2 px-6 border-r border-r-line ${selectedTab.label === tab.label ? 'text-accent-yellow' : 'text-white'}`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};

export default TopBar;
