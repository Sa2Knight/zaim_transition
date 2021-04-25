import * as dotenv from 'dotenv'
import * as Zaim from './zaim'
import * as Util from './util'
import dayjs = require('dayjs')

dotenv.config()
const currentZaimClient = new Zaim.CurrentZaimClient()
const publicZaimClient = new Zaim.PublicZaimClient()
const privateZaimClient = new Zaim.PrivateZaimClient()

const actions = {
  toPrivate: {
    /**
     * 私費用アカウントにお小遣い収入レコードを新規登録する
     */
    async addPocketMoneyIncomes() {
      const allDays = Util.monthlyFirstDays()
      for (const date of allDays) {
        await Util.sleep()
        await privateZaimClient.addPocketMoneyIncome(date, Util.getPocketMoneyBudget(date))
        console.log(`...私費アカウントへの収入レコードを追加 ${date.format()}`)
      }
    },
    /**
     * 私費用アカウントに、私費の支出を転写する
     */
    async transcribePayments() {
      const currentIncomes = await currentZaimClient.getAllIncomes()
      for (const income of currentIncomes) {
        await Util.sleep()
        await publicZaimClient.duplicateIncomeFrom(income)
        console.log(`...公費アカウントへの収入レコードを追加 ${income.date}`)
      }
    }
  },
  toPublic: {
    /**
     * 公費用アカウントに、お小遣いの支出レコードを新規登録する
     */
    async addPocketMoneyPayments() {
      const allDays = Util.monthlyFirstDays()
      for (const date of allDays) {
        await Util.sleep()
        await publicZaimClient.addPocketMoneyPayment(date, Util.getPocketMoneyBudget(date))
        console.log(`...公費アカウントへの小遣い支出レコードを追加 ${date.format()}`)
      }
    },
    /**
     * 公費用アカウントに、給与収入を転写する
     */
    async transcribeIncomes() {
      const currentIncomes = await currentZaimClient.getAllIncomes()
      for (const income of currentIncomes) {
        await Util.sleep()
        await publicZaimClient.duplicateIncomeFrom(income)
        console.log(`...公費アカウントへの収入レコードを追加 ${income.date}`)
      }
    },
    /**
     * 公費用アカウントに、公費支出を転写する
     */
    async transcribePayments() {
      const currentPayments = await currentZaimClient.getAllPublicPayments()
      for (const payment of currentPayments) {
        await Util.sleep()
        await publicZaimClient.duplicatePaymentFrom(Util.convertMoneyOption(payment))
        console.log(`...公費アカウントへの支出レコードを追加 ${payment.date}`)
      }
    }
  }
}

;(async () => {})()
