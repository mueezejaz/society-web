"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Shield,
    Users,
    IndianRupee,
    Bell,
    MessageSquare,
    FileText,
    Settings,
    BarChart3,
    Menu,
    LogOut,
} from "lucide-react"


export function AdminSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = () => {
        console.log("logout")
    }

    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: BarChart3, href: "/admin/dashboard" },
        { id: "residents", label: "Residents", icon: Users, href: "/admin/residents" },
        { id: "payments", label: "Payments", icon: IndianRupee, href: "/admin/payments" },
        { id: "notifications", label: "Notifications", icon: Bell, href: "/admin/notifications" },
        { id: "complaints", label: "Complaints", icon: MessageSquare, href: "/admin/complaints" },
        { id: "reports", label: "Reports", icon: FileText, href: "/admin/reports" },
        { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
    ]

    const handleNavigation = (href) => {
        router.push(href)
        setSidebarOpen(false)
    }

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                    <div>
                        <h2 className="font-semibold text-sm sm:text-base">Admin Portal</h2>
                        <p className="text-xs sm:text-sm text-gray-600">Society Management</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-3 sm:p-4">
                <ul className="space-y-1 sm:space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleNavigation(item.href)}
                                    className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg text-left transition-colors text-sm sm:text-base ${isActive ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                                    <span className="truncate">{item.label}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="p-3 sm:p-4 border-t">
                <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent text-sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </Button>
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <div className={`hidden lg:flex w-64 bg-white shadow-lg border-r `}>
                <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="lg:hidden p-2">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        </>
    )
}
