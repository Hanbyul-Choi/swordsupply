import React from 'react';

import GuideSection from '../guide/GuideSection';

function GuideBanner() {
  return (
    <div className="w-full bg-slate-100 p-10">
      <div className="max-w-[1080px] mx-auto">
        <h3 className="text-start text-4xl font-semibold mb-6 font-roboto">Order Guide</h3>
        <div className="flex">
          <p className="font-anton text-xl">SWORDSUPPLY</p>
          <p className="text-start text-xl">를 이용하는 방법</p>
        </div>
        <GuideSection />
      </div>
    </div>
  );
}

export default GuideBanner;
