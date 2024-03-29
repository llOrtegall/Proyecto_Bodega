import { MessageDisplay } from '../components/MessageDisplay.jsx'
import { getUserByToken } from '../services/FetchItemsData.js'
import { useAuth } from '../Auth/AuthContext.jsx'

import { useState } from 'react'
import axios from 'axios'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('Iniciando Sesión...')
    try {
      const { data: { auth, token } } = await axios.post('/login', { user: username, password })
      localStorage.setItem('tokenBodega', token) // Guarda el token en localStorage con el nombre 'Token'
      const DataUser = await getUserByToken(token)
      login(auth, DataUser)
    } catch (error) {
      console.log(error)
      setMessage('')
      if (error.message === 'Network Error') {
        return setError('Servidor No Disponible y/o Error De Conexión, Consulte Con El Administrador')
      }
      setError(error.response?.data?.message)
    } finally {
      setTimeout(() => {
        setError(null)
        setMessage('')
      }, 5000)
    }
  }
  return (
    <>
      <section className='w-full h-screen flex flex-col items-center justify-center relative bg-gray-900'>

        <form onSubmit={handleSubmit}
          className='flex flex-col w-[450px] h-auto rounded-2xl shadow-2xl px-10 py-10 mb-4 justify-around bg-slate-200'>
          <figure className='mb-12 flex items-center justify-center'>
            <img src="/gane.png" width={180} alt="" />
          </figure>
          <article className='flex flex-col mb-20'>
            <label className='font-semibold mb-2 text-black'>Usuario:</label>
            <input type='text' placeholder='CP1118333444' name='username'
              className='p-2.5 mb-10 rounded-md  text-black' autoComplete='username'
              onChange={ev => setUsername(ev.target.value)} />
            <label className='font-semibold mb-2 text-black'>Contraseña:</label>
            <input type='password' placeholder='**************' autoComplete='current-password'
              className='p-2.5 rounded-md text-black'
              onChange={ev => setPassword(ev.target.value)} />
          </article>
          <button className='bg-blue-500 w-full rounded-lg p-3 text-white font-semibold text-sm shadow-md hover:bg-blue-700 '>Iniciar Sesión</button>

        </form>

        <MessageDisplay message={message} error={error} />

      </section>
    </>

  )
}
