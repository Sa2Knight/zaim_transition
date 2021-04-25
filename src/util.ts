import { Dayjs } from 'dayjs'
import * as dayjs from 'dayjs'

/**
 * 旧アカウントから新アカウントへの、カテゴリーID/ジャンルIDの変換を行う
 * 変換時に情報が失われる場合、コメントを拡張する
 */
export function convertGenreOption(categoryId: number, genreId: number, comment: string) {
  // 交通費/駐輪場 → 交通費/その他
  if (categoryId == 103 && genreId == 8857041) {
    return { categoryId: 103, genreId: 8857041, comment: `駐輪代 ${comment}` }
  }
  // 食費/飲み会 → 交際費/飲み会
  if (categoryId == 101 && genreId == 9380317) {
    return { categoryId: 107, genreId: 10701, comment }
  }
  // エンタメ/カラオケ → エンタメ/その他
  if (categoryId == 108 && genreId == 10804) {
    return { categoryId: 108, genreId: 10899, comment: `カラオケ ${comment}` }
  }
  // エンタメ/ゲーセン → エンタメ/ゲーム
  if (categoryId == 108 && genreId == 10807) {
    return { categoryId: 108, genreId: 10807, comment: `ゲーセン ${comment}` }
  }
  // エンタメ/音楽 → エンタメ/音楽
  if (categoryId == 108 && genreId == 15509020) {
    return { categoryId: 108, genreId: 10804, comment }
  }
  // それ以外はそのままでOK
  return { categoryId, genreId, comment }
}

/**
 * 指定した期間の月初日時の配列を戻す
 */
export function monthlyFirstDays(dateFrom: Dayjs, dateTo: Dayjs): Dayjs[] {
  const startDay = dateFrom.startOf('day')
  const endDay = dateTo.startOf('day')
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
