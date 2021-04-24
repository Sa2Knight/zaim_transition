import * as dotenv from 'dotenv'
import { CurrentZaimClient } from './lib/currentZaimClient'
dotenv.config()

const currentZaimClient = new CurrentZaimClient()
currentZaimClient.getAllIncomes().then(result => {
  console.log(result.length)
  console.log(result.reduce((max, current) => (max += current.amount), 0))
})
currentZaimClient.getAllPublicPayments().then(result => {
  console.log(result.length)
  console.log(result.reduce((max, current) => (max += current.amount), 0))
})
currentZaimClient.getAllPrivatePayments().then(result => {
  console.log(result.length)
  console.log(result.reduce((max, current) => (max += current.amount), 0))
})
