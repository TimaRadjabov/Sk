import React from "react";

import { Icon } from "@iconify/react";
import { Button } from "@material-ui/core";
import Check from "../Check/Check";
import { CalendarCheck } from "../CalendarCheck/CalendarCheck";
import style from "./PaidConsultsPage.module.css";

const PaidConsultsPage = ({ consultsList }) => {
  const buttonStyle = {
    fontFamily: `"Tahoma", "Verdana", sans-serif`,
    textTransform: "none",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "1.19",
    backgroundColor: "#2C60E3",
    boxShadow: "0px 4px 20px 1px rgba(44, 96, 227, 0.25)",
    width: "160px",
    padding: "12px",
    color: "#FFFFFF",
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <CalendarCheck />
        <div className={style.form__buttons}>
          {["Word", "Excel"].map((b) => (
            <Button
              key={b.id}
              startIcon={
                <Icon icon="material-symbols:download" color="white" />
              }
              variant="contained"
              style={buttonStyle}
            >
              {b}
            </Button>
          ))}
        </div>
      </div>
      <Check
        consultsList={consultsList}
        btnText="Оплачено"
        btnColor="#20AD25"
        disabled={true}
      />
    </div>
  );
};

export default PaidConsultsPage;
