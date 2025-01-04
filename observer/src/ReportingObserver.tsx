import { useEffect } from "react"

function ReportingObserverTest() {

  useEffect(() => {
    const reportingObserver = new ReportingObserver((reports) => {
      for (const report of reports) {
          console.log(report.body);//上报
      }
    }, {types: ['intervention', 'deprecation']});
    
    reportingObserver.observe();
  

    return () => {
      reportingObserver.disconnect()
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

export default ReportingObserverTest
