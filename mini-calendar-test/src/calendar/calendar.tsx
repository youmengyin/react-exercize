import WeekList from './week-list'
import './calendar.css'
import { ForwardedRef, forwardRef, ForwardRefRenderFunction, useImperativeHandle } from 'react';
import { Calendar_Ctx } from './constants';
import { useControllableValue } from 'ahooks';
interface CalendarProps {
  defaultValue?: Date;
  value?: Date,
  dayStartOfWeek?: 0 | 1;
  onChange?: (value: Date) => void;
}
interface CalendarRef {
  getDate: () => Date;
  setDate: (value: Date) => void;
}

const Calendar: ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props: CalendarProps, ref: ForwardedRef<CalendarRef>) => {
  const {dayStartOfWeek} = props

  // const [date, setDate] = useState(defaultValue);
  const [date, setDate] = useControllableValue(props, {
    defaultValue: new Date(),
  })
  const handlePrevMonth = () => {
      setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  };

  const handleNextMonth = () => {
      setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  };
  const monthNames = Object.values(Calendar_Ctx.month.long);
  
  // 获取当月天数
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  // 获取当月第一天是星期几
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  // 获取当月最后一天是星期几
  const lastDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, daysOfMonth(year, month)).getDay();
  };
  
  useImperativeHandle(ref, () => ({
    getDate: () => date,
    setDate: (value: Date) => {
      setDate(value);
    }
  }))
  function renderDates(){
    const days = []
    const daycount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());
    const lastDay = lastDayOfMonth(date.getFullYear(), date.getMonth());
    console.log(firstDay, lastDay, daycount);

    // 填充空白日期
    for (let i = 0; i < firstDay; i++) {
      days.push(renderDays(i, firstDay));
    }
    for (let i = 0; i < daycount; i++) {
      days.push(renderDays(i));
    }
    for (let i = 1; i <= 6 - lastDay; i++) {
      days.push(renderDays(i, undefined, lastDay));
    }
    
    return days;
  }
  function renderDays(row: number, firstDay?: number, lastDay?: number) {
    const selectedCls = row === date.getDate() ? 'calendar-date-selected' : '';
    const disabled = (firstDay|| firstDay === 0||lastDay || lastDay === 0) ? 'calendar-date-disabled' : '';

    const handleClick = () => {
      const curDate = new Date(date.getFullYear(), date.getMonth(), row);

      setDate(curDate);
      // onChange?.(curDate)
    }
    let content = row+1;
    let key = `${row}`
    if(firstDay || firstDay === 0) {
      content = new Date(date.getFullYear(), date.getMonth(), row - firstDay + 1).getDate();
      key = `${firstDay}-${row}`
    }
    if(lastDay || lastDay === 0) {
      content = new Date(date.getFullYear(), date.getMonth() + 1, row).getDate();
      key = `${row}-${lastDay}`
    }
    return (
      <div className="calendar-cell" key={key} onClick={handleClick}>
        <div  key={key}className={['calendar-date','calendar-date-circle', selectedCls, disabled].join(' ')} >
          <div key={key} className="calendar-date-value ">
            { content }
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={`calendar`}>
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>{date.getFullYear()}年 {monthNames[date.getMonth()] }</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-body">
        <div className="calendar-week-list"></div>
        <WeekList
          dayStartOfWeek={dayStartOfWeek}
        />
        <div className="calendar-month-cell-body">
          { renderDates() }
          {/* <div className="calendar-cell">
            <div className="calendar-date">
              <div className="calendar-date-value">

              </div>
            </div>
          </div> */}
          {/* <div className="calendar-month-row">
          </div> */}
        </div>
      </div>
      <div className="calendar-footer-btn-wrapper"></div>
    </div>
  )
}

const WrappedCalendar = forwardRef<CalendarRef, CalendarProps>(Calendar);
export default WrappedCalendar;
