import { FC } from 'react'
import AdminActions from './AdminActions/AdminActions'
import { IAdminTableItem } from './adminTable.interface'
import styles from './AdminTable.module.scss'

const AdminTableItem: FC<IAdminTableItem> = ({ tableItem, removeHandler }) => {
	return (
		<div className={styles.item}>
			{tableItem.items.map((value, index) => <div key={index}>{value}</div>)}
			<AdminActions editUrl={tableItem.editUrl} removeHandler={removeHandler} />
		</div>

	)
}

export default AdminTableItem