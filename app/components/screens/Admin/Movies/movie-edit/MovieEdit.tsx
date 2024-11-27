import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import UploadField from '@/components/ui/form-elements/UploadFiled/UploadFIeld'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import formStyles from '../../../../shared/admin/adminForm.module.scss'
import { IMovieEditInput } from './movie-edit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import useMovieEdit from './useMovieEdit'

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), { ssr: false })

const MovieEdit: FC = () => {
	const { handleSubmit, register, formState: { errors }, setValue, getValues, control } = useForm<IMovieEditInput>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue)
	const { isLoading: isActorsLoading, data: actors } = useAdminActors()
	const { isLoading: isGenresLoading, data: genres } = useAdminGenres()

	return (
		<Meta title='Users'>
			<AdminNavigation />
			<Heading title='Update Movie' />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading
					? <SkeletonLoader count={3} />
					: <>
						<div className={formStyles.fields}>
							<Field
								{...register('title', {
									required: 'Title is required!'
								})}
								placeholder='Title'
								error={errors.title}
								style={{ width: '31%' }}
							/>
							<div>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() => {
										setValue('slug', generateSlug(getValues('title')))
									}} />
							</div>
							<Field
								{...register('parameters.country', {
									required: 'Country is required!'
								})}
								placeholder='Country'
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.duration', {
									required: 'Duration is required!'
								})}
								placeholder='Duration'
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.year', {
									required: 'year is required!'
								})}
								placeholder='Year'
								error={errors.parameters?.year}
								style={{ width: '31%' }}
							/>

							{/* react select */}

							<Controller
								name="genres"
								control={control}
								render={({
									field,
									fieldState: { error },
								}) => (
									<DynamicSelect
										field={field}
										options={genres || []}
										isLoading={isGenresLoading}
										placeholder='Genres'
										isMulti={true}
										error={error}
									/>
								)}
								rules={{
									required: 'Please select at least one genre!',
								}}
							/>
							<Controller
								name="actors"
								control={control}
								render={({
									field,
									fieldState: { error },
								}) => (
									<DynamicSelect
										field={field}
										options={actors || []}
										isLoading={isActorsLoading}
										placeholder='Actors'
										isMulti={true}
										error={error}
									/>
								)}
								rules={{
									required: 'Please select at least one genre!',
								}}
							/>
							<Controller
								name="poster"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder='movies'
										placeholder='Poster'
									/>
								)}
								rules={{
									required: 'Poster is required!',
								}}
							/>
							<Controller
								name="bigPoster"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder='movies'
										placeholder='Big Poster'
									/>
								)}
								rules={{
									required: 'Poster is required!',
								}}
							/>
							<Controller
								name="videoUrl"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder='movies'
										placeholder='Video'
										style={{ marginTop: -25 }}
										isNoImage
									/>
								)}
								rules={{
									required: 'Video is required!',
								}}
							/>
						</div>
						<Button>Update</Button>
					</>
				}
			</form>
		</Meta>
	)
}

export default MovieEdit