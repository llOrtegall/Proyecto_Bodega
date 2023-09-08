import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from './User.context';

export const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext)

  async function LoginUser(ev) {
    ev.preventDefault()
    // TODO: Aqui la respuesta data
    const { data } = await axios.post('/login', { username, password })
    setLoggedInUsername(username);
    setId(data.id)
  }

  return (
    <section className="bg-blue-200 h-screen flex items-center">
      <form className="w-72 mx-auto mb-14" onSubmit={LoginUser}>

        <input value={username} onChange={ev => setUsername(ev.target.value)} type="text" placeholder="Usuario"
          className="block w-full rounded-md  border p-2 mb-2" />

        <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Contraseña"
          className="block w-full rounded-md border p-2 mb-2" />

        <button className="bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg">Login</button>
      </form>
    </section>
  )
}
