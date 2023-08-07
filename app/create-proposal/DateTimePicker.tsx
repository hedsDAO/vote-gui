import DatePicker from "react-datepicker";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";

interface OwnProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
  minDate: Date;
}

const DateTimePicker = ({ startDate, setStartDate, minDate }: OwnProps) => {
  return (
    <DatePicker
      showTimeSelect
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={minDate}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

export default DateTimePicker;
