import {Suspense} from 'react';

import {Anton, Roboto} from 'next/font/google';
import localFont from 'next/font/local';

import {Footer} from './src/components/common/Footer';
import Header from './src/components/common/Header';
import Loading from './src/components/loading/Loading';
import Providers from './src/utils/provider';

import type {Metadata} from 'next';

import './globals.css';

const myFont = localFont({
  src: './src/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SwordSupply',
  description: 'Tattoo Ink Shop',
  icons: {
    icon: '/favicon.png',
  },
};
const anton = Anton({subsets: ['latin'], display: 'swap', weight: '400', variable: '--font-anton'});

const roboto = Roboto({subsets: ['latin'], display: 'swap', weight: '400', variable: '--font-roboto'});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body className={`${myFont.className} ${anton.variable} ${roboto.variable} flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <Suspense fallback={<Loading lodingText="로딩 중" />}>
            <div className="w-full h-screen mx-auto flex-1 mb-32">{children}</div>
          </Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
