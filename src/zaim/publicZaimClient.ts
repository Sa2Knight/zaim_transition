import { Dayjs } from 'dayjs'
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

  async transcribeIncomeFrom(money: Money) {
    const { date, place, category_id, amount, comment } = money
    return this.client.createIncome({ date, place, category_id, amount, comment })
  }

  async addPocketMoneyPayment(date: Dayjs, amount: number): Promise<void> {
    return this.client.createPay({
      date: date.toDate(),
      category_id: 199, // その他
      genre_id: 19902, // お小遣い
      comment: '信吾 お小遣い',
      amount
    })
  }
}
