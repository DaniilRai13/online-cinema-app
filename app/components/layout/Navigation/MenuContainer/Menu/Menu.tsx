import { FC } from 'react'
import MenuItem from './MenuItem/MenuItem'

import AuthItems from '../auth/AuthItems'
import { IMenu } from './Menu.interface'
import styles from './Menu.module.scss'

const Menu: FC<{ menu: IMenu }> = ({ menu: { title, items } }) => {
	return (
		<div className={styles.menu}>
			<div className={styles.heading}>{title}</div>
			<ul className={styles.ul}>
				{items.map(item => (
					<MenuItem item={item} key={item.link} />
					// <div>{item.title}</div>
				))}
			</ul>
			{title === 'General' ? <AuthItems /> : null}
		</div>
	)
}

export default Menu