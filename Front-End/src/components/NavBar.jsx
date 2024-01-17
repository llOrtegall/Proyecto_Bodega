import { CloseSessionIcon, HomeIcon, LockIcon, LoginIcon, UsvgDownIcon } from './Icons'
import { useAuth } from '../Auth/AuthContext.jsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const links1 = [
  { to: '/stock/bodegas', text: 'Ver Bodegas' },
  { to: '/stock/bodegas/crearBodegas', text: 'Crear Bodega' },
  { to: '/stock/bodegas/crearMovimientos', text: 'Crear Movimiento' }
]

const links2 = [
  { to: '/stock/items', text: 'Ver Artículos' },
  { to: '/stock/items/crearItems', text: 'Crear Items' },
  { to: '/stock/items/asignarItems', text: 'Asig. Item Bodega' }
]

const links3 = [
  { to: '/stock/simcards', text: 'Ver Simcards' },
  { to: '/stock/simcards/crearSimcards', text: 'Crear Simcard' },
  { to: '/stock/simcards/asignarSimcards', text: 'Asig. SIM Bodega' },
  { to: '/stock/simcards/movimientosSimcards', text: 'Crear Movimiento SIM' }
]

export function RenderLockIcon ({ rol }) {
  console.log(rol)
  return (
    rol === 'Analista Desarrollo'
      ? (<div></div>)
      : (<LockIcon />)
  )
}

export function NavBar () {
  const [activeArticles, setActiveArticles] = useState(false)
  const [activeMovements, setActiveMovements] = useState(false)
  const [activeSimcards, setActiveSimcards] = useState(false)

  const { logout, user } = useAuth()

  const UserExist = user.auth

  const handleClosesession = () => {
    logout()
  }

  const handleClickSimcards = (event) => {
    event.stopPropagation()
    setActiveSimcards(!activeSimcards)
    setActiveMovements(false)
    setActiveArticles(false)
  }

  const handleClickArticles = (event) => {
    event.stopPropagation()
    setActiveArticles(!activeArticles)
    setActiveMovements(false)
    setActiveSimcards(false)
  }

  const handleClickMovements = (event) => {
    event.stopPropagation()
    setActiveMovements(!activeMovements)
    setActiveArticles(false)
    setActiveSimcards(false)
  }

  const handleClickOutside = () => {
    setActiveArticles(false)
    setActiveMovements(false)
    setActiveSimcards(false)
  }

  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (

    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* //TODO: logo Gane */}
        <Link to="/home">
          <img src="../../public/gane.png" className="h-8" alt="Logo" />
        </Link>

        <section className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

            <Link to="/home" title='Inicio App' className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white md:dark:hover:text-blue-500">
              <HomeIcon />
            </Link>

            <li className='flex gap-2'>

              <Link to="/stock/movimientos">
                <button className="relative flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                  Movimientos
                </button>
              </Link>

              <button className="relative flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent" onClick={handleClickArticles}>Artículos <UsvgDownIcon />
                {/* // !! Dropdown menu --> */}
                {
                  activeArticles && (
                    <section className="absolute -bottom-36 -right-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                        {
                          links2.map(link => (
                            <Link to={link.to} key={link.to} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                              {link.text}
                              {/* <RenderLockIcon rol={RolUser} /> */}
                            </Link>
                          ))
                        }
                      </ul>
                    </section>
                  )
                }
              </button>

              <button className="relative flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent" onClick={handleClickMovements}>Bodegas <UsvgDownIcon />
                {/* // !! Dropdown menu --> */}
                {
                  activeMovements && (
                    <section className="absolute -bottom-36 -right-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                        {
                          links1.map(link => (
                            <Link to={link.to} key={link.to} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                              {link.text}
                            </Link>
                          ))
                        }
                      </ul>
                    </section>
                  )
                }
              </button>

              <button className="relative flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent" onClick={handleClickSimcards}>Simcards <UsvgDownIcon />
                {/* // !! Dropdown menu --> */}
                {
                  activeSimcards && (
                    <section className="absolute -bottom-44 -right-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                        {
                          links3.map(link => (
                            <Link to={link.to} key={link.to} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                              {link.text}
                            </Link>
                          ))
                        }
                      </ul>
                    </section>
                  )
                }
              </button>

              {
                UserExist === true
                  ? (
                    <section onClick={handleClosesession} className="cursor-pointer block ml-4 py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white md:dark:hover:text-blue-500" title='Cerrar Sesión'>
                      <CloseSessionIcon />
                    </section>
                    )
                  : (
                    <section onClick={handleClosesession} className="cursor-pointer block ml-4 py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white md:dark:hover:text-blue-500" title='Iniciar Session'>
                      <LoginIcon />
                    </section>
                    )
              }

            </li>
          </ul>
        </section>
      </div>
    </nav>
  )
}
