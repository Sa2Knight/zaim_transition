import { Money } from './type'
import { ZaimClient } from './zaimClient'

export class PublicZaimClient extends ZaimClient {
  constructor() {
    super(
      process.env.PUBLIC_ZAIM_KEY as string,
      process.env.PUBLIC_ZAIM_SECRET as string,
      process.env.PUBLIC_ZAIM_TOKEN as string,
      process.env.PUBLIC_ZAIM_TOKEN_SECRET as string
    )
  }

  async duplicateIncomeFrom(money: Money) {
    const { date, place, category_id, amount, comment } = money
    return this.client.createIncome({ date, place, category_id, amount, comment })
  }
}
