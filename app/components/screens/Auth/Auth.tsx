import { FC, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'
import Meta from '@/utils/meta/Meta'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

import { useActions } from '@/hooks/useActions'
import Button from '@/ui/form-elements/Button'
import Heading from '@/ui/heading/Heading'
import styles from './Auth.module.scss'
import AuthFields from './AuthFields'

const Auth: FC = () => {
	useAuthRedirect()
	const { isLoading } = useAuth()
	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: registerInput,
		reset,
		handleSubmit,
		formState } = useForm<IAuthInput>({
			mode: 'onChange'
		})

	const { register, login } = useActions()

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type === 'login') login(data)
		else if (type === 'register') register(data)

		reset()
	}

	return (
		<Meta title='Auth'>
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading
						title='Auth'
						className='mb-6'
					></Heading>
					<AuthFields
						register={registerInput}
						formState={formState}
						isPasswordRequired={type !== 'login'}
					/>
					<div className={styles.buttons}>
						<Button
							type='submit'
							disabled={isLoading}
							onClick={() => setType('login')}
						>Login</Button>
						<Button
							type='submit'
							disabled={isLoading}
							onClick={() => setType('register')}
						>Register</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default Auth