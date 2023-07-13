import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ButtonBack from "../Common/ButtonBack/ButtonBack";
import { TabTitle } from "../Common/TabTitle/TabTitle";
import Check from "./Check/Check";
import NoPaidConsultsPage from "./NoPaidConsultsPage/NoPaidConsultsPage";
import PaidConsultsPage from "./PaidConsultsPage/PaidConsultsPage";
import style from "./PaymentPage.module.css";
import PayTutorial from "./PayTutorial/PayTutorial";
import DropDownList from './../Common/DropDownList/DropDownList'
import { fetchUnpaidAppointment } from "../../store/AppointmentSlice";

const PaymentPage = () => {
  const [isFirstEnter, setIsFirstEnter] = useState(true);
  const [consultType, setConsultType] = useState("noPaidConsults");
  const consultsList = useSelector((state) => state.userServices.userServices);
  const token = useSelector(state => state.auth.token)
  const userId = useSelector((state) => state.user.externalId);
  const unpaidAppointments = useSelector(state => state.appointment.unpaidAppointments);
  const [isOpenPayTutorial, setIsOpenPayTutorial] = useState(false);
  const [paySelectServices, setPaySelectServices] = useState(false)
  // const noPaidConsults = consultsList.filter((c) => !c.isPaid);

  const [listServices, setListServices] = useState(unpaidAppointments);


  let paidConsultsList = consultsList.filter((c) => c.isPaid);

  const selectConsultType = (event) => {
    setConsultType(event.target.value);
  };

  const selectedPay = (idList) => {
    let curList = []
    idList.map(a => listServices.map(b => b.id === a && curList.push(b)))
    setListServices(curList)
    setPaySelectServices(true)
  }

  const backFromPayPage = () => {
    setPaySelectServices(false)
    setListServices(unpaidAppointments)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUnpaidAppointment({token, userId}))
  }, [])
  console.log(listServices);
  return (
    <div>
      {paySelectServices ? (
        <div>
          <TabTitle title={'Оплата выбранных услуг'}/>
          <ButtonBack
        handleClick={() => {backFromPayPage()}}
      />
      <Check consultsList={listServices} btnText='Оплатить онлайн' btnColor='#2C60E3'/>
        </div>
      ) : (
        <div>
          <div className={isFirstEnter && style.blur}>
            <TabTitle title={'Оплата услуг'}/>
          </div>
          {isOpenPayTutorial ? (
            <PayTutorial setIsFirstEnter={setIsFirstEnter} setIsOpenPayTutorial={setIsOpenPayTutorial} />
          ) : (
            <div className={style.content}>
              <div className={style.content__dropDownList  + ' ' + (isFirstEnter && style.blur)}>
                <DropDownList
                  handleChange={selectConsultType}
                  first={{ value: "noPaidConsults", text: "Услуги к оплате" }}
                  second={{ value: "paidConsults", text: "Оплаченные услуги" }}
                />
              </div>
              {consultType === "noPaidConsults" ? (
                <NoPaidConsultsPage
                isFirstEnter={isFirstEnter}
                setPaySelectServices={setPaySelectServices}
                  consultsList={listServices}
                  setIsOpenPayTutorial={setIsOpenPayTutorial}
                  selectedPay={selectedPay}
                />
              ) : (
                <PaidConsultsPage consultsList={paidConsultsList} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
