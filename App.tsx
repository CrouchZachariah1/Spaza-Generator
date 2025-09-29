
import React, { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import AlibiGenerator from './components/AlibiGenerator';
import ValidationGenerator from './components/ValidationGenerator';

type ActiveTab = 'alibi' | 'validation';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('alibi');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Header />
        <main>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-8">
            {activeTab === 'alibi' ? <AlibiGenerator /> : <ValidationGenerator />}
          </div>
        </main>
        <footer className="text-center mt-12 text-gray-600 text-xs">
          <p>&copy; 2025 Spaza Generator. KATZCro Product.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
