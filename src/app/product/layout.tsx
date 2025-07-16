import Footer from '@/components/layout/footer';
import { NavBreadcrumb } from '@/components/nav-breadcrumb';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <NavBreadcrumb />
          </div>
        </header>
        <div className="px-4 pb-4">{children}</div>
      </div>
      <Footer />
    </>
  );
}
