import axios from 'axios'

export const getMovimientos = async (company) => {
  try {
    const MoviResponse = await axios.get(`/getMovimientos/${company}`)
    return MoviResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

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

export async function BodegaData (company) {
  try {
    const bodegaResponse = await axios.get(`/getBodegas/${company}`)
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

export async function BodegaDataSims (company) {
  try {
    const bodegaResponse = await axios.get(`/getBodegasSim/${company}`)
    return bodegaResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function simcardsBodegas (company) {
  try {
    const simcardsResponse = await axios.get(`/simcardWhitBodega/${company}`)
    return simcardsResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function getUserByToken (token) {
  try {
    const userResponse = await axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
    return userResponse.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
