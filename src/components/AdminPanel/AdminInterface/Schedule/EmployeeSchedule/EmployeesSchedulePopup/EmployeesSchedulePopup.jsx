import React from "react";
import style from "./EmployeesSchedulePopup.module.css";
import { Icon } from "@iconify/react";


const EmployeeSchedulePopup = ({setPopupClose}) => {

  return (
    <div className={style.popupBg}>
      <div className={style.popup}>
        <Icon
          icon="material-symbols:close"
          className={style.popup__cross}
          onClick={() => setPopupClose(false)}
        />
        <div className={style.popup__content}>
          <div>
            <h1 className={style.title}>Данные о расписании</h1>
            <div className={style.line}></div>
            <div className={style.services__wrapper}>
              <div className={style.descr}>
                <p className={style.service__name}>Наименование услуг:</p>
                <p className={style.value}>Консультация врача-онколога</p>
              </div>
              <div className={style.descr}>
                <p className={style.service__name}>Начало:</p>
                <p className={style.value}>12:00</p>
              </div>
              <div className={style.descr}>
                <p className={style.service__name}>Конец:</p>
                <p className={style.value}>15:00</p>
              </div>
              <div className={style.descr}>
                <p className={style.service__name}>Кабинет:</p>
                <p className={style.value}>403</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSchedulePopup;
