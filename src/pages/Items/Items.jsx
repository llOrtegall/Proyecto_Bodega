import { RenderItems } from '../../components/RenderItems.jsx'
import { DetalleItem } from '../../components/DetalleItem.jsx'
import { BottonExportItems } from '../../components/BotonExcelDefault.jsx'
import { useFiltersItems } from '../../hooks/useFilters.js'
import { useIdleTimer } from '../../hooks/useIdleTimer.js'
import { useEffect, useState } from 'react'

import { useItems } from '../../hooks/useItems.js'

export function Items ({ fun, user, company }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const { items, getItems } = useItems()
  const logout = fun
  useIdleTimer(logout, 600000)

  useEffect(() => {
    getItems(company)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen])

  const handleClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const { search, setSearch, filteredItems } = useFiltersItems(items)

  return (

    <section className='h-[93vh] overflow-auto'>

      <section className='flex items-center justify-center gap-6 bg-blue-500  shadow-lg py-2'>
        <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
        <input type="text"
          value={search} onChange={ev => setSearch(ev.target.value)}
          placeholder="Teclado | 343543 | S/N:312412412" className="bg-slate-100 w-64 p-1 outline-none" />
        <BottonExportItems datos={filteredItems} />
      </section>

      <RenderItems items={items} user={user} handleClick={handleClick} filteredItems={filteredItems}/>

      <section className='flex flex-col'>
      </section>
      {
        user.rol === 'Analista Desarrollo' || user.rol === 'Jefe Tecnología' || user.rol === 'Director Tecnología' || user.rol === 'Coordinador Soporte'
          ? (isModalOpen === true
              ? <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <section className="relative bg-white p-5 rounded-md">
                <DetalleItem item={selectedItem} company={company} onClose={() => setIsModalOpen(false)} />
              </section>
            </div>
              : <></>)
          : <></>
      }
    </section>
  )
}
