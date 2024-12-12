import { useState } from 'react';
import Calendar from './calendar/index'
import dayjs from 'dayjs';

function App() {
  const [value, setValue] =  useState(dayjs('2023-11-08'));
  return (
    <div>
      <Calendar />
      <Calendar value={value} onChange={(val) => {
        setValue(val)
      }}></Calendar>
    </div>
  )

}

export default App
