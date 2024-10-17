export const getGenresListEach = (index: number, name: string, length: number) => {
	return index + 1 === length ? name : `${name}, `
}