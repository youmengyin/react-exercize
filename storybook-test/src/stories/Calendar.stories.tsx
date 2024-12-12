import type { Meta, StoryObj } from '@storybook/react';

import Calendar, { CalendarProps } from '../calendar/index';
import dayjs from 'dayjs';

const meta = {
  title: 'Components/日历组件',
  component: Calendar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'], // 自动生成
  // argTypes: {
  //   value: {
  //     control: 'date'
  //   }
  // },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof Calendar>;

export const 基本用法: Story = {};

const defaultOptions = []
for (let i = 1; i <= 50; i++) {
  defaultOptions.push(i);
}
export const Primary: Story = {
  args: { // 需要传入的props，可以自定义
    value: dayjs('2023-8-1'),
    onChange: (v) => {console.log(v)},
    defaultValue: dayjs(),
  },
};

const renderCalendar = (args: CalendarProps) => {
  if(typeof args.value === 'number') {
      return <Calendar {...args} value={dayjs(new Date(args.value))}/>
  }

  return <Calendar {...args}/>
}

export const Value: Story = {
  args: {
    value: dayjs('2023-11-08')
  },
  render: renderCalendar
};

export const DateRender: Story = {
  args: {
      value: dayjs('2023-11-08'),
      dateRender(currentDate) {
          return <div >
              日期{currentDate.date()}
          </div>
      }
  },
  render: renderCalendar
};

export const DateInnerContent: Story = {
  args: {
    value: dayjs('2023-11-08'),
    dateInnerContent(currentDate) {
        return <div>
            日期{currentDate.date()}
        </div>
    }
  },
  render: renderCalendar
};

export const Locale: Story = {
  args: {
    value: dayjs('2023-11-08'),
    // locale: 'en-US'
  },
  render: renderCalendar
};
