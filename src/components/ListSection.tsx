import React, { useState, useEffect, ReactNode } from 'react'
import getAllMovies from '../services/getAllMoviesService'
import { Movie } from '../interfaces'
import { Link } from 'react-router-dom'

import Axios from 'axios'

const ListSection = ({ ...props }) => {
	const [moviesList, setMoviesList] = useState<Movie[]>([])

	useEffect(() => {
		if (moviesList.length === 0) {
			Axios.get(process.env.REACT_APP_BASE_URL + '/movies').then((resp) => {
				setMoviesList(resp.data)
			})
		}
	}, [moviesList])

	let content: JSX.Element | JSX.Element[] = <p>no se cargaron las pelis</p>

	if (moviesList.length !== 0) {
		content = moviesList.map((movie) => {
			return (
				<div key={movie.titulo} style={{ border: 'red 1px solid', margin: '20px' }}>
					<p>{movie.titulo}</p>
					<p>{movie.año}</p>
					<p>{movie.director}</p>
					<p>{movie.genero}</p>
					<p>{movie.actores}</p>
				</div>
			)
		})
	}

	return (
		<div className='col-md-6 col-12 d-flex align-items-center' style={{ border: 'blue 1px solid', margin: '20px' }}>
			<div>{content}</div>
			<Link to='/search'>
				<button>Buscar una peli</button>
			</Link>
			<Link to='/'>
				<button>Subir mis pelis</button>
			</Link>
		</div>
	)
}

export default ListSection
