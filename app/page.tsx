import BestSeller from './src/components/main-page/BestSeller';
import ContactUs from './src/components/main-page/ContactUs';
import GuideBanner from './src/components/main-page/GuideBanner';
import MainBanner from './src/components/main-page/MainBanner';

export const revalidate = 0;
export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-10 w-full">
      <MainBanner />
      <BestSeller />
      <GuideBanner />
      <ContactUs />
    </main>
  );
}
