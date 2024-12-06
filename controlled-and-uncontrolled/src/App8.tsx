import { Dispatch, memo, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

interface CalendarProps {
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date) => void;
}
const useMergeState = <T,>(defaultStateValue: T, props?: {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}): [T, Dispatch<SetStateAction<T>>] => {
  const { value: propsValue, defaultValue, onChange } = props || {};
  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue!== undefined) {
      return propsValue;
    } else if (defaultValue !== undefined)  {
      return defaultValue;
    } else {
      return defaultStateValue
    }
  });
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (propsValue !== undefined && !isFirstRender.current) {
      setStateValue(propsValue);
    }
    isFirstRender.current = false;
  }, [propsValue])


  const mergedValue = propsValue !== undefined ? propsValue : stateValue;
  function isFunction(value: unknown): value is (arg: T) => T {
    return typeof value === 'function';
  } 
  const setValue = useCallback((value: SetStateAction<T>) => {
    const trueValue = isFunction(value) ? value(stateValue) : value
    if (propsValue === undefined) {
      setStateValue(trueValue);
    }
    onChange?.(trueValue);

  },[stateValue])

  return [mergedValue, setValue]
}
const Calendar = (props: CalendarProps) => {
  const {value: propsValue, onChange, defaultValue } = props
  console.log('calendar render');
  const [mergedValue, setValue] = useMergeState<Date>(new Date(), {
    value: propsValue,
    defaultValue,
    onChange
  })
  return (
    <div>
      { mergedValue?.toLocaleDateString() }
      <div onClick={()=> {setValue(new Date('2024-5-1'))}}>2023-5-1</div>
      <div onClick={()=> {setValue(new Date('2024-5-2'))}}>2023-5-2</div>
      <div onClick={()=> {setValue(new Date('2024-5-3'))}}>2023-5-3</div>
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
