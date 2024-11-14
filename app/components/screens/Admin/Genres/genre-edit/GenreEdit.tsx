import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import formStyles from '../../../../shared/admin/adminForm.module.scss'
import { IGenreEditInput } from './genre-edit.interface'
import useGenreEdit from './useGenreEdit'
import dynamic from 'next/dynamic'
import { stripHtml } from 'string-strip-html'

const DynamicTextEditor = dynamic(() => import('../../../../ui/form-elements/TextEditor'), { ssr: false })

const GenreEdit: FC = () => {
	const { handleSubmit, register, formState: { errors }, setValue, getValues, control } = useForm<IGenreEditInput>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit } = useGenreEdit(setValue)

	return (
		<Meta title='Users'>
			<AdminNavigation />
			<Heading title='Update Genre' />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading
					? <SkeletonLoader count={3} />
					: <>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required!'
								})}
								placeholder='Name'
								error={errors.name}
								style={{ width: '31%' }}
							/>
							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() => {
										setValue('slug', generateSlug(getValues('name')))
									}} />
							</div>
							<Field
								{...register('icon', {
									required: 'Icon is required!'
								})}
								placeholder='Icon'
								error={errors.name}
								style={{ width: '31%' }}
							/>
						</div>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<DynamicTextEditor
									placeholder="Description"
									onChange={onChange}
									error={error}
									value={value}
								/>
							)}
							rules={{
								validate: {
									required: (v) =>
										(v && stripHtml(v).result.length > 0) ||
										'Description is required!',
								},
							}}
						/>
						<Button>Update</Button>
					</>
				}
			</form>
		</Meta>
	)
}

export default GenreEdit