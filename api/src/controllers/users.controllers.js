import { connection } from '../db.js'

export const getUsers = async (req, res) => {
  const [result] = await connection.query('SELECT * FROM personayumbo')
  res.json(result)
}

export const createUser = (req, res) => {
  res.send('obteniendo los usuarios')
}

export const updateUser = (req, res) => {
  res.send('obteniendo los usuarios')
}

export const deleteUser = (req, res) => {
  res.send('obteniendo los usuarios')
}
