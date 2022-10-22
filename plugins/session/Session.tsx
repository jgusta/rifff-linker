import { VNode, toChildArray } from "preact";
import { isLoggedIn, getAuth, isStarted } from "./SessionState.ts";
import { AuthBucket } from "./types.ts";

type AuthChild = VNode & { auth: AuthBucket }
type Props = {
  children: AuthChild[]
}

function makeSessionComponent() {
  // a little more specific error here.
  if (!isStarted()) {
    throw new Error('Session component will not work before startSession is run.')
  }

  return function (props:{children:VNode[]}) {
    // this component should retrieve any logged-in info and dump it out into cookies.
    if (isLoggedIn()) {
      const auth = (getAuth() as AuthBucket)
      const chArray = toChildArray(props.children) as Partial<AuthChild>[]
      const childrenWithExtraProp = chArray.map((child) => {
        child.auth = auth as AuthBucket;
        return child as AuthChild;
      }) as AuthChild[];
      return (<>{childrenWithExtraProp} </>)
    }
    return (<>{props.children} </>)
  }
}

const Session: (props: Props) => VNode = makeSessionComponent()
export default Session;