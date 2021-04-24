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

export type Category = {
  id: number
  mode: string
  name: string
  sort: number
  active: number
  modified: string
  parent_category_id: number
  local_id: number
}

export type Genre = {
  id: number
  category_id: number
  name: string
  sort: number
  active: number
  modified: string
  parent_genre_id: number
  local_id: number
}

export type MoneyResponse = {
  money: Money[]
  requested: number
}

export type CategoryResponse = {
  categories: Category[]
  requested: number
}

export type GenreResponse = {
  genres: Genre[]
  requested: number
}
