import { FC } from 'react'
import styles from './AdminNavigation.module.scss'
import { navItems } from './admin-navigation.data'
import AdminNavItem from './admin-nav-item/AdminNavItem'
const AdminNavigation: FC = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				{navItems.map(item => (<AdminNavItem key={item.link} item={item} />))}
			</ul>
		</nav>
	)
}

export default AdminNavigation