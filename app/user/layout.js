"use client"
import { Sidebar } from "../components/sideBar.js"
export default function UserLayout({ children }) {

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar/>
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  )
}
