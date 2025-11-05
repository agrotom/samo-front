import App from '@/App.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Diary from '@/components/pages/diary'
import Home from '@/components/pages/home'
import Goals from './goals'
import NotFound from './notfound'
import SignIn from './signin'
import { IntlProvider } from 'react-intl'
import { useLayout } from '@/provider/layoutProvider'
import { messages } from '@/i18n/messages'
import { LOCALES } from '@/i18n/locales'
import SignTemplate from '../templates/signTemplate'
import { useEffect } from 'react'

export default function SamoRouter() {

    const layoutData = useLayout();

    useEffect(() => {
        layoutData.setLocale("ru-RU");
        document.documentElement?.setAttribute("data-theme", !layoutData.isDaily && layoutData.currentPage === "diary" ? "dark" : "light");
    });

    return (
        <IntlProvider messages={ messages[layoutData.locale] } locale={ layoutData.locale } defaultLocale={ LOCALES.ENGLISH }>
            <Router>
                <Routes>
                    <Route element={<App/>}>
                        <Route path="/" element={<Home/>} />
                        <Route path="/home" element={<Home/>} />
                        <Route path="/diary" element={<Diary/>} />
                        <Route path="/objectives" element={<Goals/>} />
                        <Route path="/lists" element={<Diary/>} />
                        <Route path="/totals" element={<NotFound/>} />
                        <Route path="/settings" element={<Diary/>} />
                    </Route>
                    <Route element={ <SignTemplate /> }>
                        <Route path="/signin" element={<SignIn/>} />
                        <Route path="/signup" element={<Home/>} />
                    </Route>
                </Routes>
            </Router>
        </IntlProvider>
    );
}