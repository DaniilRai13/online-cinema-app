import { FC } from 'react'
import { IAdminTableItem } from './adminTable.interface'
import styles from './AdminTable.module.scss'
import AdminActions from './AdminActions/AdminActions'

const AdminTableItem: FC<IAdminTableItem> = ({ tableItem, removeHandler }) => {
	return (
		<div className={styles.item}>
			{tableItem.items.map(value => <div key={value}>{value}</div>)}
			<AdminActions editUrl={tableItem.editUrl} removeHandler={removeHandler} />
		</div>

	)
}

export default AdminTableItem