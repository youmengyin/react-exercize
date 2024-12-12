import { Dayjs } from "dayjs";
import { CalendarProps } from ".";
import WeekList from "./WeekList";
import allLocales from "./locale";
import { useContext } from "react";
import CalendarContext from "./LocaleContext";

import cs from 'classnames'

interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void;
  curMonth: Dayjs,
}

function getAllDays(date: Dayjs) {
  const startDate = date.startOf('month');
  const day = startDate.day()    
  const daysInfo: Array<{date: Dayjs, currentMonth: boolean}> = new Array(6 * 7);
  for(let i = 0 ; i < day; i++) {
    daysInfo[i] = {
        date: startDate.subtract(day - i, 'day'),
        currentMonth: false
    }
  }
  for(let i = day ; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day');

    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month()
    }
  }
  return daysInfo;
}

function MonthCalendar(props: MonthCalendarProps) {

  const {
    dayStartOfWeek,
    value,
    curMonth,
    selectHandler,
    dateRender,
    dateInnerContent,
  } = props
  const ctx = useContext(CalendarContext)
  const CALENDAR_LOCALE = allLocales[ctx.locale];
  const allDays = getAllDays(curMonth);
  console.log(allDays);
  function renderDays(days: Array<{date: Dayjs, currentMonth: boolean}>) {

    // const selectedCls = row === curMonth.date()? 'calendar-date-selected' : '';
    // const disabled = (firstDay || firstDay === 0||lastDay || lastDay === 0)? 'calendar-date-disabled' : '';

    // const handleClick = () => {
    //   const curDate = new Date(curMonth.getFullYear(), curMonth.getMonth(), row);

    //   onChange?.(curDate)
    //   selectHandler?.(dayjs(curDate))
    // }
    const rows = [];
    for(let i = 0; i < 6; i++ ) {
      const row = [];
      for(let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        row[j] = (
          <div className={"calendar-cell " + (!item.currentMonth ? 'calendar-date-disabled' : '') }
            onClick={()=> selectHandler?.(item.date)}
          >
            {
              dateRender ? dateRender(item.date) : (
                <div className="calendar-date" key={item.date.format('YYYY-MM-DD')}>
                  <div className={cs("calendar-date-value", 
                    value?.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                      ? "calendar-date-selected"
                      : "")} >
                    { item.date.date() }
                  </div>
                  <div className="calendar-month-cell-body-date-content">
                    { dateInnerContent?.(item.date) }
                  </div>
                </div>
              )
            }
          </div>
        )
      }
      rows.push(row);
    }

    return rows.map((row,idx) => <div key={idx} className="calendar-month-row">{row}</div>)
  }

  return (
    <div className="calendar-month">
      <WeekList dayStartOfWeek={dayStartOfWeek} CALENDAR_LOCALE={CALENDAR_LOCALE}  />
      <div className="calendar-month-cell-body">
        {
          renderDays(allDays)
        }
      </div>
    </div>
  )
}


export default MonthCalendar;
