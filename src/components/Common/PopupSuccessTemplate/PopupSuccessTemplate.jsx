import React, { useEffect } from "react";
import style from "./PopupSuccessTemplate.module.css";
import roundDone from "./../../../media/roundDone.svg";
import { Icon } from "@iconify/react";
import BlueButton from "../BlueButton/BlueButton";
import { formatDate, getTimeFromDate } from "../../../hooks/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeItem } from "../../../store/employeeSlice";
import Preloader from "../Preloader/Preloader";

const PopupSuccessTemplate = ({text, subtext, handleClick, currentMeet}) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchEmployeeItem({ id: currentMeet.employee_id, token: token })); пока не работает на бэке 
  }, [dispatch]);

  const employee = useSelector((state) => state.employee.employeeItem);
 const getFullname = (employee) => {
  // const fullname = `${employee?.lastName} ${employee?.firstName[0]}.${employee?.patronymic[0]}.`пока не работает на бэке 
  const fullname = "Иванов И.И."
    return fullname
 }



  return (
    <div className={style.popupBg}>
      <div className={style.popup}>
        <div className={style.popup__content}>
          <Icon icon="material-symbols:close" className={style.popup__cross} onClick={() => {handleClick(false)}}/>
                {/* {!employee.lastName ? <Preloader /> :  */}
                <>
                <div>
                <img src={roundDone} alt="roundDone" />
                <h1 className={style.title}>{text}</h1>
                {subtext && 
                <p className={style.text}>
                  Вы записались на услугу. Талон будет зарезервирован за Вами до
                  <span className={style.date}> 13.01</span>. Вам надо оплатить услугу в регистратуре чтобы талон не
                  пропал.
                </p>}
                <div className={style.info}>
                  <p>
                    <Icon icon="carbon:result" className={style.info__icon} />
                    Прием (осмотр, консультация) врача-онколога первичный
                  </p>
                  <p>
                    <Icon
                      icon="healthicons:doctor-outline"
                      className={style.info__icon}
                    />
                   {getFullname(employee)}
                  </p>
                  <p>
                    <Icon icon="ph:calendar-blank" className={style.info__icon} />
                    {formatDate(currentMeet.startDate)}; {getTimeFromDate(currentMeet.startDate)}
                  </p>
                </div>
                <div className={style.submitButton__desktop}>
                  <BlueButton width="100%" text="Перейти к услугам" handleClick={handleClick}/>
                </div>
                </div>
                </>
                {/* } */}
        </div>
      </div>
    </div>
  );
};

export default PopupSuccessTemplate;
