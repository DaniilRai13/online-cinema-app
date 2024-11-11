import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Field from '@/components/ui/form-elements/Field'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { IGenreEditInput } from './genre-edit.interface'
import useGenreEdit from './useGenreEdit'

const GenreEdit: FC = () => {
	const { handleSubmit, register, formState: { errors }, setValue, getValues } = useForm<IGenreEditInput>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit } = useGenreEdit(setValue)

	return (
		<Meta title='Users'>
			<AdminNavigation />
			<Heading title='Update Genre' />
			<form onSubmit={handleSubmit(onSubmit)}>
				{isLoading
					? <SkeletonLoader count={3} />
					: <>
						<Field
							{...register('name', {
								required: 'Name is required!'
							})}
							placeholder='Name'
							error={errors.name}
							style={{ width: '31%' }}
						/>
						<Field
							{...register('icon', {
								required: 'Icon is required!'
							})}
							placeholder='Icon'
							error={errors.name}
							style={{ width: '31%' }}
						/>
					</>
				}
			</form>
		</Meta>
	)
}

export default GenreEdit