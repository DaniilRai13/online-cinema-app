import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'
import { ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IHome {
	slides: ISlide[]
	actors: IGalleryItem[]
	trendingMovies: IGalleryItem[]
}
export interface ILayout {
	children?: ReactNode
}