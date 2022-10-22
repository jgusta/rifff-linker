import { VNode } from "preact";
import { isLoggedIn, getAuth, isStarted, killCookies } from "./SessionState.ts";
import { AuthBucket } from "./types.ts";

type AuthChild = VNode & { auth: AuthBucket }
type AuthChildren = AuthChild[] | AuthChild | VNode[] | VNode
type Props = {
  children: AuthChildren
}

interface Session {
  auth: AuthBucket
  logout(): () => {}
  isLoggedIn(): () => boolean
  getName(): () => string
}

function logout() { 
  killCookies();
}

function getSession() {
  // a little more specific error here.
  if (!isStarted()) {
    throw new Error('Session tools will not work before startSession is run in a handler.')
  }


  if (!isLoggedIn()) {
    return {
      isLoggedIn() { return false; },

    };
  }

  const auth = getAuth()
  return {
    logout,
    isLoggedIn,
    auth,
    getName() {
      return this.auth.user_id
    }
  }
}

export default getSession;