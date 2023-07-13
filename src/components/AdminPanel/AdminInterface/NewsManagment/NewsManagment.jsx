import React, { useEffect } from "react";
import { TabTitle } from "../../../Common/TabTitle/TabTitle";
import BlueButton from "../../../Common/BlueButton/BlueButton";
import s from "./NewsManagment.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../../../store/NewsSlice";
import NewsItem from "../../../News/NewsItem/NewsItem";
import Preloader from "../../../Common/Preloader/Preloader";

const NewsManagment = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.news.status);
  
  const newsData = useSelector((state) => state.news.newsList);

  useEffect(() => {
    dispatch(fetchNews([false, token]));
  }, [dispatch]);

  return (
    <div>
      <TabTitle title={"Управление новостями"} />
      {status === "pending" ? (
        <Preloader />
      ) : (
        <>
          <NavLink className={s.userInfo} to={"/admin/createNewsItem"}>
            <div className={s.btn}>
              <BlueButton text={"Написать новость"} width="350px" />
            </div>
          </NavLink>
          <div className={s.subtitle}>История новостей</div>
          <NewsItem newsData={newsData} />
        </>
      )}
    </div>
  );
};

export default NewsManagment;
