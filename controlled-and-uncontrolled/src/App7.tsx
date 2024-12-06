import { memo, useEffect, useRef, useState } from "react";

interface CalendarProps {
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date) => void;
}

const Calendar = (props: CalendarProps) => {
  const { onChange, value: propsValue, defaultValue} = props;
  const [value, setValue] = useState(() => {
    if (propsValue!== undefined) {
      return propsValue;
    } else {
      return defaultValue;
    }
  });
  console.log('calendar render');
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (propsValue !== undefined && !isFirstRender.current) {
      setValue(propsValue);
    }
    isFirstRender.current = false;
  }, [propsValue])
  function changeValue(date: Date) {
    if (propsValue === undefined) {
      setValue(date);
    }
    onChange?.(date);
  } 
  const mergedValue = propsValue !== undefined ? propsValue : value;
  return (
    <div>
      { mergedValue?.toLocaleDateString() }
      <div onClick={()=> {changeValue(new Date('2024-5-1'))}}>2023-5-1</div>
      <div onClick={()=> {changeValue(new Date('2024-5-2'))}}>2023-5-2</div>
      <div onClick={()=> {changeValue(new Date('2024-5-3'))}}>2023-5-3</div>
    </div>
  )
}

// function App() {
//   return <Calendar defaultValue={new Date('2024-5-1')} onChange={(date) => {
//     console.log(date.toLocaleDateString());
//   }}/>
// }
const WrapedCalendar = memo(Calendar);
function App() {
  const [value, setValue] = useState(new Date());
  return <WrapedCalendar value={value} onChange={(date) => {
    console.log(date.toLocaleDateString());
    setValue(date);
  }}/>
}
export default App
