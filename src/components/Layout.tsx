import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}
