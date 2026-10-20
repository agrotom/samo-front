import { useEffect, useState } from 'react';
import '@/App.css'
import Header from '@/components/organisms/header';
import Sidebar from '@/components/organisms/sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { useLayout } from '@/provider/layoutProvider';
import type { PageType } from '@/interfaces/paging';
import useDiaryController from './controller/diaryController';
import { FormattedMessage } from 'react-intl';
import Spinner from './components/atoms/spinner';
import useTrackersController from './controller/trackersController';
import useRitesController from './controller/ritesController';
import useStarsController from './controller/starsController';
import useHappyBlockController from './controller/happyBlockController';
import useObjectivesController from './controller/objectivesController';
import useGlobalController from './controller/globalController';
import useListsController from './controller/listsController';


function App() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const layoutData = useLayout();
  const location = useLocation();

  const fetchDiaryData = useDiaryController(state => state.fetchData);
  const fetchTrackers = useTrackersController(state => state.fetchData);
  const fetchRites = useRitesController(state => state.fetchData);
  const fetchTodayDeeds = useStarsController(state => state.fetchData);
  const fetchHappy = useHappyBlockController(state => state.fetchData);
  const fetchObjectives = useObjectivesController(state => state.fetchData);
  const fetchLists = useListsController(state => state.fetchData);

  const allowModifying = useGlobalController(state => state.allowModifying);

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    layoutData.setCurrentPage(path as PageType || "home");
  }, [location]);

  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
      const loadData = async () => {
          try {
            var today = new Date();

            allowModifying(true);

            if (import.meta.env.VITE_NO_AUTH_MODE === "true") {
              console.warn("Running in NO AUTH MODE - data will not be loaded from server");
              return;
            }

            await fetchDiaryData(today);
            await fetchTrackers(today);
            await fetchRites(today);
            await fetchTodayDeeds(today);
            await fetchHappy(today);
            await fetchObjectives();
            await fetchLists();
          } catch (err) {
              setLoadError(true);
          } finally {
              setLoading(false);
          }
      };

      loadData();
  }, [location]);

  useEffect(() => {
    (async () => {
      allowModifying(layoutData.diaryDate.getDate() == new Date().getDate());
      
      await fetchDiaryData(layoutData.diaryDate);
      await fetchRites(layoutData.diaryDate);
      await fetchTodayDeeds(layoutData.diaryDate);
      await fetchHappy(layoutData.diaryDate);
    })();
  }, [layoutData.diaryDate]);

  return (
      <div className="md:h-[calc(100vh-60px)] flex">
        <Header isExpanded={() => isExpanded} setIsExtended={setIsExpanded}/>
        <Sidebar isExpanded={() => isExpanded} setIsExtended={setIsExpanded}/>
        <main className={`flex-1 pt-10 w-full lg:pl-24 ${isExpanded && 'lg:pl-70'} text-left min-w-0 h-full overflow-x-hidden overflow-y-hidden`}>
          {
            loadError ? <div><FormattedMessage id="page_load_error" /></div> :
            loading ? <Spinner classNames={{ container: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" }} /> : <Outlet/>
          }
        </main>
      </div>
  )
}

export default App
