import Footer from '@/components/layout/footer';
import { NavBreadcrumb } from '@/components/nav-breadcrumb';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full">
        <NavBreadcrumb />
        <div className="mx-8 max-w-2xl py-20 sm:mx-auto">{children}</div>
      </div>
      <Footer />
    </>
  );
}
