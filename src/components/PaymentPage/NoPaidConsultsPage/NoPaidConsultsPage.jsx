import { Button, List} from "@mui/material";
import React, { useState } from "react";
import style from "./NoPaidConsultsPage.module.css";
import styleX from "./../ConsultsPayList/ConsultsPayList.module.css";
import BlueButton from "../../Common/BlueButton/BlueButton";
import dayjs from "dayjs";

const NoPaidConsultsPage = ({
  consultsList,
  setIsOpenPayTutorial,
  setPaySelectServices,
  isFirstEnter,
  selectedPay,
}) => {
  const [idList, setIdList] = useState([]);

  const toggleClick = (id) => {
    if (idList.includes(id)) {
      setIdList(idList.filter((a) => a !== id));
    } else {
      setIdList([...idList, id]);
    }
    
  };

  const onSelectedPay = () => {
    selectedPay(idList);
    setIdList([]);
  };
  return (
    <div className={style.container}>
      <div className={style.payButtonContainer}>
        <Button
          onClick={() => {
            setIsOpenPayTutorial(true);
          }}
          variant="outlined"
          sx={{
            textTransform: "none",
            width: "255px",
            height: "48px",
            fontWeight: "700",
            mb: "30px",
          }}
        >
          Как оплатить
        </Button>
        <div className={isFirstEnter ? style.payMessage : style.displayNone}>
          <div className={style.square}></div>
          Перед оплатой советуем ознакомиться с порядком и методами оплаты.
        </div>
      </div>
      <div className={idList.length === 0 ? style.displayNone : style.payHelp}>
        Нажмите на все услуги, которые хотите оплатить за один раз.
      </div>
      <div className={isFirstEnter && style.blur}>
        <List className={styleX.list}>
          {consultsList.map((s) => {
            return (
              <li key={s.id} className={idList.includes(s.id) ? styleX.list__check : styleX.list__item}>
                <div className={styleX.list__wrapper}>
                  <label className={style.checkbox}>
                    <input
                      type="checkbox"
                      className={style.checkbox__field}
                      onChange={() => toggleClick(s.id)}
                    />
                    <span className={style.checkboxText}></span>
                  </label>
                  <div>
                    <h2 className={styleX.item__title}>{s.medical_service_name}</h2>
                    <div className={styleX.item__info}>
                      <div className={styleX.item__info_part}>
                        <p>Сумма к оплате: </p>
                        <p className={styleX.item__info_bold}>
                          {s.price} рублей
                        </p>
                      </div>
                      <div className={styleX.item__info_part}>
                        <p>Оплатить до: </p>
                        <p className={styleX.item__info_date}>
                          {dayjs(s.endDate).format("DD-MM-YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </List>
        <div className={style.payButtons}>
          <BlueButton
            handleClick={() => {
              setPaySelectServices(true);
            }}
            text={"Оплатить все"}
            width="100%"
          />
          <BlueButton
            disabled={idList.length === 0}
            text={"Оплатить выборочно"}
            width="100%"
            handleClick={() => onSelectedPay()}
          />
        </div>
      </div>
    </div>
  );
};

export default NoPaidConsultsPage;
