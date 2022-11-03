import type { AuthBucket, GlobalSession } from "@/plugins/session/types.ts";
export const authKeys:(keyof AuthBucket)[] = ['token', 'password', 'user_id', 'expires'];
export const defaultSession:GlobalSession = {
  auth: {},
  isLoggedIn: () => false,
  getName: () => ''
}