import { FC } from 'react'
import MenuItem from './MenuItem/MenuItem'

import dynamic from 'next/dynamic'
import { IMenu } from './Menu.interface'
import styles from './Menu.module.scss'
const AuthItemsDynamic = dynamic(() => import('../auth/AuthItems'), { ssr: false })
const Menu: FC<{ menu: IMenu }> = ({ menu: { title, items } }) => {
	return (
		<div className={styles.menu}>
			<div className={styles.heading}>{title}</div>
			<ul className={styles.ul}>
				{items.map(item => (
					<MenuItem item={item} key={item.link} />
				))}
				{title === 'General' ? <AuthItemsDynamic /> : null}
			</ul>
		</div>
	)
}

export default Menu