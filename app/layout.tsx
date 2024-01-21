import {Anton, Roboto} from 'next/font/google';
import localFont from 'next/font/local';

import Header from './src/components/common/Header';
import Providers from './src/utils/provider';

import type {Metadata} from 'next';

import './globals.css';

const myFont = localFont({
  src: './src/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
const anton = Anton({subsets: ['latin'], display: 'swap', weight: '400', variable: '--font-anton'});

const roboto = Roboto({subsets: ['latin'], display: 'swap', weight: '400', variable: '--font-roboto'});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body className={`${myFont.className} ${anton.variable} ${roboto.variable}`}>
        <Providers>
          <Header />
          <div className="w-full mx-auto mt-[147px] min-h-[72vh]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}