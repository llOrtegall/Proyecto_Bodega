// TODO: Librerías externas
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'

import { MovimientoDetalle } from './pages/Movimientos/MovimientoDetalle.jsx'
import { CrearMovimiento } from './pages/Movimientos/CrearMovimiento.jsx'
import { VerMovimientos } from './pages/Movimientos/VerMovimientos.jsx'
import { AsignarItemBodega } from './pages/Items/AsignarItemBodega.jsx'
import { AsignarSimcards } from './pages/Simcards/AsignarSimcards.jsx'
import { DetalleBodega } from './pages/Bodegas/DetallesBodegas.jsx'
import { CreatedBodega } from './pages/Bodegas/CreatedBodega.jsx'
import { CrearSimcard } from './pages/Simcards/CrearSimcard.jsx'
import { Movimientos } from './pages/Simcards/Movimientos.jsx'
import { VerSimcards } from './pages/Simcards/VerSimcards.jsx'
import { CreatedItems } from './pages/Items/CreatedItems.jsx'
import { LoginForm } from './pages/Login/LoginForm.jsx'
import { Bodegas } from './pages/Bodegas/Bodegas.jsx'
import { Items } from './pages/Items/Items.jsx'
import { Home } from './pages/Home.jsx'

import { getCookie, GetUserCookie } from './utils/funtions.js'
import { useAuth } from './Auth/AuthContext.jsx'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const RolUser = user.rol
  if (RolUser !== 'Analista Desarrollo') {
    return <Navigate to='/home' />
  }
  return children
}

export function App () {
  const { login, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = getCookie('bodega')
    if (token) {
      GetUserCookie(token).then(user => {
        login(user)
      }).catch(() => {
        logout()
      })
    } else {
      logout()
    }
  }, [])

  return (
    <Routes>

      <Route path="/login" element={<LoginForm />} />

      <Route path="/home" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path='stock/*'>

        <Route path="movimientos/*" element={<Layout />}>
          <Route index element={<VerMovimientos />} />
          <Route path="detalle/:id" element={<MovimientoDetalle />} />
        </Route>

        <Route path='bodegas/*' element={<Layout />}>
          <Route index element={<Bodegas />} />
          <Route path="detalle/:id" element={<DetalleBodega />} />
          <Route path="crearBodegas" element={<ProtectedRoute><CreatedBodega /></ProtectedRoute>} />
          <Route path='crearMovimientos' element={<ProtectedRoute><CrearMovimiento /></ProtectedRoute>} />
        </Route>

        <Route path='items/*' element={<Layout />}>
          <Route index element={<Items />} />
          <Route path="crearItems" element={<ProtectedRoute><CreatedItems /></ProtectedRoute>} />
          <Route path="asignarItems" element={<ProtectedRoute><AsignarItemBodega /></ProtectedRoute>} />
        </Route>

        <Route path='simcards/*' element={<Layout />}>
          <Route index element={<VerSimcards />} />
          <Route path="crearSimcards" element={<ProtectedRoute><CrearSimcard /></ProtectedRoute>} />
          <Route path="asignarSimcards" element={<ProtectedRoute><AsignarSimcards /></ProtectedRoute>} />
          <Route path="movimientosSimcards" element={<ProtectedRoute><Movimientos /></ProtectedRoute>} />
        </Route>

      </Route>

      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}
