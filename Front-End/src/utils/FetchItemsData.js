import axios from 'axios'

export async function ItemsData () {
  try {
    const itemsResponse = await axios.get('/getItems')
    return itemsResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function fechtItemsBodegas () {
  try {
    const itemsResponse = await axios.get('/itemsConBodegas')
    return itemsResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function BodegaData () {
  try {
    const bodegaResponse = await axios.get('/getBodegas')
    return bodegaResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const createBodega = async (itemToSend) => {
  try {
    const res = await axios.post('/createBodega', itemToSend)
    return { data: res.data, error: null }
  } catch (err) {
    return { data: null, error: err.response.data.error }
  }
}

export async function BodegaDataSims () {
  try {
    const bodegaResponse = await axios.get('/getBodegasSim')
    return bodegaResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function simcardsBodegas () {
  try {
    const simcardsResponse = await axios.get('/simcardWhitBodega')
    return simcardsResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}
