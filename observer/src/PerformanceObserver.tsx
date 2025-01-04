import { useEffect } from "react"

function PerformanceObserverTest() {

  useEffect(() => {
    const performanceObserver = new PerformanceObserver((entries) => {
      entries.getEntries().forEach((entry) => {
        console.log('当前大小', entry)
      })
    })
    performanceObserver.observe({ entryTypes: ['resource', 'mark', 'measure']})
    
    performance.mark('registered-observer')
    performance.measure('registered-observer', 'registered-observer')
    return () => {
      performanceObserver.disconnect()
    }
  }, [])

  function measureClick() {
    performance.measure('button clicked');
  }

  return (
    <>
      <div onClick={measureClick} >measure btn</div>
      <img src="https://pic1.zhimg.com/80/v2-cbb69849ed1d41443f31c0e855356fc4_1440w.jpg" />
    </>
  )

}

export default PerformanceObserverTest
