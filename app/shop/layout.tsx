import React, {Suspense} from 'react';

import Loading from '../src/components/loading/Loading';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Suspense fallback={<Loading lodingText="발견 콘텐츠 불러오는 중" />}>{children}</Suspense>
    </>
  );
}
