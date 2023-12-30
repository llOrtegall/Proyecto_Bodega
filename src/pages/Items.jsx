import axios from "axios"
import { useEffect, useState } from "react"
import { RenderBodega } from '../components/RenderBodega.jsx'

export function Items() {
  const [search, setSearch] = useState("")
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('/getItems')
      .then(res => {
        setItems(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const filteredItems = items.filter(item =>
    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
    item.placa.toLowerCase().includes(search.toLowerCase()) ||
    item.serial.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="w-full px-2">

      <section className="flex items-center justify-center gap-6 bg-blue-500  rounded-md shadow-lg py-1 mb-2">
        <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
        <input type="text" value={search} onChange={handleSearchChange} placeholder="Teclado | 343543 | S/N:312412412" className="bg-slate-100 w-64 rounded-md p-1" />
      </section>

      <article className="flex justify-around text-center bg-blue-400 shadow-lg rounded-md py-2 mb-2">
        <p className="font-semibold">Items</p>
        <p className="font-semibold">Descripción</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">Placa</p>
        <p className="font-semibold">Estado</p>
        <p className="font-semibold">Ubicación</p>
      </article>

      <section className="">
        {filteredItems.map(item => (
          <article key={item._id} className="grid grid-cols-6 shadow-md rounded-md bg-slate-200 uppercase text-sm py-2 my-2 text-center">
            <p className="font-semibold">{item.nombre}</p>
            <p className="text-gray-500">{item.descripcion}</p>
            <p className="text-gray-500">{item.serial}</p>
            <p className="text-gray-700">{item.placa}</p>
            <p className="text-gray-500">{item.estado}</p>
            <RenderBodega id={item._id} />
          </article>
        ))}
      </section>

    </main>
  )
}