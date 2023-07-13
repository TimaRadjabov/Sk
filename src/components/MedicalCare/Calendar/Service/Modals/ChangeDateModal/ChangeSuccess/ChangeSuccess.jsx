import s from './ChangeSuccess.module.css'
import { Icon } from '@iconify/react'
import { Button } from '@mui/material'

const ChangeSuccess = (props) => {
	return (
		<div className={s.window}>
			<div className={s.content}>
				<div className={s.crossBtn}>
					<button onClick={props.close}>
						<svg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M20.585 2.41467L2.41455 20.5851M20.585 20.5851L2.41455 2.41467L20.585 20.5851Z'
								stroke='#2C60E3'
								stroke-width='3'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>
					</button>
				</div>
				<div className={s.icon}>
					<svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M24.9995 0C11.2141 0 0 11.215 0 25C0 38.785 11.2141 50 24.9995 50C38.7849 50 50 38.785 50 25C50 11.215 38.7849 0 24.9995 0ZM24.9995 46.7212C13.0225 46.7212 3.27875 36.977 3.27875 25C3.27875 13.0229 13.0224 3.27888 24.9995 3.27888C36.9766 3.27888 46.7209 13.023 46.7209 25C46.721 36.977 36.9765 46.7212 24.9995 46.7212Z'
							fill='#244EB8'
						/>
						<path
							d='M34.0505 16.8158L21.1591 29.7066L15.948 24.4966C15.3076 23.857 14.2703 23.8566 13.6299 24.497C12.9893 25.1376 12.9893 26.1751 13.6299 26.8155L20.0003 33.1848C20.3204 33.5046 20.7398 33.6646 21.1591 33.6646C21.5785 33.6646 21.999 33.5046 22.319 33.1843C22.32 33.183 22.3208 33.1816 22.3224 33.18L36.3685 19.134C37.0091 18.494 37.0091 17.4557 36.3685 16.8157C35.7283 16.1753 34.6901 16.1753 34.0505 16.8158Z'
							fill='#244EB8'
						/>
					</svg>
				</div>
				<div className={s.title}>Перенос талона сделан</div>
				<div className={s.bottomContent}>
					<div className={s.bottomContentItem}>
						<div className={s.itemIcon}>
							<svg width='25' height='26' viewBox='0 0 25 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<rect width='25' height='25' transform='translate(0 0.5)' fill='white' />
								<path
									d='M10.9375 18.4688H17.1875V20.0312H10.9375V18.4688ZM7.8125 18.4688H9.375V20.0312H7.8125V18.4688ZM10.9375 14.5625H17.1875V16.125H10.9375V14.5625ZM7.8125 14.5625H9.375V16.125H7.8125V14.5625ZM10.9375 10.6562H17.1875V12.2188H10.9375V10.6562ZM7.8125 10.6562H9.375V12.2188H7.8125V10.6562Z'
									fill='#333333'
								/>
								<path
									d='M19.5312 4.40625H17.1875V3.625C17.1875 3.2106 17.0229 2.81317 16.7299 2.52015C16.4368 2.22712 16.0394 2.0625 15.625 2.0625H9.375C8.9606 2.0625 8.56317 2.22712 8.27015 2.52015C7.97712 2.81317 7.8125 3.2106 7.8125 3.625V4.40625H5.46875C5.05435 4.40625 4.65692 4.57087 4.3639 4.8639C4.07087 5.15692 3.90625 5.55435 3.90625 5.96875V22.375C3.90625 22.7894 4.07087 23.1868 4.3639 23.4799C4.65692 23.7729 5.05435 23.9375 5.46875 23.9375H19.5312C19.9457 23.9375 20.3431 23.7729 20.6361 23.4799C20.9291 23.1868 21.0938 22.7894 21.0938 22.375V5.96875C21.0938 5.55435 20.9291 5.15692 20.6361 4.8639C20.3431 4.57087 19.9457 4.40625 19.5312 4.40625V4.40625ZM9.375 3.625H15.625V6.75H9.375V3.625ZM19.5312 22.375H5.46875V5.96875H7.8125V8.3125H17.1875V5.96875H19.5312V22.375Z'
									fill='#333333'
								/>
							</svg>
						</div>
						<div className={s.itemName}>Прием (осмотр, консультация) врача-онколога первичный</div>
					</div>
					<div className={s.bottomContentItem}>
						<div className={s.itemIconNorm}>
							<svg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									fill-rule='evenodd'
									clip-rule='evenodd'
									d='M4.6043 8.02109C3.5207 8.21797 2.51367 8.74062 1.72383 9.53047C0.701172 10.5531 0.126953 11.9398 0.126953 13.3859V16.5414C0.126953 17.8359 1.17617 18.8852 2.4707 18.8852C5.73945 18.8852 13.2645 18.8852 16.5332 18.8852C17.8277 18.8852 18.877 17.8359 18.877 16.5414V13.3859C18.877 11.9398 18.3027 10.5531 17.2801 9.53047C16.4902 8.74062 15.4832 8.21797 14.3996 8.02109C14.7652 7.2875 14.9707 6.46094 14.9707 5.58594C14.9707 2.56797 12.5199 0.117188 9.50195 0.117188C6.48398 0.117188 4.0332 2.56797 4.0332 5.58594C4.0332 6.46094 4.23867 7.2875 4.6043 8.02109ZM14.1848 9.57109V11.1953C15.0941 11.5172 15.7473 12.3859 15.7473 13.4062C15.7473 14.2664 15.7504 14.9648 15.7504 14.9648C15.7527 15.3961 15.4043 15.7477 14.973 15.75C14.5418 15.7516 14.1902 15.4031 14.1879 14.9727C14.1879 14.9727 14.1848 14.2703 14.1848 13.4062C14.1848 12.975 13.8363 12.625 13.4059 12.625C12.9754 12.625 12.627 12.975 12.627 13.4062L12.6254 14.9695C12.6246 15.4008 12.2746 15.7508 11.8434 15.75C11.4121 15.7492 11.0621 15.3992 11.0629 14.968C11.0629 14.968 11.0645 13.4055 11.0645 13.4062C11.0645 12.3875 11.7152 11.5203 12.6223 11.1969V10.0773C11.7371 10.6938 10.6613 11.0547 9.50195 11.0547C8.33867 11.0547 7.25898 10.6906 6.37227 10.0703V11.1961C7.28242 11.518 7.93477 12.3867 7.93477 13.4062C7.93477 14.7 6.88477 15.75 5.59102 15.75C4.29727 15.75 3.24727 14.7 3.24727 13.4062C3.24727 12.3867 3.89961 11.518 4.80977 11.1961V9.57266C4.06445 9.72344 3.37461 10.0898 2.8293 10.6352C2.09961 11.3648 1.68945 12.3547 1.68945 13.3859V16.5414C1.68945 16.9727 2.03945 17.3227 2.4707 17.3227H16.5332C16.9645 17.3227 17.3145 16.9727 17.3145 16.5414V13.3859C17.3145 12.3547 16.9043 11.3648 16.1754 10.6352C15.6277 10.0875 14.9332 9.72031 14.1848 9.57109ZM5.59102 12.625C6.02227 12.625 6.37227 12.975 6.37227 13.4062C6.37227 13.8375 6.02227 14.1875 5.59102 14.1875C5.15977 14.1875 4.80977 13.8375 4.80977 13.4062C4.80977 12.975 5.15977 12.625 5.59102 12.625ZM9.50195 1.67969C11.6582 1.67969 13.4082 3.43047 13.4082 5.58594C13.4082 7.74219 11.6582 9.49219 9.50195 9.49219C7.3457 9.49219 5.5957 7.74219 5.5957 5.58594C5.5957 3.43047 7.3457 1.67969 9.50195 1.67969Z'
									fill='#333333'
								/>
							</svg>
						</div>
						<div className={s.itemName}>Прием (осмотр, консультация) врача-онколога первичный</div>
					</div>

					<div className={`${s.bottomContentItem} ${s.itemLast}`}>
						<div className={s.itemIconNorm}>
							<svg width='19' height='21' viewBox='0 0 19 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M17.3125 2.125H14.9688V1.34375C14.9688 1.13655 14.8864 0.937836 14.7399 0.791323C14.5934 0.64481 14.3947 0.5625 14.1875 0.5625C13.9803 0.5625 13.7816 0.64481 13.6351 0.791323C13.4886 0.937836 13.4062 1.13655 13.4062 1.34375V2.125H5.59375V1.34375C5.59375 1.13655 5.51144 0.937836 5.36493 0.791323C5.21841 0.64481 5.0197 0.5625 4.8125 0.5625C4.6053 0.5625 4.40659 0.64481 4.26007 0.791323C4.11356 0.937836 4.03125 1.13655 4.03125 1.34375V2.125H1.6875C1.2731 2.125 0.875671 2.28962 0.582646 2.58265C0.28962 2.87567 0.125 3.2731 0.125 3.6875V19.3125C0.125 19.7269 0.28962 20.1243 0.582646 20.4174C0.875671 20.7104 1.2731 20.875 1.6875 20.875H17.3125C17.7269 20.875 18.1243 20.7104 18.4174 20.4174C18.7104 20.1243 18.875 19.7269 18.875 19.3125V3.6875C18.875 3.2731 18.7104 2.87567 18.4174 2.58265C18.1243 2.28962 17.7269 2.125 17.3125 2.125ZM4.03125 3.6875V4.46875C4.03125 4.67595 4.11356 4.87466 4.26007 5.02118C4.40659 5.16769 4.6053 5.25 4.8125 5.25C5.0197 5.25 5.21841 5.16769 5.36493 5.02118C5.51144 4.87466 5.59375 4.67595 5.59375 4.46875V3.6875H13.4062V4.46875C13.4062 4.67595 13.4886 4.87466 13.6351 5.02118C13.7816 5.16769 13.9803 5.25 14.1875 5.25C14.3947 5.25 14.5934 5.16769 14.7399 5.02118C14.8864 4.87466 14.9688 4.67595 14.9688 4.46875V3.6875H17.3125V6.8125H1.6875V3.6875H4.03125ZM17.3125 19.3125H1.6875V8.375H17.3125V19.3125Z'
									fill='#333333'
								/>
							</svg>
						</div>
						<div className={s.itemName}>Прием (осмотр, консультация) врача-онколога первичный</div>
					</div>

					<Button onClick={props.close} sx={{ width: '100%', p: '11px 16px' }} variant='contained'>
						Перейти к услугам
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ChangeSuccess
