import React from 'react';
import DailyPlanner from './components/DailyPlanner';
import QuickLinks from './components/QuickLinks';

function App() {
  return (
    <div className="min-h-screen bg-[#0e1016] px-4 md:px-12 py-6">
      <div className="max-w-[1600px] mx-auto h-screen flex flex-col lg:flex-row gap-10 items-stretch">
        {/* Daily Planning Section - 70% width */}
        <div className="flex-[7] min-w-0 flex flex-col">
          <DailyPlanner />
        </div>
        {/* Quick Links Section - 30% width */}
        <div className="flex-[3] min-w-0 flex flex-col">
          <QuickLinks />
        </div>
      </div>
    </div>
  );
}

export default App; 