"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { ISlide } from './slider.interface'
import styles from './Slider.module.scss'

interface ISlideItem {
	slide: ISlide,
	buttonTitle?: string
}

const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle }) => {
	const { push } = useRouter()
	return (
		<div className={styles.slide}>
			{slide.bigPoster && (
				<Image
					fill
					className={styles.image}
					src={slide.bigPoster}
					alt={slide.title}
					draggable={false}
					unoptimized
					priority
				/>
			)}
			<div className={styles.content}>
				<div className={styles.heading}>{slide.title}</div>
				<div className={styles.subHeading}>{slide.subtitle}</div>
				{
					buttonTitle && <button className={styles.button} onClick={() => push(slide.link)}>
						{buttonTitle}
					</button>
				}
			</div>
		</div>

	)
}

export default SlideItem