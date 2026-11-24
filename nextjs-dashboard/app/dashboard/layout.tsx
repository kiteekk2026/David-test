import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="w-full flex-none md:sticky md:top-0 md:h-screen md:w-64">
        <SideNav />
      </div>
      <div className="min-w-0 grow p-6 md:p-12">{children}</div>
    </div>
  );
}
