import { useState } from "react";

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

const Calendar = (props: CalendarProps) => {
  const { onChange, value} = props;

  console.log('calendar render');
  
  function changeValue(date: Date) {
    onChange?.(date);
  } 
  return (
    <div>
      { value?.toLocaleDateString() }
      <div onClick={()=> {changeValue(new Date('2024-5-1'))}}>2023-5-1</div>
      <div onClick={()=> {changeValue(new Date('2024-5-2'))}}>2023-5-2</div>
      <div onClick={()=> {changeValue(new Date('2024-5-3'))}}>2023-5-3</div>
    </div>
  )
}

function App() {
  const [value, setValue] = useState(new Date());
  return <Calendar value={value} onChange={(date) => {
    console.log(date.toLocaleDateString());
    setValue(date);
  }}/>
}

export default App
