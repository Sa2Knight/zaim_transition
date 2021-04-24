import Zaim from 'zaim'
import { Money, MoneyResponse } from './type'

class ZaimClient {
  public client: Zaim

  protected START_DATE = new Date('2017/10/01') // NOTE: 結婚による家計合併を行った日
  protected END_DATE = new Date('2021/05/01')
  // protected START_DATE = new Date('2021/04/01')
  // protected END_DATE = new Date('2021/05/01')

  constructor(key: string, secret: string, token: string, tokenSecret: string) {
    this.client = new Zaim({
      consumerKey: key,
      consumerSecret: secret,
      accessToken: token,
      accessTokenSecret: tokenSecret
    })
  }

  async getMoney(mode: 'payment' | 'income'): Promise<MoneyResponse> {
    const response = await this.client.getMoney({
      mode: mode,
      order: 'date',
      start_date: this.START_DATE,
      end_date: this.END_DATE
    })
    return JSON.parse(response) as MoneyResponse
  }

  async getPayments(): Promise<MoneyResponse> {
    return this.getMoney('payment')
  }

  async getIncomes(): Promise<MoneyResponse> {
    return this.getMoney('income')
  }
}

export class CurrentZaimClient extends ZaimClient {
  constructor() {
    super(
      process.env.CURRENT_ZAIM_KEY as string,
      process.env.CURRENT_ZAIM_SECRET as string,
      process.env.CURRENT_ZAIM_TOKEN as string,
      process.env.CURRENT_ZAIM_TOKEN_SECRET as string
    )
  }

  /**
   * 全ての私費の支出を取得する
   * ただし「キャリーオーバー」レコードは除外する
   */
  async getAllPrivatePayments(): Promise<Money[]> {
    const response = await this.getPayments()
    const payments = response.money.filter(m => {
      return m.comment.match('私費') && !m.comment.match('キャリーオーバー')
    })
    return payments
  }

  /**
   * 全ての公費を取得する
   */
  async getAllPublicPayments(): Promise<Money[]> {
    const response = await this.getPayments()
    const payments = response.money.filter(m => {
      return !m.comment.match('私費')
    })
    return payments
  }

  /**
   * 全ての収入を取得する
   */
  async getAllIncomes(): Promise<Money[]> {
    const response = await this.getIncomes()
    return response.money
  }
}
