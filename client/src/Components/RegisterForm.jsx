import axios from 'axios'
import { useState } from 'react'

export function RegisterForm () {
  const [names, setNames] = useState('')
  const [lastNames, setLastNames] = useState('')
  const [document, setDocument] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    try {
      const response = await axios.post('/register', { names, lastNames, document })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white w-96 h-2/3 rounded-xl p-12 shadow-2xl relative flex flex-col gap-8 justify-between'>
      <h1 className='text-orange-600 font-bold text-3xl text-center'>ChatBot Validator</h1>
      <br />
      {/* // TODO: usuario */}
      <input type='text' placeholder='Nombres' className='border-b-2 p-2' required onChange={ev => setNames(ev.target.value)} />
      {/* // TODO: contraseña */}
      <input type='text' placeholder='Apellidos' className='border-b-2 p-2' required onChange={ev => setLastNames(ev.target.value)} />
      {/* // TODO: documento */}
      <input type='text' placeholder='N° Documento' className='border-b-2 p-2' required onChange={ev => setDocument(ev.target.value)} />
      <button className='bg-orange-400 w-full rounded-lg p-3 text-white text-sm shadow-md hover:bg-green-100 hover:text-black'>Registrarse</button>
      {/* {errorMessage ? <p className='absolute bottom-24 left-28 text-red-600 font-semibold'>{errorMessage}</p> : null} */}
      <div className='pt-8'>
        <p className='text-xs'>¿Ya Estás Registrado? <span className='font-semibold'>Iniciar Sesión</span></p>
      </div>
      {message ? <p className='absolute bottom-24 left-28 text-red-600 font-semibold'>{message}</p> : null}
    </form>
  )
}
