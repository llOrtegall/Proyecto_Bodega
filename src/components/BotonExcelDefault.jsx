import { formatFecha } from '../utils/funtions.js'
import * as XLSX from 'xlsx'

export const BottonExportItems = ({ datos }) => {
  const titulo = [{ A: 'Reporte de Items' }, {}]
  const hora = new Date()
  const infoCreacción = { A: `Fecha De Creación ${formatFecha(hora)}` }

  const longitudes = [25, 25, 20, 10, 10, 10, 35]

  const handleDownload = () => {
    const tabla = [
      {
        A: 'UUID',
        B: 'NOMBRE',
        C: 'DESCRIPCIÓN',
        D: 'SERIAL',
        E: 'PLACA',
        F: 'ESTADO',
        G: 'UBICACIÓN|BODEGA',
        H: 'SUCURSAL'
      }
    ]

    datos.forEach((item) => {
      tabla.push({
        A: item.Id,
        B: item.Nombre,
        C: item.Descripcion,
        D: item.Serial,
        E: item.Placa,
        F: item.Estado,
        G: item.Bodega,
        H: item.Sucursal
      })
    })

    const dataFinal = [...titulo, infoCreacción, ...tabla]

    setTimeout(() => {
      creandoArchivo(dataFinal)
    }, 1000)
  }

  const creandoArchivo = (dataFinal) => {
    const libro = XLSX.utils.book_new()
    const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true })

    hoja['!merges'] = [
      XLSX.utils.decode_range('A1:G1'),
      XLSX.utils.decode_range('A2:G2'),
      XLSX.utils.decode_range('A3:G3')
    ]

    const simpiedades = []

    longitudes.forEach((col) => {
      simpiedades.push({ width: col })
    })

    hoja['!cols'] = simpiedades
    XLSX.utils.book_append_sheet(libro, hoja, 'Items')
    XLSX.writeFile(libro, 'datos.xlsx')
  }

  return (<button onClick={handleDownload} className='bg-green-800 hover:bg-green-600 text-white font-bold py-1 px-4 rounded'>Exportar a Excel</button>)
}

// eslint-disable-next-line react/prop-types
export const BottonExportSimcards = ({ simcards }) => {
  const titulo = [{ A: 'Reporte De Simcards' }, {}]
  const hora = new Date()
  const infoCreacción = { A: `Fecha De Creación ${formatFecha(hora)}` }

  const longitudes = [25, 25, 20, 10, 10, 10, 10, 20, 20]

  const handleDownload = () => {
    const tabla = [
      {
        A: 'UUID',
        B: 'NÚMERO',
        C: 'OPERADOR',
        D: 'ESTADO',
        E: 'SERIAL',
        F: 'APN',
        G: 'USUARIO',
        H: 'CONTRASEÑA',
        I: 'UBICACIÓN|BODEGA'
      }
    ]

    // eslint-disable-next-line react/prop-types
    simcards.forEach((sim) => {
      tabla.push({
        A: sim._id,
        B: sim.numero,
        C: sim.operador,
        D: sim.estado,
        E: sim.serial,
        F: sim.apn,
        G: sim.user,
        H: sim.pass,
        I: sim.bodega.nombre || sim.bodega
      })
    })

    const dataFinal = [...titulo, infoCreacción, ...tabla]

    setTimeout(() => {
      creandoArchivo(dataFinal)
    }, 1000)
  }

  const creandoArchivo = (dataFinal) => {
    const libro = XLSX.utils.book_new()
    const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true })

    hoja['!merges'] = [
      XLSX.utils.decode_range('A1:G1'),
      XLSX.utils.decode_range('A2:G2'),
      XLSX.utils.decode_range('A3:G3')
    ]

    const simpiedades = []

    longitudes.forEach((col) => {
      simpiedades.push({ width: col })
    })

    hoja['!cols'] = simpiedades
    XLSX.utils.book_append_sheet(libro, hoja, 'Items')
    XLSX.writeFile(libro, 'datos.xlsx')
  }

  return (<button onClick={handleDownload} className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded'>Exportar a Excel</button>)
}
