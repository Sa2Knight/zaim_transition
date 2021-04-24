import Zaim from 'zaim'
import { MoneyResponse } from './type'

export class ZaimClient {
  public client: Zaim

  protected START_DATE = new Date('2017/10/01') // NOTE: 結婚による家計合併を行った日
  protected END_DATE = new Date('2021/05/01')
  // protected START_DATE = new Date('2015/03/01')
  // protected END_DATE = new Date('2021/05/01')

  constructor(key: string, secret: string, token: string, tokenSecret: string) {
    this.client = new Zaim({
      consumerKey: key,
      consumerSecret: secret,
      accessToken: token,
      accessTokenSecret: tokenSecret
    })
  }

  protected async getMoney(mode: 'payment' | 'income'): Promise<MoneyResponse> {
    const response = await this.client.getMoney({
      mode: mode,
      order: 'date',
      start_date: this.START_DATE,
      end_date: this.END_DATE
    })
    return JSON.parse(response) as MoneyResponse
  }
}
