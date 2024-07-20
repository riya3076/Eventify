import React from 'react';
import CustomCalendar from '../../components/Calendar/Calendar';

const CalendarPage: React.FC = () => {
  const handleDateSelect = (date: Date) => {
    console.log(date);
  };

  return (
    <div>
      <h1>Calendar</h1>
      <CustomCalendar />
    </div>
  );
};

export default CalendarPage;