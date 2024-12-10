import { useState } from 'react';
import Calendar from './calendar/calendar'

function App() {
  const changeCalendar = (time:Date
  ) => {
    console.log(time);

  }
  const [date, setDate] = useState(new Date())
  const changeCalendar2 = (newDate: Date) => {
    console.log(11,  newDate);
    setDate(newDate)
  }
  return (
    <>
       {/* 非受控模式 */}
      <Calendar defaultValue={new Date('2024-05-29')} onChange={changeCalendar} />
      {/* 受控模式 */}
      <Calendar value={date} onChange={changeCalendar2}  />
    </>
  )
}

export default App
