import { StrictMode } from 'react'

import { LayoutProvider } from '@/provider/layoutProvider'
import SamoRouter from './samoRouter'

export default function Layout() {
    return (
        <StrictMode>
            <LayoutProvider>
                <SamoRouter/>
            </LayoutProvider>
        </StrictMode>
    )
}