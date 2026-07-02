import Hero from './components/home/hero';
import DeliveryDate from './components/home/deliveryDate';
import PopularProducts from './components/home/popularProducts';
import AboutUsCard from './components/home/aboutUsCard';
import GettingStarted from './components/home/gettingStarted';

import { getCurrentUser } from "@/lib/getUserInfo";

export default async function Home() {
  const { userMetadata, isSignedIn } =
    await getCurrentUser();

  return (
    <div>
      <Hero />

      <DeliveryDate />

      <PopularProducts />

      {(!isSignedIn ||
        userMetadata?.user_metadata?.adminapproval === "false") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <AboutUsCard />
          <GettingStarted />
        </div>
      )}
    </div>
  );
}