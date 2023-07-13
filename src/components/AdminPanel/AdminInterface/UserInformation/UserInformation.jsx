import React, { useEffect, useState } from "react";

import logo from "../../../../media/logo.svg";
import HeaderMobile from "../../../Registration/HeaderMobile/HeaderMobile";
import s from "./UserInformation.module.css";

import { Route, Routes, useNavigate } from "react-router-dom";
import UserInfoFirst from "./UserInfoSteps/UserInfoFirst";
import UserInfoSecond from "./UserInfoSteps/UserInfoSecond";
import UserInfoThird from "./UserInfoSteps/UserInfoThird";
import { useSelector } from "react-redux";

export const UserInformation = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [secondFormData, setSecondFormData] = useState({});
  const [thirdFormData, setThirdFormData] = useState({});
  const [data, setData] = useState({});
  const userExternalID = useSelector((state) => state.user.externalId);
  if (userExternalID) {
    navigate("/user/medicalCare");
  }
  const handleFormSubmit = (data) => {
    setFormData({ ...data });
  };
  const handleSecondFormSubmit = (data) => {
    setSecondFormData({ ...data });
  };
  const handleThirdFormSubmit = (data) => {
    setThirdFormData({ ...data });
  };
  useEffect(() => {
    setData({ ...formData, ...secondFormData});
  }, [formData, secondFormData]);
  return (
    <>
      <div className={s.wrapper}>
        <HeaderMobile />
        <div className={s.logoWrapper}>
          <img className={s.logo} src={logo} alt={"logo"} />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <UserInfoFirst
                header={"Заполните личные данные"}
                handleFormSubmit={handleFormSubmit}
              />
            }
          />
          <Route
            path="second"
            element={
              <UserInfoSecond
                header={"Заполните документы"}
                handleSecondFormSubmit={handleSecondFormSubmit}
              />
            }
          />
          <Route
            path="third"
            element={ 
              <UserInfoThird
                header={"Заполните адрес проживания"}
                handleThirdFormSubmit={handleThirdFormSubmit}
                data={data}
                type_doc={18}
                token={token}
                userId={userId}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};
