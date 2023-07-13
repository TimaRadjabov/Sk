import React from "react";
import NotificationList from "../AdminPanel/AdminInterface/NotificationManagment/NotificationList/NotificationList";
import { TabTitle } from "../Common/TabTitle/TabTitle";

export const Notifications = () => {

    return (
        <>
            <TabTitle title={'Уведомления'}/>
             <NotificationList />
        </>

    )
}