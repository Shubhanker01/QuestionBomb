import { useState } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarGroupContent,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuGroup } from "../dropdown-menu"
import { Home, Atom, Stone, Bomb, ChevronDown, LogOutIcon } from 'lucide-react'
import { useSidebar } from "@/components/ui/sidebar"
import { NavLink } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useProvider } from "@/provider/userProvider"
import { Button } from "../button"
import LogoutDialog from "../Dialog box/LogoutDialog"

function AppSidebar({ userId }: any) {
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)
    const { user }: any = useProvider()
    const { state } = useSidebar()

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
                                <h2 className="text-sm">{user?.name}</h2>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button className="p-2 ml-2" variant="ghost" size="sm">
                                        <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onSelect={() => setShowLogoutDialog(true)}>
                                            <LogOutIcon className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    </SidebarFooter>
                </SidebarContent>

            </Sidebar>
            <LogoutDialog
                open={showLogoutDialog}
                onOpenChange={setShowLogoutDialog}
            />
        </div>
    )
}

export default AppSidebar