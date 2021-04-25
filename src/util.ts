import { Dayjs } from 'dayjs'
import * as dayjs from 'dayjs'
import { Money } from './zaim/type'

// export const TRANSFORM_START_DATE = new Date('2017/10/01') // NOTE: 結婚による家計合併を行った日
// export const TRANSFORM_END_DATE = new Date('2021/05/01')
export const TRANSFORM_START_DATE = new Date('2021/03/01') // NOTE: 結婚による家計合併を行った日
export const TRANSFORM_END_DATE = new Date('2021/04/01')

/**
 * 旧アカウントから新アカウントへの、カテゴリーID/ジャンルIDの変換を行う
 * 変換時に情報が失われる場合、コメントを拡張する
 */
export function convertMoneyOption(money: Money): Money {
  const { category_id, genre_id, comment } = money

  // TODO: 「私費」「公費」って文言も削っちゃってもよいかも？

  // 交通費/駐輪場 → 交通費/その他
  if (category_id == 103 && genre_id == 8857041) {
    return { ...money, category_id: 103, genre_id: 8857041, comment: `駐輪代 ${comment}` }
  }
  // 食費/飲み会 → 交際費/飲み会
  if (category_id == 101 && genre_id == 9380317) {
    return { ...money, category_id: 107, genre_id: 10701, comment }
  }
  // エンタメ/カラオケ → エンタメ/その他
  if (category_id == 108 && genre_id == 10804) {
    return { ...money, category_id: 108, genre_id: 10899, comment: `カラオケ ${comment}` }
  }
  // エンタメ/ゲーセン → エンタメ/ゲーム
  if (category_id == 108 && genre_id == 10807) {
    return { ...money, category_id: 108, genre_id: 10807, comment: `ゲーセン ${comment}` }
  }
  // エンタメ/音楽 → エンタメ/音楽
  if (category_id == 108 && genre_id == 15509020) {
    return { ...money, category_id: 108, genre_id: 10804, comment }
  }
  // それ以外はそのままでOK
  return money
}

/**
 * 指定した期間の月初日時の配列を戻す
 */
export function monthlyFirstDays(): Dayjs[] {
  const startDay = dayjs(TRANSFORM_START_DATE).startOf('day')
  const endDay = dayjs(TRANSFORM_END_DATE).startOf('day')
  const dateList: Dayjs[] = []

  let iteratorDay = startDay
  while (iteratorDay.unix() <= endDay.unix()) {
    dateList.push(dayjs(iteratorDay))
    iteratorDay = iteratorDay.add(1, 'month')
  }

  return dateList
}

/**
 * 指定した日付時点でのお小遣い額を戻す
 */
export function getPocketMoneyBudget(date: Dayjs): number {
  if (date <= dayjs('2018/05/01').endOf('month')) {
    return 50000
  } else {
    return 60000
  }
}
