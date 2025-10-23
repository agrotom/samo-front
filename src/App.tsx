import { useEffect, useState } from 'react';
import '@/App.css'
import Header from '@/components/ui/sidebar/header';
import Sidebar from '@/components/ui/sidebar/sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { useLayout } from '@/components/provider/layoutProvider';
import type { PageType } from '@/util/paging';

function App() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const layoutData = useLayout();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    layoutData.setCurrentPage(path as PageType || "home");
  }, [location]);

  useEffect(() => {
      document.documentElement?.classList.toggle('dark', !layoutData.isDaily && layoutData.currentPage === 'diary');
  });

  return (
      <div className="md:h-[calc(100vh-60px)] flex">
        <Header isExpanded={() => isExpanded} setIsExtended={setIsExpanded}/>
        <Sidebar isExpanded={() => isExpanded} setIsExtended={setIsExpanded}/>
        <main className={`flex-1 mt-10 w-full lg:ml-24 ${isExpanded && 'lg:ml-70'} text-left`}>
              <Outlet/>
        </main>
      </div>
  )
}

export default App
