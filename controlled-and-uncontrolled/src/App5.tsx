import { useState } from "react";

interface CalendarProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

const Calendar = (props: CalendarProps) => {
  const { onChange, defaultValue} = props;
  const [value, setValue] = useState(defaultValue || new Date());
  console.log('calendar render');
  
  function changeValue(date: Date) {
    setValue(date);
    onChange?.(date);
  } 
  return (
    <div>
      { value.toLocaleDateString() }
      <div onClick={()=> {changeValue(new Date('2024-5-1'))}}>2023-5-1</div>
      <div onClick={()=> {changeValue(new Date('2024-5-2'))}}>2023-5-2</div>
      <div onClick={()=> {changeValue(new Date('2024-5-3'))}}>2023-5-3</div>
    </div>
  )
}

function App() {
  return <Calendar defaultValue={new Date('2024-5-1')} onChange={(date) => {
    console.log(date.toLocaleDateString());
  }}/>
}

export default App
