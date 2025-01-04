import { useEffect, useRef } from "react"

function ResizeObserverTest() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = boxRef.current
    const resizeObserver = new ResizeObserver((entries) => {
      console.log('当前大小', entries)
    })
    resizeObserver.observe(box!)
    setTimeout(() => {
      box!.style.width = '300px'
    }, 2000)
    return () => {
      resizeObserver.disconnect()
    }
  }, [])
  return (
    <div ref={boxRef} >12</div>
  )

}

export default ResizeObserverTest
