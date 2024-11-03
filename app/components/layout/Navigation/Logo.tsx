import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import logoImage from '@/assets/images/logo.png'

const Logo: FC = () => {
	return (
		<Link href='/'>
			<div className='px-layout mb-8 block'>
				<Image
					src={logoImage}
					alt='logo'
					width={247}
					height={34}
					draggable={false}
				/>
			</div>
		</Link>
	)
}

export default Logo