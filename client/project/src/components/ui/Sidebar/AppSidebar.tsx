import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarGroupContent,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar"
import { Home, Atom, Stone, Bomb } from 'lucide-react'
import { useSidebar } from "@/components/ui/sidebar"
import { NavLink } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGoogleAuth } from '@/hooks/useGoogleAuth'

function AppSidebar({ userId }: any) {
    const { state } = useSidebar()
    const { user } = useGoogleAuth()
    const menuItems = [
        {
            title: "Home",
            icon: Home,
            path: "/"
        },
        {
            title: "Science",
            icon: Atom,
            path: "/science"
        },
        {
            title: "Geography",
            icon: Stone,
            path: "/geography"
        }
    ]

    const isCollapsed = state === "collapsed"
    return (
        <div className='bg-slate-800 text-slate-200'>
            <Sidebar className="bg-slate-800 text-slate-200" collapsible='icon'>
                <SidebarHeader className="flex flex-row border-b border-zinc-800 bg-slate-800 p-4" >
                    <div>
                        <Bomb className="h-7 w-7 text-red-500 shrink-0" />
                    </div>
                    <div>
                        {!isCollapsed && (
                            <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                                }`}>
                                <h2 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-linear-to-r from-red-500 to-amber-500">
                                    QUESTIONBOMB
                                </h2>

                                <p className="text-xs text-muted-foreground">
                                    Your place for practice
                                </p>
                            </div>
                        )}
                    </div>

                </SidebarHeader>
                <SidebarContent className='bg-slate-800 text-slate-100'>
                    <SidebarContent>

                        <SidebarGroup>
                            <SidebarGroupContent>

                                <SidebarMenu>

                                    {menuItems.map((item) => {

                                        const to =
                                            item.path === ""
                                                ? `/main-app/${userId}`
                                                : `/main-app/${userId}/${item.path}`;

                                        return (
                                            <SidebarMenuItem key={item.title}>

                                                <SidebarMenuButton asChild>

                                                    <NavLink
                                                        to={to}
                                                        end={item.path === ""}
                                                        className={({ isActive }) =>
                                                            isActive
                                                                ? "bg-indigo-600 text-white rounded-md"
                                                                : ""
                                                        }
                                                    >
                                                        <item.icon size={18} />
                                                        <span>{item.title}</span>
                                                    </NavLink>

                                                </SidebarMenuButton>

                                            </SidebarMenuItem>
                                        );
                                    })}

                                </SidebarMenu>

                            </SidebarGroupContent>

                        </SidebarGroup>

                    </SidebarContent>
                    <SidebarFooter >
                        <div className='flex flex-row items-center'>
                            <div>
                                <Avatar>
                                    <AvatarImage src={user?.avatar} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="justify-end ml-4">
                                <h2>{user?.name}</h2>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                    </SidebarFooter>
                </SidebarContent>

            </Sidebar>
        </div>
    )
}

export default AppSidebar