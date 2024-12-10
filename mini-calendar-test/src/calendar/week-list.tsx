import { Calendar_Ctx } from "./constants";

interface WeekListProps {
  dayStartOfWeek?: 0 | 1;
  CALENDAR_LOCALE?: Record<string, any>;
  panel?: boolean;
  innerMode?: 'day' | 'week' | 'month' | 'year';
}

const WeekList = (props: WeekListProps) => {
  const { dayStartOfWeek = 0, CALENDAR_LOCALE= Calendar_Ctx, panel, innerMode } = props;
  const weekList = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] ;
  if (dayStartOfWeek === 0) {
    weekList.unshift('sunday');
  } else {
    weekList.push('sunday');
  }
  const weekLocale = CALENDAR_LOCALE.week[panel || innerMode === 'year' ? 'short' : 'long'];

  return (
    <div className="calendar-week-list">
      {
        weekList.map((item) => {
          return (
            <div className="calendar-week-list-item" key={item}>
              {weekLocale[item]}
            </div>
          )
        })
      }
      
    </div>
  )
}

export default WeekList;
