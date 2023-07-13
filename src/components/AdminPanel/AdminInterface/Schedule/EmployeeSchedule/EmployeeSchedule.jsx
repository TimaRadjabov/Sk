import { useState } from 'react'
import ButtonBack from '../../../../Common/ButtonBack/ButtonBack'
import { TabTitle } from '../../../../Common/TabTitle/TabTitle'
import s from './EmployeeSchedule.module.css'
import EmployeeSchedulePopup from './EmployeesSchedulePopup/EmployeesSchedulePopup'
import Timetable from './Timetable/Timetable'
import { useNavigate } from 'react-router-dom'


const EmployeeSchedule = props => {
	const [popupClose, setPopupClose] = useState(false);
	const navigate = useNavigate();
	return (
		<>
			<TabTitle title='Просмотр расписания' />

				<ButtonBack handleClick={() => navigate(-1)}/>

			<div className={s.info}>
				<ul>
					<li>
						<div className={s.infoName}>ФИО:</div>
						<div className={s.infoValue}>Иванова Василиса Григорьевна</div>
					</li>
					<li>
						<div className={s.infoName}>Специальность:</div>
						<div className={s.infoValue}>Врач-онколог</div>
					</li>
				</ul>
			</div>
			<Timetable setPopupClose={setPopupClose}/>
			{popupClose ? <EmployeeSchedulePopup setPopupClose={setPopupClose}/> : null}
		</>
	)
}

export default EmployeeSchedule
