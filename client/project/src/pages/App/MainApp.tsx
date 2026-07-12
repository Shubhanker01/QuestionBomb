
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from '@/components/ui/Sidebar/AppSidebar'
import { useParams } from 'react-router-dom'
import { Outlet } from "react-router-dom"

function MainApp() {
    const { userId } = useParams()
    return (
        <SidebarProvider>
            <AppSidebar userId={userId} />
            <div className='bg-zinc-100 min-h-screen w-full'>
                <main>
                    <SidebarTrigger />
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>

    )
}

export default MainApp