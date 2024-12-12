import { useControllableValue } from "ahooks";
import Header from "./Header";
import CalendarContext from "./LocaleContext";
import dayjs, { Dayjs } from "dayjs";
import { CSSProperties, ForwardedRef, forwardRef, ForwardRefRenderFunction, ReactNode, useImperativeHandle, useState } from "react";
import MonthCalendar from "./MonthCalendar";
import './index.less'
import cs from 'classnames'

export interface CalendarProps {
  defaultValue?: Date;
  value?: Dayjs,
  dayStartOfWeek?: 0 | 1;
  onChange?: (value: Dayjs) => void;
  locale?: string;
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  style?: CSSProperties;
  className?: string | string[];
}
interface CalendarRef {
  getDate: () => Dayjs;
  setDate: (value: Dayjs) => void;
}

const Calendar: ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props: CalendarProps, ref: ForwardedRef<CalendarRef>) => {
  const {  style, className, locale, onChange} = props
  const classNames = cs("calendar", className);

  const [curValue, setCurValue] = useControllableValue<Dayjs>(props, {
    defaultValue: dayjs(),
  })

  const [curMonth, setCurMonth] = useState<Dayjs>(curValue);

  useImperativeHandle(ref, () => ({
    getDate: () => curValue,
    setDate: (value: Dayjs) => {
      selectHandler(value);
    }
  }))
  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, 'month'));
  }

  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, 'month'));
  }

  function todayHandler() {
    const date = dayjs(Date.now());

    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }
  
  function selectHandler(date: Dayjs){

    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }

  return (
    <CalendarContext.Provider value={{locale:locale || navigator.language}} >
      <div className={classNames} style={style}>
        <Header
          curMonth={curMonth} 
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        />
        <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler} />
      </div>
    </CalendarContext.Provider>

  )
}
const WrappedCalendar = forwardRef<CalendarRef, CalendarProps>(Calendar);

export default WrappedCalendar;
