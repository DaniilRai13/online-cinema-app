import { validEmail } from '@/shared/regex'
import Field from '@/ui/form-elements/Field'
import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import { IAuthInput } from './auth.interface'

interface AuthFields {
	register: UseFormRegister<IAuthInput>,
	formState: FormState<IAuthInput>,
	isPasswordRequired?: boolean
}

const AuthFields: FC<AuthFields> = ({ register, formState: { errors }, isPasswordRequired }) => {
	return (
		<>
			<Field {...register('email', {
				required: 'Email is required',
				pattern: {
					value: validEmail,
					message: 'Please enter a valid email address'
				}
			})}
				placeholder='Email'
				error={errors.email} />
			<Field {...register('password', isPasswordRequired ? {
				required: 'Password is required',
				minLength: {
					value: 6,
					message: 'Min length should be more then 6 symbols'
				}
			} : {})}
				placeholder='Password'
				type='password'
				error={errors.password} />
		</>
	)
}

export default AuthFields