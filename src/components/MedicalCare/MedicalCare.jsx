import React, { useEffect, useState } from "react";
import style from "./MedicalCare.module.css";
import SearchForm from "./SearchForm/SearchForm";
import MedicalCareList from "./MedicalCareList/MedicalCareList";
import SelectedServicePage from "./SelectedServicePage/SelectedServicePage";
import { useDispatch, useSelector } from "react-redux";
import { TabTitle } from "../Common/TabTitle/TabTitle";
import {
  fetchMedicalCareList,
  filterMedicalCares,
} from "../../store/MedicalCareSlice";

import Preloader from "../Common/Preloader/Preloader";
import { fetchDepartments, fetchEmployees } from "../../store/employeeSlice";

const MedicalCare = () => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [isSelectedCare, setIsSelectedCare] = useState({
    isSelect: false,
    id: null,
  });
  const medicalCares = useSelector((state) => state.medicalCare.medicalCare);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.medicalCare.status);
  const closePage = () => {
    setIsSelectedCare({ isSelect: false, id: null });
  };
  useEffect(() => {
    dispatch(fetchEmployees({token}));
    dispatch(fetchDepartments(token));
  }, []);

  const sendDataToParent = ({ paid, doctor, department }) => {
    dispatch(
      fetchMedicalCareList({
        request: {
          paid,
          employeeId: doctor,
          departmentId: department,
        },
        token,
      })
    );
    setIsOpenList(true);
  };

  const searchMedicalCares = (value) => {
    if (!isOpenList) {
      dispatch(
        fetchMedicalCareList({
          request: {
            like: value,
          },
          token,
        })
      );
      setIsOpenList(true);
    }
    let currentList = medicalCares.filter((a) => a.name.includes(value));
    dispatch(filterMedicalCares(currentList));
  };

  return (
    <>
      {/*<MyAccMobile />*/}
      {isSelectedCare.isSelect ? (
        <SelectedServicePage
          medicalCares={medicalCares}
          closePage={closePage}
          id={isSelectedCare.id}
        />
      ) : (
        <div className={style.selectCarePage}>
          <TabTitle title={"Медицинские услуги"} />
          <SearchForm
            searchMedicalCares={searchMedicalCares}
            sendDataToParent={sendDataToParent}
          />
          {status === "pending" ? (
            <div className={style.localPreloader}>
              <Preloader />
            </div>
          ) : (
            isOpenList && (
              <MedicalCareList
                medicalCares={medicalCares}
                setIsSelectedCare={setIsSelectedCare}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default MedicalCare;
