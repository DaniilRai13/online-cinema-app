import { FC } from 'react'
import style from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import useSearch from './useSearch'
import SearchField from '@/ui/search-field/SearchField'

const Search: FC = () => {
	const { isSuccess, data, handleSearch,searchTerm } = useSearch()

	return (
		<div className={style.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch}/>
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	)
}

export default Search