
import React from 'react';

type ActiveTab = 'alibi' | 'validation';

interface TabsProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabStyles = "w-full py-3 px-4 text-center font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-400";
  const activeStyles = "bg-purple-600 text-white shadow-lg";
  const inactiveStyles = "bg-gray-800 text-gray-400 hover:bg-gray-700";

  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-800/50 p-2 rounded-xl border border-gray-700">
      <button
        onClick={() => setActiveTab('alibi')}
        className={`${tabStyles} ${activeTab === 'alibi' ? activeStyles : inactiveStyles}`}
      >
        Craft an Alibi
      </button>
      <button
        onClick={() => setActiveTab('validation')}
        className={`${tabStyles} ${activeTab === 'validation' ? activeStyles : inactiveStyles}`}
      >
        Seek Validation
      </button>
    </div>
  );
};

export default Tabs;
