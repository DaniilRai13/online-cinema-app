"use client"
import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
// import { useNavigation } from 'react-router-dom'

import { IMenuItem } from '../../Menu.interface'

import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { usePathname } from 'next/navigation'
import styles from '../Menu.module.scss'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const pathname = usePathname()
	console.log(pathname, item.link)
	return (
		<li className={cn({
			[styles.active]: pathname === item.link
		})}>
			<Link href={item.link}>
				<MaterialIcon name={item.icon} />
				<span>{item.title}</span>
			</Link>
		</li>

	)
}

export default MenuItem