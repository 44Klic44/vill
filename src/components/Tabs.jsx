import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs({ tabs, setSelected, children, selected }) {
  const panels = React.Children.toArray(children); 

  return (
    <div className="w-full px-1 sm:px-0">
      <TabGroup selectedIndex={selected} onChange={setSelected}>
        <TabList className="flex space-x-6 rounded-xl p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.title}
              className={({ selected }) =>
                classNames(
                  'w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white dark:bg-[#1f1f1f]',
                  selected
                    ? 'text-blue-700 dark:text-white border-b-2 border-blue-600'
                    : 'text-gray-800 dark:text-gray-500 hover:text-blue-800'
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </TabList>
        <TabPanels className="w-full mt-2">
          {panels.map((panel, idx) => (
            <TabPanel key={idx}>{panel}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}