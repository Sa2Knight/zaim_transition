import * as dotenv from 'dotenv'
import * as Zaim from './zaim'
import * as Util from './util'
import dayjs = require('dayjs')

dotenv.config()
const currentZaimClient = new Zaim.CurrentZaimClient()
const publicZaimClient = new Zaim.PublicZaimClient()
const privateZaimClient = new Zaim.PrivateZaimClient()

/**
 * 私費用アカウントに全収入レコードを追加する
 */
async function addAllIncomesToPrivateAccount() {
  const allDays = Util.monthlyFirstDays()
  for (const date of allDays) {
    await privateZaimClient.addPocketMoneyIncome(date, Util.getPocketMoneyBudget(date))
    console.log(`...私費アカウントへの収入レコードを追加 ${date.format()}`)
  }
}

/**
 * 私費用アカウントに全支出レコードを追加する
 */
async function addAllPaymentsToPrivateAccount() {
  const currentPayments = await currentZaimClient.getAllPrivatePayments()
  for (const payment of currentPayments) {
    await privateZaimClient.createPayment(Util.convertMoneyOption(payment))
    console.log(`...私費アカウントへの支出レコードを追加 ${payment.date}`)
  }
}

/**
 * 公費用アカウントに全収入レコードを追加する
 */
async function addAllIncomesToPublicAccount() {
  const currentIncomes = await currentZaimClient.getAllIncomes()
  for (const income of currentIncomes) {
    await publicZaimClient.duplicateIncomeFrom(income)
    console.log(`...公費アカウントへの収入レコードを追加 ${income.date}`)
  }
}

/**
 * 公費用アカウントに全支出レコードを追加する
 */
async function addAllPaymentsToPublicAccount() {
  const currentPayments = await currentZaimClient.getAllPublicPayments()
  for (const payment of currentPayments) {
    await publicZaimClient.createPayment(Util.convertMoneyOption(payment))
    console.log(`...公費アカウントへの支出レコードを追加 ${payment.date}`)
  }
}

;(async () => {
  await addAllPaymentsToPublicAccount()
  // await addAllPaymentsToPrivateAccount()
  // await addAllIncomesToPrivateAccount()
  // await addAllIncomesToPublicAccount()
})()
