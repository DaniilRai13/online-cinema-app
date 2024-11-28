import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import SlideArrow from './SlideArrow/SlideArrow'
import SlideItem from './SlideItem'
import { ISlide } from './slider.interface'
import styles from './Slider.module.scss'
import { useSlider } from './useSlider'

interface ISlider {
	buttonTitle?: string
	slides: ISlide[]
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { slideIn, index, isNext, isPrev, handleClick } = useSlider(slides.length)
	return (
		<div className={styles.slider}>
			{isPrev && <SlideArrow variant='left' clickHandler={() => handleClick('prev')} />}
			<CSSTransition
				in={slideIn}
				classNames='slide-animation'
				timeout={300}
				unmountOnExit
			>
				<SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>
			{isNext && <SlideArrow variant='right' clickHandler={() => handleClick('next')} />}
		</div>
	)
}

export default Slider