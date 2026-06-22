import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
export default function Index() {
  return (
    <div className="flex flex-col h-screen bg-black">
      <Navbar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
