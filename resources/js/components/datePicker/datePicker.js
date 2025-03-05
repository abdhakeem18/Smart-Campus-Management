import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import Timekeeper from "react-timekeeper";
import {
  TimePicker,
  TimeToTimeStamp,
  languageStings,
  dateDiff,
} from "../../../../components/common/helper";

function DatePickers(props) {
  const { data, checkoutKeys, setCheckoutKeys } = props;
  const today = new Date();

  if ([6, 0].includes(today.getUTCDay())) {
    today.setDate(today.getDate() + 1);
  }

  const [isOpenTime, setIsOpenTime] = useState(false);
  const [isCloseTime, setIsCloseTime] = useState(false);

  const selectPickupTime = (e) => {
    setCheckoutKeys((prev) => ({
      ...prev,
      datetime: {
        ...prev?.datetime,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const validateTime = async (time, date, name) => {
    const selectedTime = time?.target ? time?.target?.value : time;

    let minTime = "08:00";
    let maxTime = "17:00";

    if ([6].includes(date)) {
      minTime = "08:00";
      maxTime = "12:00";
    }

    const validTime =
      TimeToTimeStamp(selectedTime) >= TimeToTimeStamp(minTime) &&
      TimeToTimeStamp(selectedTime) <= TimeToTimeStamp(maxTime);

    if (!validTime) {
      if (time?.target) {
        time.target.value = "";
      }

      setCheckoutKeys((prev) => ({
        ...prev,
        error: true,
        error_text: `The opening and closing time should be from ${minTime} to ${maxTime}.`,
      }));
    } else {
      const [hours, minutes] = selectedTime
        .split(":")
        .map((unit) => unit.padStart(2, "0"));

      selectPickupTime({
        target: { value: `${hours}:${minutes}`, name },
      });

      setCheckoutKeys((prev) => ({
        ...prev,
        error: false,
        error_text: "",
      }));
    }
  };

  const selectDate = (date) => {
    if (!date) {
      setCheckoutKeys((prev) => ({
        ...prev,
        error: true,
        error_text: "Invalid date selected. Please select a valid date.",
      }));
      return;
    }

    const selectedDate = new Date(date);
    const dif = dateDiff(selectedDate, today);

    if (dif < 0 || dif > 2) {
      setCheckoutKeys((prev) => ({
        ...prev,
        error: true,
        error_text:
          "FedEx is only allowing pickups to be scheduled for today and tomorrow.",
      }));
    } else {
      setCheckoutKeys((prev) => ({
        ...prev,
        datetime: {
          ...prev?.datetime,
          date: date.toISOString(),
        },
        error: false,
        error_text: "",
      }));
    }
  };

  const [time, setTime] = useState({
    datetime: {
      closing_time: "17:00",
      opening_time: "08:00",
    },
  });

  const handleTimeChange = (newTime, name) => {
    setTime((prev) => ({
      ...prev,
      datetime: {
        ...prev?.datetime,
        [name]: newTime.formatted24,
      },
    }));

    validateTime(
      { target: { value: newTime.formatted24 } },
      new Date(checkoutKeys?.datetime?.date).getUTCDay(),
      name
    );
  };

  return (
    <>
      <div className="row g-4">
        <div className="col-sm-auto">
          <h6 className="mb-0">Pickup date</h6>
          <div className="datepicker-box">
            <DatePicker
              selected={
                checkoutKeys?.datetime?.date
                  ? new Date(checkoutKeys.datetime.date)
                  : today
              }
              startDate={today}
              minDate={today}
              maxDate={addDays(today, data?.carrier_name != "FedEx" ? 5 : 2)}
              defaultValue={data?.pickup_date}
              onChange={(date) => {
                validateTime(
                  checkoutKeys?.datetime?.opening_time,
                  date.getUTCDay(),
                  "opening_time"
                );
                validateTime(
                  checkoutKeys?.datetime?.closing_time,
                  date.getUTCDay(),
                  "closing_time"
                );
                selectDate(date);
              }}
              filterDate={(day) => day.getDay() !== 0 && day.getDay() !== 6}
            />
          </div>
        </div>
        <div className="col-sm-auto">
          <h6 className="mb-0">Opening time</h6>
          <input
            type="text"
            className="form-select input-field fw-semibold"
            value={TimePicker(TimeToTimeStamp(time?.datetime?.opening_time))}
            min="08:00"
            max="17:00"
            name="opening_time"
            placeholder="--:-- --"
            readOnly
            onClick={() => setIsOpenTime(true)}
            onChange={(openingTime) => {
              validateTime(
                openingTime,
                checkoutKeys?.datetime?.date?.getUTCDay(),
                "opening_time"
              );
            }}
            id="opening_time"
          />
          {isOpenTime && (
            <Timekeeper
              time={time?.datetime?.opening_time}
              onChange={(newTime) => handleTimeChange(newTime, "opening_time")}
              onDoneClick={() => setIsOpenTime(false)}
            />
          )}
        </div>
        <div className="col-sm-auto">
          <h6 className="mb-0">Closing time</h6>
          <input
            type="text"
            className="form-select input-field fw-semibold"
            value={TimePicker(TimeToTimeStamp(time?.datetime?.closing_time))}
            min="8:00"
            max="17:00"
            name="closing_time"
            placeholder="--:-- --"
            readOnly
            onClick={() => setIsCloseTime(true)}
            onChange={(closeTime) => {
              validateTime(
                closeTime,
                checkoutKeys?.datetime?.date?.getUTCDay(),
                "closing_time"
              );
            }}
            id="closing_time"
          />
          {isCloseTime && (
            <Timekeeper
              time={time?.datetime?.closing_time}
              onChange={(newTime) => handleTimeChange(newTime, "closing_time")}
              onDoneClick={() => setIsCloseTime(false)}
            />
          )}
        </div>
      </div>
      {checkoutKeys?.error && (
        <div className="invalid-feedback d-block">
          {checkoutKeys?.error_text}
        </div>
      )}
    </>
  );
}

export default DatePickers;
