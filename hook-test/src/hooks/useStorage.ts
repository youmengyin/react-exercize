import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback)
  return () =>  window.removeEventListener("storage", callback)
}
export default function useStorage<T>(key: string, initialValue: T) {
  const getSnapshot = () => {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return initialValue
    }
  }
  const snapshot = useSyncExternalStore(subscribe, getSnapshot)
  const setSnapshot = (value: T) => {
    if(!value) return
    if(typeof value === "function") {
      value = value()
    }

    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new StorageEvent("storage"))

  }
  return [snapshot, setSnapshot]
}
