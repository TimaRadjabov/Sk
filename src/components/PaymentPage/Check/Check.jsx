import { Button } from "@mui/material";
import React from "react";
import style from "./Check.module.css";
import dayjs from "dayjs";

const Check = ({ consultsList, btnText, btnColor }) => {
  let totalPrice = [];
  consultsList.map((a) => totalPrice.push(a.price));
  return (
    <div className={style.check}>
      {consultsList.map((s) => {
        return (
          <div className={style.check__item} key={s.id}>
            <h2 className={style.item__title}>{s.medical_service_name}</h2>
            <div className={style.item__info}>
              <div className={style.item__info_part}>
                <p>Сумма к оплате: </p>
                <p className={style.item__info_bold}>{s.price} рублей</p>
              </div>
              <div className={style.item__info_part}>
                <p>Оплатить до: </p>
                <p className={style.item__info_bold}>{dayjs(s.endDate).format("DD-MM-YYYY")}</p>
              </div>
            </div>
          </div>
        );
      })}
      <p className={style.check__totalPrice}>
        Итоговая сумма к оплате: <span>{totalPrice.reduce((a, b) => a + b)} рублей</span>
      </p>
      <Button
        style={{
          backgroundColor: `${btnColor}`,
          color: "#FFFFFF",
          textTransform: "none",
        }}
        className={style.check__btn}
        
      >
        {btnText}
      </Button>
    </div>
  );
};

export default Check;
