import * as dotenv from 'dotenv'
import * as Zaim from './zaim'

dotenv.config()
const currentZaimClient = new Zaim.CurrentZaimClient()
const publicZaimClient = new Zaim.PublicZaimClient()

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

;(async () => {
  await addAllIncomesToPublicAccount()
})()
