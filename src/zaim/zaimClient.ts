import Zaim from 'zaim'
import { TRANSFORM_END_DATE, TRANSFORM_START_DATE } from '../util'
import { MoneyResponse, GenreResponse, CategoryResponse, Money, Genre, Category } from './type'

export class ZaimClient {
  public client: Zaim

  constructor(key: string, secret: string, token: string, tokenSecret: string) {
    this.client = new Zaim({
      consumerKey: key,
      consumerSecret: secret,
      accessToken: token,
      accessTokenSecret: tokenSecret
    })
  }

  protected async getMoney(mode: 'payment' | 'income'): Promise<Money[]> {
    const response = await this.client.getMoney({
      mode: mode,
      order: 'date',
      start_date: TRANSFORM_START_DATE,
      end_date: TRANSFORM_END_DATE
    })
    return (JSON.parse(response) as MoneyResponse).money
  }

  protected async getAllCategories(): Promise<Category[]> {
    const response = await this.client.getCategories()
    const categories = (JSON.parse(response) as CategoryResponse).categories
    return categories.filter(c => c.active === 1)
  }

  protected async getAllGenres(): Promise<Genre[]> {
    const response = await this.client.getGenre()
    const genres = (JSON.parse(response) as GenreResponse).genres
    return genres.filter(g => g.active === 1)
  }
}
