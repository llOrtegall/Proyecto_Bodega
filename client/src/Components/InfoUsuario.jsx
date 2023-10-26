import { CloseIcon, InfoIcon } from "./IconsSvg";

// eslint-disable-next-line react/prop-types
export function InfoUsuario({ inf, fun }) {

  const toggleComponent = fun

  return (
    <>
      <section className="flex w-auto m-2 p-2 bg-yellow-300 rounded-lg justify-center ">
        <span className="font-semibold">Por Favor Antes De Agregar El Usuario Validar Con Alguna Página Del Estado La Información Recibida</span>
      </section>

      <section className="relative m-2 p-6 bg-zinc-300 rounded-lg ">

        <div className="flex">
          <figure className="flex items-center pr-2 ">
            <InfoIcon />
          </figure>

          {inf.length > 0
            ? inf.map(
              i => (
                <div key={i.cedula} className="m-2 p-2">
                  <div className="flex justify-between">
                    <h1 className="font-bold pr-8">Nombres: </h1>
                    <h1 className="">{i.nombre}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="font-bold pr-8">N° Cedula: </h1>
                    <h1 className="">{i.cedula}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="font-bold pr-8">Telefono: </h1>
                    <h1 className="">{i.telefono}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="font-bold pr-8">Tel Registro: </h1>
                    <h1 className="">{i.telwhats}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="font-bold pr-8">Correo: </h1>
                    <h1 className="">{i.correo}</h1>
                  </div>
                  <div className="flex justify-between">
                    <label className="font-bold pr-8"> Usuario Validado: </label>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" className="w-4" />
                  </div>
                </div>
              ))
            : null}

          <aside className="flex flex-col">
            <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-green-400">Crear Usuario</button>
            <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-yellow-400">Editar Usuario</button>
            <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-purple-400">Validar Usuario</button>
          </aside>

        </div>

        <button className="absolute top-2 right-2 hover:bg-red-700 hover:rounded-full hover:text-white" onClick={toggleComponent}><CloseIcon /></button>

      </section >
    </>
  )
}

