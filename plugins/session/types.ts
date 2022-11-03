import { VNode } from "preact";

export interface LoginResponse extends Response {
  json(): Promise<{
    token: string
    password: string
    user_id: string
    expires: number
  }>
}

export interface GlobalSession {
  auth: Partial<AuthBucket>
  isLoggedIn: () => boolean
  getName: () => string
}

export interface AuthBucket {
  token: string
  password: string
  user_id: string
  expires: number
}

export type Maybe<T> = T | null;

export type AuthChild = VNode & { auth: AuthBucket }

export type AuthChildren = AuthChild[] | AuthChild | VNode[] | VNode;
