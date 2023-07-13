import React from "react";

import { UserInformationInput } from "../UserInformationInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import s from "../UserInformation.module.css";

import {
  cyrrilicLatterRegex,
  dayRegex,
  monthRegex,
  yearRegex,
} from "../constants";

const UserInfoFirst = ({ header, handleFormSubmit }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = ({ nam, fam, otch, male, bornDay, bornMonth, bornYear }) => {
    const born = `${bornDay}.${bornMonth}.${bornYear}`;
    handleFormSubmit({ nam, fam, otch, male, born });
    navigate("second");
  };
  const keyController = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /[0-9]/; // Регулярное выражение для проверки цифр
    if (!regex.test(keyValue)) {
      event.preventDefault(); // Блокировка ввода нежелательных символов
    }
  };

  return (
    <div className={s.form__block}>
      <div className={s.headerText}>
        <h1>{header}</h1>
        <div className={s.dots}>
          <div className={`${s.dot} ${s.active}`} />
          <div className={`${s.dot} `} />
          <div className={`${s.dot} `} />
        </div>
      </div>
      <form noValidate className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={s.subtitle}>Общие Данные</h2>
        <div className={s.column}>
          <div>
            <div>
              <UserInformationInput
                type="radio"
                value="М"
                id="Мужской"
                {...register("male", {
                  required: true,
                })}
                className={s.radioButton}
              />
              <label htmlFor="Мужской">Муж</label>
              <UserInformationInput
                type="radio"
                value="Ж"
                id="Женский"
                {...register("male", {
                  required: true,
                })}
                className={s.radioButton}
              />
              <label htmlFor="Женский">Жен</label>
            </div>
            {errors.male && (
              <span className={s.errorInputWrapper}>
                Пожалуйста, выберите пол
              </span>
            )}
          </div>
          <UserInformationInput
            placeholder="Фамилия"
            {...register("fam", {
              required: true,
              pattern: {
                value: cyrrilicLatterRegex,
                message: "Неккоретно введена фамилия",
              },
            })}
            error={!!errors.fam}
          />
          <UserInformationInput
            placeholder="Имя"
            {...register("nam", {
              required: true,
              pattern: cyrrilicLatterRegex,
            })}
            error={!!errors.nam}
          />
          <UserInformationInput
            placeholder="Отчество"
            {...register("otch", {
              required: true,
              pattern: cyrrilicLatterRegex,
            })}
            error={!!errors.otch}
          />
        </div>
        <h2 className={s.subtitle}>Дата Рождения</h2>
        <div className={s.born_block}>
          <UserInformationInput
            placeholder="День"
            {...register("bornDay", {
              required: true,
              pattern: dayRegex,
            })}
            error={!!errors.bornDay}
            inputMode="numeric"
            onKeyPress={(event) => keyController(event)}
          />
          <UserInformationInput
            placeholder="Месяц"
            {...register("bornMonth", {
              required: true,
              pattern: monthRegex,
            })}
            error={!!errors.bornMonth}
            onKeyPress={(event) => keyController(event)}
          />
          <UserInformationInput
            placeholder="Год"
            {...register("bornYear", {
              required: true,
              pattern: yearRegex,
            })}
            error={!!errors.bornYear}
            onKeyPress={(event) => keyController(event)}
          />
        </div>

        {Object.keys(errors).length ? (
          <div className={s.errorWrapper}>Заполните все поля</div>
        ) : null}

        <button type="submit" className={s.btn}>
          Далее
        </button>
      </form>
    </div>
  );
};
export default UserInfoFirst;
