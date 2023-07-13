import s from "../UserInformation.module.css";
import { UserInformationInput } from "../UserInformationInput";
import React from "react";
import { useForm } from "react-hook-form";
import {
  docNumRegex,
  docSerRegex,
  polisRegex,
  snilsLastRegex,
  snilsNumRegex,
} from "../constants";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../../../../Common/ButtonBack/ButtonBack";

const UserInfoSecond = ({ header, handleSecondFormSubmit }) => {
  const navigate = useNavigate();
  const closePage = () => {
    navigate("/userInfo");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = ({
    snilsFirstPart,
    snilsSecondPart,
    snilsThirdPart,
    snilsLastPart,
    polis_n,
    ser_doc,
    nom_doc,
  }) => {
    const snils = `${snilsFirstPart}-${snilsSecondPart}-${snilsThirdPart} ${snilsLastPart}`;
    handleSecondFormSubmit({ snils, polis_n, ser_doc, nom_doc });
    navigate("/userInfo/third");
  };
  const snils = "Снилс";
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
      <ButtonBack handleClick={closePage} />
      <div className={s.headerText}>
        <h1>{header}</h1>
        <div className={s.dots}>
          <div className={`${s.dot} ${s.active} `} />
          <div className={`${s.dot} ${s.active} `} />
          <div className={`${s.dot} `} />
        </div>
      </div>
      <form noValidate className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={s.subtitle}>Паспортные данные</h2>
        <div className={s.pasport}>
          <div className={s.pasportSer}>
            <UserInformationInput
              placeholder="Серия"
              name="passport"
              {...register("ser_doc", {
                required: true,
                pattern: {
                  value: docSerRegex,
                  message: "Неверный формат документа",
                },
              })}
              error={!!errors.ser_doc}
              onKeyPress={keyController}
            />
          </div>
          <div className={s.pasportNum}>
            <UserInformationInput
              placeholder="Номер"
              name="nom_doc"
              {...register("nom_doc", {
                required: true,
                pattern: {
                  value: docNumRegex,
                  message: "Неверный формат документа",
                },
              })}
              error={!!errors.nom_doc}
              onKeyPress={keyController}
            />
          </div>
        </div>
        <h2 className={s.subtitle}>{snils.toLocaleUpperCase()}</h2>
        <div className={s.snils}>
          <div className={s.snils_field}>
            <UserInformationInput
              placeholder="123"
              {...register("snilsFirstPart", {
                required: true,
                pattern: {
                  value: snilsNumRegex,
                  message: "Неккоретно введен номер снилса",
                },
              })}
              error={!!errors.snilsFirstPart}
              onKeyPress={keyController}
            />
          </div>
          <div className={s.snils_field}>
            <UserInformationInput
              placeholder="456"
              {...register("snilsSecondPart", {
                required: true,
                pattern: {
                  value: snilsNumRegex,
                  message: "Неккоретно введен номер снилса",
                },
              })}
              error={!!errors.snilsSecondPart}
              onKeyPress={keyController}
            />
          </div>
          <div className={s.snils_field}>
            <UserInformationInput
              placeholder="789"
              {...register("snilsThirdPart", {
                required: true,
                pattern: {
                  value: snilsNumRegex,
                  message: "Неккоретно введен номер снилса",
                },
              })}
              error={!!errors.snilsThirdPart}
              onKeyPress={keyController}
            />
          </div>
          <div className={s.snils_field}>
            <UserInformationInput
              placeholder="00"
              {...register("snilsLastPart", {
                required: true,
                pattern: {
                  value: snilsLastRegex,
                  message: "Неккоретно введен номер снилса",
                },
              })}
              error={!!errors.snilsLastPart}
              onKeyPress={keyController}
            />
          </div>
        </div>
        <h2 className={s.subtitle}>Полис</h2>
        <UserInformationInput
          placeholder="Полис"
          {...register("polis_n", {
            required: true,
            pattern: {
              value: polisRegex,
              message: "Неккоретно введен номер полиса",
            },
          })}
          error={!!errors.polis_n}
          onKeyPress={keyController}  
        />

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

export default UserInfoSecond;
