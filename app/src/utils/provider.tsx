'use client';

import React from 'react';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {ConfigProvider} from 'antd';

import {OverlayProvider} from '../components/overlay/OverlayProvider';

type Props = {
  children: React.ReactNode;
};

function Providers({children}: Props) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      <OverlayProvider>
        <ConfigProvider
          theme={{
            components: {
              Dropdown: {
                zIndexPopupBase: 2000,
              },
            },
          }}>
          {children}
        </ConfigProvider>
      </OverlayProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
