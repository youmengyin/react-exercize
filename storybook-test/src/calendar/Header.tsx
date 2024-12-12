import { Dayjs } from "dayjs";
import { useContext } from "react";
import CalendarContext from "./LocaleContext";
import allLocales from "./locale";




interface HeaderProps {
  curMonth: Dayjs;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
  todayHandler: () => void;
}
function Header(props: HeaderProps) {
  const {
    curMonth,
    prevMonthHandler,
    nextMonthHandler,
    todayHandler
  } = props;

  const ctx = useContext(CalendarContext)
  const CALENDAR_LOCALE = allLocales[ctx.locale];


  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={prevMonthHandler}>&lt;</div>
        <div className="calendar-header-value">{curMonth.format(CALENDAR_LOCALE.formatMonth)}</div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>&gt;</div>
        <button className="calendar-header-btn" onClick={todayHandler}>{CALENDAR_LOCALE.today}</button>
      </div>
    </div>
  )
}




export default Header;
