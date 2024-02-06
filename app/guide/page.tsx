import React from 'react';

import GuideSection from '../src/components/guide/GuideSection';

function Page() {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-20 gap-20">
      <h3 className="text-3xl font-semibold">주문 방법</h3>
      <GuideSection />
    </div>
  );
}

export default Page;
