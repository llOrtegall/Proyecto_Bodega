import { Navigate, Outlet } from 'react-router-dom'
import { NavBar } from './NavBar.jsx'

export const ProtectdeRoutes = ({ isAllowed, children, redirectTo = '/bodega/login' }) => {
  if (!isAllowed) return <Navigate to={redirectTo} />

  return (
    <section className='relative h-screen'>
      <nav className='absolute z-50 w-full border-gray-200 bg-gray-900'>
        <NavBar />
      </nav>
      <main className='h-full pt-16'>
        {children || <Outlet />}
      </main>
    </section>
  )
}
