export const getGenresListEach = (index: number, name: string, length: number) => {
	return index + 1 === length ? name : `${name}, `
}
interface IArrayItem {
	name: string
}
export const getGenresList = (array: IArrayItem[]) => array.map(item => item.name).join(',')