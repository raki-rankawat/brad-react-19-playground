import { NavLink, Outlet, useLocation } from 'react-router'

const Layout = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <header className='bg-violet-800 text-gray-100 p-3 mb-5'>
        <h1 className='text-2xl text-center font-bold uppercase'>
          React 19 Playground
        </h1>
      </header>

      <main className='max-w-2xl mx-auto px-4'>
        {!isHome ? (
          <NavLink to='/' className='font-bold text-blue-800'>
            Back
          </NavLink>
        ) : (
          <div className='text-sm text-center text-gray-500'>
            This is a playground for React 19 and React experimental features.
            This is for learning purposes only.
          </div>
        )}

        <Outlet />
      </main>
    </>
  )
}

export default Layout
