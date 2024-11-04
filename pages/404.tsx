import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { NextPage } from 'next'

const Error404: NextPage = () => {
	return (
		<Meta title='Page not found'>
			<Heading title='404 - Page Not Found' />
		</Meta>
	)
}

export default Error404
