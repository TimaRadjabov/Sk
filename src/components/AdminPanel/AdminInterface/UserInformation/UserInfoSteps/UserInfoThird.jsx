import s from "../UserInformation.module.css";
import { UserInformationInput } from "../UserInformationInput";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { cyrrilicLatterRegex } from "../constants";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../../../../Common/ButtonBack/ButtonBack";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, fetchUser, putUser } from "../../../../../store/UserSlice";
import Preloader from "../../../../Common/Preloader/Preloader";
import dayjs from "dayjs";

const UserInfoThird = ({
  header,
  handleNextSlide,
  handleThirdFormSubmit,
  data: { snils, polis_n, nam, fam, otch, male, ser_doc, nom_doc, born },
  token,
  userId,
  type_doc,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const putStatus = useSelector((state) => state.user.putStatus);
  const fetchStatus = useSelector((state) => state.user.status);
  const userExternalID = useSelector((state) => state.user.externalId);
  function convertDateFormat(dateString) {
    const date = dayjs(dateString, 'DD.MM.YYYY');
    const convertedDate = date.format('YYYY-MM-DD');
    return convertedDate;
  }
  const formatBorn = convertDateFormat(born);
  const closePage = () => {
    navigate("/userInfo/second");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = ({ city, street, flat }) => {
    handleThirdFormSubmit({ city, street, flat });
    dispatch(
      putUser({
        snils,
        polis_n,
        userId,
        nam,
        fam,
        otch,
        male,
        ser_doc,
        nom_doc,
        type_doc,
        formatBorn,
        token,
      })
    );
    
  };
  useEffect(() => {
    if (!token ) {
      navigate("/signIn");
    }
    if(!userExternalID && putStatus === 'rejected'){
      dispatch(clearUser());
      navigate("/signIn");
    }
    if (userExternalID) {
      navigate("/user/medicalCare");
    }
    if (putStatus === "resolved" && !fetchStatus) {
      dispatch(fetchUser({ userId, token }));
    }
  }, [putStatus, fetchStatus]);
  return (
    <>
      {putStatus === "pending" ? (
        <div className={s.localPreloader}>
          <Preloader />
        </div>
      ) : (
        <div className={s.form__block}>
          <ButtonBack handleClick={closePage} />
          <div className={s.headerText}>
            <h1>{header}</h1>
            <div className={s.dots}>
              <div className={`${s.dot} ${s.active} `} />
              <div className={`${s.dot} ${s.active} `} />
              <div className={`${s.dot} ${s.active}`} />
            </div>
          </div>
          <form noValidate className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.column}>
              <UserInformationInput
                placeholder="Город"
                {...register("city", {
                  required: true,
                  pattern: {
                    value: cyrrilicLatterRegex,
                    message: "Неккоретно введен город",
                  },
                })}
                error={!!errors.city}
              />
              <UserInformationInput
                placeholder="Улица"
                {...register("street", {
                  required: true,
                  pattern: {
                    value: cyrrilicLatterRegex,
                    message: "Неккоретно введена улица",
                  },
                })}
                error={!!errors.street}
              />
              <UserInformationInput
                placeholder="Квартира"
                {...register("flat", {
                  required: true,
                })}
                error={!!errors.flat}
              />
            </div>
            {Object.keys(errors).length ? (
              <div className={s.errorWrapper}>Заполните все поля</div>
            ) : null}

            <button type="submit" className={s.btn} onClick={handleNextSlide}>
              Сохранить и завершить
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UserInfoThird;
