import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./SelectedServicePage.module.css";
import { Stack } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ButtonBack from "../../Common/ButtonBack/ButtonBack";
import PopupSuccessTemplate from "../../Common/PopupSuccessTemplate/PopupSuccessTemplate";
import BlueButton from "../../Common/BlueButton/BlueButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorFreeDates,
  fetchDoctorFreeTimes,
  fetchEmployees,
} from "../../../store/employeeSlice";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { createAppointment } from "../../../store/AppointmentSlice";
dayjs.extend(utc);
const SelectedServicePage = ({ id, medicalCares, closePage }) => {
  const employeeId = useSelector((state) => state.employee.employeeList);
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.user.externalId);
  const doctorFreeDates = useSelector(
    (state) => state.employee.doctorFreeDates.dates
  );
  const doctorFreeTimes = useSelector(
    (state) => state.employee.doctorFreeTimes.time
  );
  const formattedTime = doctorFreeTimes
    ? doctorFreeTimes.map((time) => dayjs(time, "HH:mm:ss").format("HH:mm"))
    : "";

  const dispatch = useDispatch();

  const [isReservSuccess, setIsReservSuccess] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState("");
  const [medicalCare, setMedicalCare] = useState(null);
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    dispatch(fetchEmployees({ token }));
    medicalCares.forEach((item) =>
      item.id === id ? setMedicalCare(item.id) : null
    );
    medicalCares.forEach((item) =>
      item.id === id ? setText(item.name) : null
    );
    medicalCares.forEach((item) =>
      item.id === id ? setPrice(item.price) : null
    );
  }, []);

  const handleDoctorChange = (event) => {
    const value = event.target.value;
    setDoctor(value);
    dispatch(fetchDoctorFreeDates({ id: 62162, token }));
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formateddate = dayjs(selectedDate).format("DD.MM.YYYY");
    dispatch(fetchDoctorFreeTimes({ id: 62162, date: formateddate, token }));
  };
  const shouldDisableDate = (date) => {
    const formattedDate = dayjs(date).format("DD.MM.YYYY");
    return doctorFreeDates ? !doctorFreeDates.includes(formattedDate) : null;
  };
  const handleTimeChange = (event) => {
    setAvailableTimes(event.target.value);
  };

  const formateddate = dayjs(selectedDate).format("YYYY-MM-DD");
  const combinedDateTime = `${formateddate}T${availableTimes}:00.000`;
  const formattedDateTime = dayjs
    .utc(combinedDateTime)
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  
  console.log(text);

  const data = {
    id: 0,
    startDate: formattedDateTime,
    endDate: formattedDateTime,
    price,
    employee_id: doctor,
    user_id: userID,
    medical_service_id: medicalCare,
    medical_service_name: text,
  };
  const handleSubmit = () => {
    if (doctor && selectedDate && availableTimes) {
      setIsReservSuccess(true);
    }


    dispatch(createAppointment({ data, token }));

  };

  return (
    <div>
      {isReservSuccess && (
        <PopupSuccessTemplate
          currentMeet={data}
          handleClick={closePage}
          text="Запись на услугу сделана"
          subtext="true"
        />
      )}
      <ButtonBack handleClick={closePage} />
      {medicalCares.map((d) => {
        if (d.id === id) {
          const cost = d.price === 0 ? "Бесплатно" : `${d.price} рублей`;
          return (
            <div key={d.id}>
              <h1 className={style.title}>{d.name}</h1>
              <div className={style.selectInputs}>
                <FormControl sx={{ width: { xs: "344px", md: "255px" } }}>
                  <span className={style.selectInputs__title}>Врач</span>
                  <Select
                    displayEmpty
                    IconComponent={ExpandMoreIcon}
                    onChange={handleDoctorChange}
                    value={doctor || ""}
                    sx={{
                      color: doctor ? "black" : "#B8B8B8",
                    }}
                  >
                    <MenuItem value="">Выбрать</MenuItem>
                    {employeeId.map((item) => (
                      <MenuItem value={item.idEmployee}>
                        {item.idEmployee}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  sx={{
                    width: { xs: "154px", md: "255px" },
                    mt: { xs: "10px", md: "0" },
                  }}
                >
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    sx={{ width: "100px" }}
                  >
                    <Stack>
                      <span className={style.selectInputs__title}>Дата</span>
                      <DesktopDatePicker
                        IconComponent={ExpandMoreIcon}
                        inputFormat={"MM.DD.YYYY"}
                        onChange={handleDateChange}
                        value={selectedDate}
                        renderInput={(params) => <TextField {...params} />}
                        shouldDisableDate={shouldDisableDate}
                      />
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
                <FormControl
                  IconComponent={ExpandMoreIcon}
                  sx={{
                    width: { xs: "154px", md: "160px" },
                    mt: { xs: "10px", md: "0" },
                  }}
                >
                  <span className={style.selectInputs__title}>Время</span>
                  <Select
                    IconComponent={ExpandMoreIcon}
                    id="time"
                    select
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      width: 160,
                      color: availableTimes ? "black" : "#B8B8B8",
                    }}
                    onChange={handleTimeChange}
                    value={availableTimes}
                    displayEmpty
                    renderValue={(value) => (value ? value : "Выбрать")}
                  >
                    {formattedTime &&
                      formattedTime.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className={style.info}>
                <ul className={style.info__first}>
                  <li>Профиль врача:</li>
                  <li>Стоимость услуги:</li>
                  <li>Место оказания:</li>
                  <li>Подготовка к приему:</li>
                </ul>
                <ul className={style.info__second}>
                  <li>{doctor.length !== 0 ? doctor : "Выбор врача"}</li>
                  <li>{cost}</li>
                  <li>{d.qualification ? d.qualification : "Кабинет"}</li>
                  <li>-</li>
                </ul>
              </div>
              <div className={style.submitButton}>
                <BlueButton
                  handleClick={handleSubmit}
                  text="Записаться на услугу"
                  width="100%"
                  disabled={
                    doctor && selectedDate && availableTimes ? false : true
                  }
                />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default SelectedServicePage;
