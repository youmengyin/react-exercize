import { useSyncExternalStore } from "react"


const getSnapshot = () => {
  return location.href
}
const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback)
  window.addEventListener("hashchange", callback)

  return () =>  {
    window.removeEventListener("popstate", callback)
    window.removeEventListener("hashchange", callback)
  }
}
export default function useHistory() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot)
  const push = (path: string)=>{
    window.history.pushState(null, "", path)

    window.dispatchEvent(new PopStateEvent("popstate"))
    window.dispatchEvent(new HashChangeEvent("hashchange"))

  }
  const replace = (path: string)=>{
    window.history.replaceState(null, "", path)
    window.dispatchEvent(new PopStateEvent("popstate"))
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  }
  return [snapshot, push, replace] as const
}
