import type { VNode } from 'preact';

export interface LoginResponse extends Response {
  json(): Promise<AuthBucket>
}

export interface AnyAuthBucket {
  token?: string
  password?: string
  user_id?: string
  expires: number
}

type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};


export type AuthBucket = Concrete<AnyAuthBucket>;

export type AuthKeys = Array<keyof AuthBucket>;

// export interface AuthBucket extends AnyAuthBucket{
//   token: string
//   password: string
//   user_id: string
//   expires: number
// }

export type Maybe<T> = T | null;

export type AuthChild = VNode & { auth: AuthBucket }

export type AuthChildren = AuthChild[] | AuthChild | VNode[] | VNode;
