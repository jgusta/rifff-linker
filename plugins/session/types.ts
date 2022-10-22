export interface LoginResponse extends Response {
  json(): Promise<{
    token: string
    password: string
    user_id: string
    expires: number
  }>
}

export interface AuthBucket {
  token: string
  password: string
  user_id: string
  expires: number
}

export type Maybe<T> = T|null;