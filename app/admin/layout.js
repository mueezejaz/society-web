"use client"
import { AdminSidebar } from "../components/adminsideBar"
export default function UserLayout({ children }) {

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar/>
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  )
}