import { useEffect, useState } from 'react';
import '@/App.css'
import NoteImage from "@/assets/note.svg";
import Header from '@/components/organisms/header';
import Sidebar from '@/components/organisms/sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { useLayout } from '@/provider/layoutProvider';
import type { PageType } from '@/util/paging';
import useDiaryController from './controller/diaryController';
import { FormattedMessage } from 'react-intl';
import { ProtectedRoute } from './components/atoms/protectedRouter';


function App() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const layoutData = useLayout();
  const location = useLocation();

  const fetchDiaryData = useDiaryController(state => state.fetchData);

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    layoutData.setCurrentPage(path as PageType || "home");
  }, [location]);

  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
      const loadData = async () => {
          try {
              await fetchDiaryData();
          } catch (err) {
              console.error(err);
              setLoadError(true);
          } finally {
              setLoading(false);
          }
      };

      loadData();
  }, [location]);

  return (
      <div className="md:h-[calc(100vh-60px)] flex">
        <Header isExpanded={() => isExpanded} setIsExtended={setIsExpanded}/>
        <Sidebar isExpanded={() => isExpanded} setIsExtended={setIsExpanded}/>
        <main className={`flex-1 mt-10 w-full lg:ml-24 ${isExpanded && 'lg:ml-70'} text-left`}>
          {
            loadError ? <div><FormattedMessage id="page_load_error" /></div> :
            loading ? <img className="absolute left-1/2 top-1/2 -translate-x-1/3 -translate-y-1/2 pointer-events-none size-64" src={NoteImage}/> : <Outlet/>
          }
        </main>
      </div>
  )
}

export default App
