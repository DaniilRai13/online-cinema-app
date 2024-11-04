import { AdminService } from '@/services/admin.service'
import SkeletonLoader from '@/ui/SkeletonLoader'
import cn from 'classnames'
import { FC } from 'react'
import { useQuery } from 'react-query'
import styles from '../Admin.module.scss'

const CountUsers: FC = () => {
	const { isLoading, data: userCount } = useQuery('Count users', () => AdminService.getCountUsers())

	return (
		<div className={cn(styles.block, styles.countUsers)}>
			{isLoading
				? <SkeletonLoader height={25} width={20} />
				: (<div className={styles.number}>{userCount}</div>)}
			<div className={styles.description}>users</div>
		</div >
	)
}

export default CountUsers