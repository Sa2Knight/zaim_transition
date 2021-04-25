import { Dayjs } from 'dayjs'
import { ZaimClient } from './zaimClient'

export class PrivateZaimClient extends ZaimClient {
  constructor() {
    super(
      process.env.PRIVATE_ZAIM_KEY as string,
      process.env.PRIVATE_ZAIM_SECRET as string,
      process.env.PRIVATE_ZAIM_TOKEN as string,
      process.env.PRIVATE_ZAIM_TOKEN_SECRET as string
    )
  }

  async addPocketMoneyIncome(date: Dayjs, amount: number): Promise<void> {
    return this.client.createIncome({
      date: date.toDate(),
      category_id: 19, // その他
      comment: 'お小遣い',
      amount
    })
  }
}
