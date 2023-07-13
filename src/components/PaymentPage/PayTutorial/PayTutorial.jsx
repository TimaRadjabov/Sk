import React, { useState } from "react";
import BlueButton from "../../Common/BlueButton/BlueButton";
import ButtonBack from "../../Common/ButtonBack/ButtonBack";
import style from "./PayTutorial.module.css";

const PayTutorial = ({ setIsOpenPayTutorial, setIsFirstEnter }) => {
  const closeCurrentPage = () => {
    setIsOpenPayTutorial(false);
    setIsFirstEnter(false);
  };

  const [firstCheckbox, setFirstCheckbox] = useState(false);
  const [secondCheckbox, setSecondCheckbox] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleFirstCheckbox = () => {
    setFirstCheckbox(!firstCheckbox);
  };
  const handleSecondCheckbox = () => {
    setSecondCheckbox(!secondCheckbox);
  };
  const handleConfirm = () => {
    if (firstCheckbox && secondCheckbox) {
      setChecked(true);
    }
  };

  return (
    <div className={style.container}>
      <ButtonBack handleClick={closeCurrentPage} />
      <div className={style.content}>
        <div>
          <h2 className={style.title}>Оплата в регистратуре</h2>
          <p>
            «Оплата регистратуре» означает возможность для пациентов оплачивать
            свои медицинские услуги во время их посещения. Это включает в себя
            покрытие расходов на консультации и процедуры. Платежи могут
            производиться различными способами, такими как наличные,
            кредитные/дебетовые карты или страховка.
          </p>
        </div>
        <div>
          <h2 className={style.title}>Оплата онлайн</h2>
          <p>
            «Оплата онлайн» предоставляет пациентам возможность безопасно
            оплатить свои медицинские услуги, не выходя из собственного дома.
            Это включает в себя покрытие расходов на консультации и процедуры.
            Принимаются различные способы оплаты, такие как кредитные/дебетовые
            карты и электронный перевод средств. Эта услуга предназначена для
            того, чтобы сделать процесс оплаты быстрым, простым и безопасным.
          </p>
        </div>
      </div>
      <BlueButton
        width="320px"
        text="Оплатить онлайн"
        handleClick={closeCurrentPage}
        disabled={!checked}
      />
      {!checked ? (
        <div>
          <div className={style.content}>
            <div>
              <h2 className={style.title}>Подтверждение</h2>
              <p>
                В рамках нашей приверженности прозрачности и защите данных, мы
                просим вас установить флажки ниже, чтобы подтвердить свое
                согласие с собираемой информацией и соглашением оферты. Ваше
                согласие имеет решающее значение для нас, и оно поможет нам
                предоставить вам лучший сервис и опыт.
              </p>
              <p>
                Пожалуйста, внимательно ознакомьтесь с условиями и отметьте
                галочки. После данного действия вам будет доступна оплата услуг.
              </p>
            </div>
          </div>
          <div className={style.fields}>
            <label className={style.checkbox}>
              <input
                type="checkbox"
                className={style.checkbox__field}
                checked={firstCheckbox}
                onChange={handleFirstCheckbox}
              />
              <span className={style.checkboxText}>
                Я даю согласие на <a href="#0">обработку персональных данных</a>
              </span>
            </label>
            <label className={style.checkbox}>
              <input
                type="checkbox"
                className={style.checkbox__field}
                checked={secondCheckbox}
                onChange={handleSecondCheckbox}
              />
              <span className={style.checkboxText}>
                Согласен на <a href="#0">обработку персональных данных</a>
              </span>
            </label>
          </div>
          <BlueButton
            width="320px"
            text="Подтвердить выбор"
            handleClick={handleConfirm}
            disabled={firstCheckbox && secondCheckbox ? false : true}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PayTutorial;
