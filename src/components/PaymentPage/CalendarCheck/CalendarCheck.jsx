import React, { useEffect, useState, useRef } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";

import style from "./CalendarCheck.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import ru from "date-fns/locale/ru";

export const CalendarCheck = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const calendarRef = useRef(null);
  const handleInputClick = (e) => {
    setOpen((open) => !open);
    e.stopPropagation();
  };
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };
  const hideOnClickOutside = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setOpen(false);
    }

  };

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    return () => {
      document.removeEventListener("click", hideOnClickOutside, true);
      document.removeEventListener("keydown", hideOnEscape, true);
    };
  }, []);

  return (
    <div className={style.calendarWrap}>
      <input
        value={`с ${format(range[0].startDate, "dd-MM-yyyy")} по ${format(
          range[0].endDate,
          "dd-MM-yyyy"
        )}`}
        readOnly
        className={style.inputBox}
        type="button"
        onClick={handleInputClick}
      />
      <div ref={calendarRef}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableInputTypes={true}
            moveRangeOnFirstSelection={true}
            ranges={range}
            months={1}
            direction="horizontal"
            className={style.calendarElement}
            locale={ru}
          />
        )}
      </div>
    </div>
  );
};
