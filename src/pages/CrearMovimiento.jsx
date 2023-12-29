import { AddIcon, DeleteIcon, WarningIcon } from '../components/Icons.jsx'
import { useState } from "react"
import axios from "axios"

export function CrearMovimiento() {
  const [bodegaOrigen, setBodegaOrigen] = useState(null)
  const [bodegaDestino, setBodegaDestino] = useState(null)
  const [search2, setSearch2] = useState('')
  const [search, setSearch] = useState('')

  const [encargado, setEncargado] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [incidente, setIncidente] = useState('')
  const [filtro, setFiltro] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [items, setItems] = useState([])

  const handleAddItem = (id) => {
    setItems(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id];
      } else {
        return prevItems;
      }
    })
  }

  const handleRemoveItem = (id) => {
    setItems(prevItems => {
      return prevItems.filter(item => item !== id);
    });
  }


  // eslint-disable-next-line react/prop-types
  function ItemsAgregados({ id }) {
    const item = bodegaOrigen?.items.find(item => item._id === id);
    return (
      <main key={item._id} className="grid grid-cols-2 place-items-center mb-2 p-2 rounded-md bg-yellow-500">
        <p>{item?.placa}</p>
        <button onClick={() => handleRemoveItem(id)} className="hover:bg-red-400 rounded-full p-1 hover:text-white">
          <DeleteIcon />
        </button>
      </main>
    );
  }


  const searchBodegaOrigen = (ev) => {
    ev.preventDefault()

    axios.get(`/getBodega/${search}`)
      .then(response => {
        setBodegaOrigen(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const searchBodegaDestino = (ev) => {
    ev.preventDefault()

    axios.get(`/getBodega/${search2}`)
      .then(response => {
        setBodegaDestino(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleClick = () => {
    if (!bodegaOrigen || !bodegaDestino) {
      setTimeout(() => {
        setMessage('')
        setError('')
      }, 4000)
      return setError('Debe Ingresar Una Bodega De Origen y Una De Destino')
    }

    axios.post('/moveItem', {
      bodegaOrigen: bodegaOrigen._id,
      bodegaDestino: bodegaDestino._id,
      itemsIds: items,
      encargado,
      descripcion,
      incidente
    })
      .then(res => {
        setMessage(res.data.message)
        // resetea los estados
        setBodegaOrigen(null)
        setBodegaDestino(null)
        setSearch('')
        setSearch2('')
        setItems([])
        setEncargado('')
        setDescripcion('')
        setIncidente('')
        setTimeout(() => {
          setMessage('')
          setError('')
        }, 4000)
      })
      .catch(err => {
        setError(err.response.data.error)
        setTimeout(() => {
          setMessage('')
          setError('')
        }, 4000)
      })
  }

  const filteredItems = bodegaOrigen?.items.filter(item =>
    item.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    item.placa.toLowerCase().includes(filtro.toLowerCase()) ||
    item.serial.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <main className="w-full bg-blue-200">

      <section className="grid grid-cols-3 place-items-center py-4">

        <form className="p-2 bg-blue-400 rounded-lg flex flex-col gap-2 text-center col-span-2" onSubmit={searchBodegaOrigen}>
          <h3 className="font-semibold">Bodega De Origen</h3>
          <input type="text" value={search} onChange={ev => setSearch(ev.target.value)}
            placeholder="40001 | 34545"
            className="bg-slate-100 w-64 p-2 rounded-md" />
          <button className="bg-green-300 rounded-md p-2 hover:bg-white">Buscar Sucursal</button>
        </form>

        <form className="p-2 bg-blue-400 rounded-lg flex flex-col gap-2 text-center col-span-1" onSubmit={searchBodegaDestino}>
          <h3 className="font-semibold">Bodega De Destino</h3>
          <input type="text" value={search2} onChange={ev => setSearch2(ev.target.value)}
            placeholder="40001 | 34545"
            className="bg-slate-100 w-64 p-2 rounded-md" />
          <button className="bg-green-300 rounded-md p-2 hover:bg-white">Buscar Sucursal</button>
        </form>
      </section>

      <section className="grid grid-cols-3 p-2 gap-6">

        <article className="col-span-2">

          <header className="w-full rounded-md p-2 bg-slate-600 text-white grid grid-cols-3 place-items-center mb-2">
            <h3> <span className="font-bold">Nombre:</span>  {bodegaOrigen?.nombre}</h3>
            <p> <span className="font-bold">Direccion:</span>  {bodegaOrigen?.direccion}</p>
            <p> <span className="font-bold">Sucursal:</span>  {bodegaOrigen?.sucursal}</p>
          </header>

          <section className="grid grid-cols-2 w-full place-items-center gap-6 bg-yellow-400 rounded-md px-4 py-2 mb-2">
            <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
            <input type="text" placeholder="Buscar Items..." className="bg-slate-100 w-64 rounded-md p-1" value={filtro} onChange={ev => setFiltro(ev.target.value)} />
          </section>

          <section className="grid grid-cols-4 w-full place-items-center p-2 bg-slate-500 rounded-md mb-2">
            <p className="font-semibold">Nombre Item</p>
            <p className="font-semibold">Placa</p>
            <p className="font-semibold">Serial</p>
            <p className="font-semibold">Agregar</p>
          </section>

          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {
              bodegaOrigen && (
                filteredItems.map(p => (
                  <section key={p._id} className="w-full grid grid-cols-4 p-2 bg-blue-600 rounded-md mb-2 place-items-center text-white">
                    <p>{p.nombre}</p>
                    <p>{p.placa}</p>
                    <p>{p.serial}</p>
                    <button
                      onClick={() => handleAddItem(p._id)}
                      className={items.includes(p._id) ? 'added' : ''}
                    >
                      <AddIcon />
                    </button>
                  </section>
                ))
              )
            }
          </div>

          <section className="py-4">
            <form className="grid grid-cols-2 gap-3">
              <label className="flex h-10 items-center ml-3"> <span className="font-semibold w-32">Encargado:</span>
                <input type="text" className="w-full p-2 rounded-md col-span-1"
                  value={encargado}
                  onChange={ev => setEncargado(ev.target.value)}
                  placeholder="Pepito Perez Muñoz" />
              </label>


              <label className="flex h-10 items-center"> <span className="font-semibold w-32">N° Incidente:</span>
                <input type="text" className="w-full p-2 rounded-md"
                  value={incidente}
                  onChange={ev => setIncidente(ev.target.value)}
                  placeholder="134564 | 234252 | 634532" />
              </label>

              <label className="col-span-3 mx-3"> <span className="font-semibold w-40">Observaciones:</span>
                <input type="text" className="w-full p-2 rounded-md"
                  value={descripcion}
                  onChange={ev => setDescripcion(ev.target.value)}
                  placeholder="texto para registrar observación ..." />
              </label>
            </form>
          </section>

          <section className="flex w-full justify-center">
            <button className="p-2 text-white font-bold w-48 bg-green-600 rounded-md hover:bg-white hover:text-black" onClick={handleClick}>
              Realizar Movimiento
            </button>
          </section>

        </article>

        <article >
          <header>
            <h3> <span className="font-semibold">Nombre:</span>  {bodegaDestino?.nombre}</h3>
            <p> <span className="font-semibold">Sucursal:</span>  {bodegaDestino?.sucursal}</p>
            <p> <span className="font-semibold">Direccion:</span>  {bodegaDestino?.direccion}</p>
          </header>
          <main className="">
            <h2 className="text-center py-2 font-semibold bg-green-400 mb-2 rounded-md">Items Que Ingresarán :</h2>
            {
              bodegaOrigen && (
                items?.map((item, index) => (
                  <ItemsAgregados id={item} key={index} />
                ))
              )
            }
          </main>
        </article>
      </section>

      <section className='h-10'>
        <article className="flex items-center justify-center">
          {message &&
            <div className='flex gap-2'>
              <figure className='bg-yellow-300 flex items-center justify-center text-center px-2 rounded-md'>
                <WarningIcon />
              </figure>
              <p className="text-center bg-green-400 text-white font-semibold p-2 rounded-md">
                {message}
              </p>
            </div>
          }
          {error &&
            <div className='flex gap-2'>
                <figure className='bg-yellow-300 flex items-center justify-center text-center px-2 rounded-md'>
                <WarningIcon />
              </figure>
              <p className="text-center bg-red-400 text-white font-semibold p-2 rounded-md">
                {error}                
              </p>
            </div>
          }
        </article>
      </section>
    </main>
  )
}