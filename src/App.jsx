// TODO: Librerías externas
import { Routes, Route, useNavigate } from 'react-router-dom'
import { VerMovimientos } from './pages/Movimientos/VerMovimientos.jsx'
import { VerSimcards } from './pages/Simcards/VerSimcards.jsx'
import { Bodegas } from './pages/Bodegas/Bodegas.jsx'
import { CrearMovimiento } from './pages/Movimientos/CrearMovimiento.jsx'
import { Items } from './pages/Items/Items.jsx'
import { Home } from './pages/Home.jsx'

import { CreatedItems } from './pages/Items/CreatedItems.jsx'
import { AsignarItemBodega } from './pages/Items/AsignarItemBodega.jsx'

import { AsignarSimcards } from './pages/Simcards/AsignarSimcards.jsx'
import { CrearSimcard } from './pages/Simcards/CrearSimcard.jsx'
import {Movimientos } from './pages/Simcards/Movimientos.jsx'

import { CreatedBodega } from './pages/Bodegas/CreatedBodega.jsx'

import { Layout } from './components/Layout.jsx'
import { LoginForm } from './pages/Login/LoginForm.jsx'

import { ProtectdeRoutes } from './Auth/components/ProtectedRoutes.jsx'
import { useAuth } from './Auth/AuthContext.jsx'
import axios from 'axios'
import { useEffect } from 'react'
import { GetUserCookie, getCookie } from './utils/funtions.js'

axios.defaults.baseURL = 'http://localhost:3000/'

export function App () {
  const { login, logout, loggedIn, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = getCookie('bodega')
    if (token) {
      GetUserCookie(token).then(user => {
        login(user)
        navigate('/bodega/home')
      }).catch(() => {
        logout()
      })
    } else {
      logout()
    }
  }, [])

  return (
    <Routes>

      <Route path='/bodega/login' element={<LoginForm fun={login} />} />

      <Route element={<ProtectdeRoutes isAllowed={loggedIn} redirectTo='bodega/login' />} >
        <Route path='/bodega/*' element={<Layout />} >
          <Route path='home' element={<Home fun={logout} />} />
          <Route path='stock/movimientos' element={<VerMovimientos fun={logout} />} />
          <Route path="stock/items" element={<Items fun={logout} />} />
          <Route path="stock/bodegas" element={<Bodegas fun={logout} />} />
          <Route path='stock/simcards' element={<VerSimcards fun={logout} />} />
        </Route>
      </Route>

      <Route element={<ProtectdeRoutes isAllowed={!!loggedIn && user.rol === 'Analista Desarrollo'} redirectTo='/bodega/home' />} >
        <Route path='/bodega/stock/items/*' element={<Layout />} >
          <Route path='crearItems' element={<CreatedItems fun={logout} />} />
          <Route path='asignarItems' element={<AsignarItemBodega fun={logout} />} />
        </Route>
      </Route>

      <Route element={<ProtectdeRoutes isAllowed={!!loggedIn && user.rol === 'Analista Desarrollo'} redirectTo='/bodega/home' />} >
        <Route path='/bodega/stock/simcards/*' element={<Layout />} >
          <Route path='crearSimcards' element={<AsignarSimcards fun={logout} />} />
          <Route path='asignarSimcards' element={<CrearSimcard fun={logout} />} />
        </Route>
      </Route>

      <Route element={<ProtectdeRoutes isAllowed={!!loggedIn && user.rol === 'Analista Desarrollo'} redirectTo='/bodega/home' />} >
        <Route path='/bodega/stock/bodegas/*' element={<Layout />} >
          <Route path='crearBodegas' element={<CreatedBodega fun={logout} />} />
        </Route>
      </Route>

      <Route element={<ProtectdeRoutes isAllowed={!!loggedIn && user.rol === 'Analista Desarrollo' | 'Coordinador Soporte' } redirectTo='/bodega/home' />} >
        <Route path='/bodega/stock/*' element={<Layout />} >
          <Route path='simcards/movimientosSimcards' element={<Movimientos fun={logout} />} />
          <Route path='bodegas/crearMovimientos' element={<CrearMovimiento fun={logout} />} />
        </Route>
      </Route>

    </Routes>
  )
}
