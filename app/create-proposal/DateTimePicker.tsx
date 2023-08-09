import DatePicker from "react-datepicker";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";

interface OwnProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
  minDate: Date;
}

const DateTimePicker = ({ startDate, setStartDate, minDate}: OwnProps) => {
  const currentTime = new Date();
  let minTime: Date | undefined;
  let maxTime: Date | undefined;

  // Check if the selected date is the current date
  if (startDate.toDateString() === currentTime.toDateString()) {
    minTime = currentTime;
    maxTime = new Date(currentTime);
    maxTime.setHours(23, 59, 59, 999);
  }

  return (
    <DatePicker
      className="text-black"
      selected={startDate}
      onChange={(date) => date && setStartDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      minDate={minDate}
      minTime={minTime}
      maxTime={maxTime}
    />
  );
};

export default DateTimePicker;
