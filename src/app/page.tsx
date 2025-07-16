import { ProductCarousel } from '@/components/carousel';
import { ThreeItemGrid } from '@/components/grid/three-items';
import Footer from '@/components/layout/footer';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <div className='flex p-6 px-14 items-center justify-center w-full bg-red-300'>
        <div className="flex w-full bg-amber-400">
          <ProductCarousel />
        </div>
      </div>
      <Footer />
    </>
  );
}
