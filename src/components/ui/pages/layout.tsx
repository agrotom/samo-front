import { StrictMode } from 'react'
import App from '@/App.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Diary from '@/components/ui/pages/diary.tsx'
import Home from '@/components/ui/pages/home.tsx'
import { LayoutProvider } from '@/components/provider/layoutProvider'
import Goals from './goals'

export default function Layout() {
    return (
        <StrictMode>
            <LayoutProvider>
                <Router>
                    <Routes>
                        <Route element={<App/>}>
                        <Route path="/" element={<Home/>} />
                        <Route path="/home" element={<Home/>} />
                        <Route path="/diary" element={<Diary/>} />
                        <Route path="/goals" element={<Goals/>} />
                        <Route path="/lists" element={<Diary/>} />
                        <Route path="/results" element={<Diary/>} />
                        <Route path="/settings" element={<Diary/>} />
                        </Route>
                    </Routes>
                </Router>
            </LayoutProvider>
        </StrictMode>
    )
}