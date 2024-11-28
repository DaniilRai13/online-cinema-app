import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { getActorUrl, getMovieUrl } from '@/config/url.config'
import Home from '@/screens/Home/Home'
import { IHome } from '@/screens/Home/Home.interface'
import { ActorService } from '@/services/actors.service'
import { MovieService } from '@/services/movie.service'
import { ISlide } from '@/ui/slider/slider.interface'
import { getGenresList } from '@/utils/movie/getGenresListEach'
import { GetStaticProps, NextPage } from 'next'

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovies }) => {
  return <Home slides={slides} trendingMovies={trendingMovies} actors={actors} />
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: movies } = await MovieService.getMoviesBySearchTerm()
    const { data: actorsData } = await ActorService.getAll()
    const trendingMoviesData = await MovieService.getMostPopularMovies()

    const slides: ISlide[] = movies.slice(0, 3).map(movie => ({
      _id: movie._id,
      bigPoster: movie.bigPoster,
      title: movie.title,
      link: getMovieUrl(movie.slug),
      subtitle: getGenresList(movie.genres)
    }))

    const actors: IGalleryItem[] = actorsData.slice(0, 5).map(actor => ({
      posterPath: actor.photo,
      name: actor.name,
      link: getActorUrl(actor.slug),
      content: {
        title: actor.name,
        subtitle: `+${actor.countMovies} movies`
      }
    }))

    const trendingMovies: IGalleryItem[] = trendingMoviesData.slice(0, 7).map(movie => ({
      posterPath: movie.poster,
      name: movie.title,
      link: getMovieUrl(movie.slug)
    }))

    return {
      props: {
        slides,
        actors,
        trendingMovies
      } as IHome
    }
  } catch {
    return {
      props: {
        slides: [],
        actors: [],
        trendingMovies: []
      }
    }
  }
}

export default HomePage