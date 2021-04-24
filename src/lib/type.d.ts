export type Money = {
  id: number
  user_id: number
  date: string
  mode: string
  category_id: number
  genre_id: number
  from_account_id: number
  to_account_id: number
  amount: number
  comment: string
  active: number
  created: string
  currency_code: string
  name: string
  receipt_id: number
  place_uid: string
  place: string
}

export type MoneyResponse = {
  money: Money[]
  requested: number
}
