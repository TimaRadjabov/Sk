import { TabTitle } from '../../../../Common/TabTitle/TabTitle'
import ButtonBack from '../../../../Common/ButtonBack/ButtonBack'
import { NavLink } from 'react-router-dom'
import NotificationForm from './NotificationForm/NotificationForm'

const CreateNotification = props => {
	return (
		<>
			<TabTitle title='Новая новость' />
			<div style={{ marginBottom: '50px' }}>
				<NavLink to={'/admin/adminInterFace/notificationManagment/'}>
					<ButtonBack />
				</NavLink>
			</div>
			<NotificationForm />
		</>
	)
}

export default CreateNotification