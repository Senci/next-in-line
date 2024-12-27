export type ID = string | number

export type DateTimeValue = string | Date

export interface BaseEntity {
  id?: ID
  createdAt?: DateTimeValue
  updatedAt?: DateTimeValue
}

export interface Queue extends BaseEntity {
  name: string
  prefix: string
  tickets?: Ticket[]
}

export interface Ticket extends BaseEntity {
  number?: number
  fullNumber?: string
  locale?: string
  publishedAt?: DateTimeValue
  state?: "waiting" | "called" | "served"
  queue?: Queue
  secret?: string
}

export interface User extends BaseEntity {
  username: string
  email: string
  role: string
}

export interface APIResponse<T> {
  data: T | T[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type TicketQueryParams = {
  fields?: (
    'id' |
    'createdAt' |
    'updatedAt' |
    'number' |
    'fullNumber' |
    'locale' |
    'publishedAt' |
    'state' |
    'queue' |
    'secret'
  )[]
  populate?: {
    queue?: boolean
  }
}