import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

const DateTimePick = ({ handleCalenderChange, taskData }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="whitespace-nowrap text-sm font-semibold capitalize md:text-lg">
        Choose time
      </h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker
          minDate={dayjs(Date.now())}
          onChange={handleCalenderChange}
          defaultValue={dayjs(Date.now())}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateTimePick;
