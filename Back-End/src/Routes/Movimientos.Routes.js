import { Router } from 'express'
import { getMovimientos, moveItems, getMovimiento } from '../Controllers/Movimientos.Controller.js'

export const MovimientosMongoDB = Router()

MovimientosMongoDB.get('/getMovimientos', getMovimientos)

MovimientosMongoDB.get('/movimiento/:id', getMovimiento)

MovimientosMongoDB.post('/moveItem', moveItems)
