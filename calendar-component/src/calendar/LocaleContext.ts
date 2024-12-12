import { createContext } from "react";

export interface LocaleContextType {
  locale: string;
}
const CalendarContext = createContext<LocaleContextType>({
    locale: 'zh-CN',
})

export default CalendarContext;
