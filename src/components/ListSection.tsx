import React, { useState, useEffect } from 'react'
import { Movie } from '../interfaces'
import { Link } from 'react-router-dom'
import Axios from 'axios'

const ListSection = ({ ...props }) => {
	const [moviesList, setMoviesList] = useState<Movie[]>([])
	const [page, setPage] = useState(1)
	const [allMovies, setAllMovies] = useState(0)
	const [message, setMessage] = useState('')

	useEffect(() => {
		if (moviesList.length === 0) {
			Axios.get(process.env.REACT_APP_BASE_URL + '/moviesPag/' + page * 10).then((resp) => {
				setMoviesList(resp.data)
			})
		}
	}, [moviesList])

	useEffect(() => {
		if (allMovies === 0) {
			Axios.get(process.env.REACT_APP_BASE_URL + '/movies').then((resp) => {
				setAllMovies(resp.data.length)
			})
		}
	}, [allMovies])

	const changePagHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPage(parseInt(event.target.value))
		if (parseInt(event.target.value) >= 1 && parseInt(event.target.value) <= Math.trunc(allMovies / 10 + 1)) {
			setMessage('')
			Axios.get(process.env.REACT_APP_BASE_URL + '/moviesPag/' + parseInt(event.target.value) * 10).then((resp) => {
				setMoviesList(resp.data)
			})
		} else {
			setMessage('número de página inválido')
		}
	}

	const decrementHandler = () => {
		if (page > 1) {
			setPage((prev) => {
				return prev - 1
			})
			Axios.get(process.env.REACT_APP_BASE_URL + '/moviesPag/' + (page - 1) * 10).then((resp) => {
				setMoviesList(resp.data)
			})
		}
	}

	const incrementtHandler = () => {
		if (page < allMovies / 10)
			setPage((prev) => {
				return prev + 1
			})
		Axios.get(process.env.REACT_APP_BASE_URL + '/moviesPag/' + (page + 1) * 10).then((resp) => {
			setMoviesList(resp.data)
		})
	}

	let content: JSX.Element | JSX.Element[] = <p>no se cargaron las pelis</p>

	if (moviesList.length !== 0) {
		content = moviesList.map((movie) => {
			return (
				<div key={movie.titulo} style={{ border: 'red 1px solid', margin: '20px' }}>
					<h3>{movie.titulo}</h3>
					<p>
						<strong style={{ color: 'gray' }}>Año:</strong> {movie.año}
					</p>
					<p>
						<strong style={{ color: 'gray' }}>Director: </strong>
						{movie.director}
					</p>
					<p>
						<strong style={{ color: 'gray' }}>Género: </strong>
						{movie.genero}
					</p>
					<p>
						<strong style={{ color: 'gray' }}>Actores: </strong> {movie.actores}
					</p>
				</div>
			)
		})
	}

	let totalOfMovies: JSX.Element | JSX.Element[] = <p>el total de pelis es cero</p>
	if (allMovies !== 0) {
		totalOfMovies = <p>el total de pelis es: {allMovies}</p>
	}

	return (
		<div className='col-md-6 col-12 d-flex align-items-center' style={{ border: 'blue 1px solid', margin: '20px' }}>
			<div>
				<h2>Página</h2>
			</div>
			<div>
				<button onClick={decrementHandler} disabled={page === 1}>
					-
				</button>
				<input type='number' placeholder='numero de pagina' onChange={changePagHandler} value={page} />
				<button onClick={incrementtHandler} disabled={page >= Math.trunc(allMovies / 10 + 1)}>
					+
				</button>
			</div>
			<div style={{ border: 'blue 1px solid', margin: '20px', padding: '20px' }}>
				<Link to='/search'>
					<button>Buscar una peli</button>
				</Link>
				<Link to='/'>
					<button>Subir mis pelis</button>
				</Link>
			</div>
			<div>{totalOfMovies}</div>
			<div style={{ border: 'blue 1px solid', margin: '20px', padding: '20px', color: 'red' }}>{message}</div>
			<div>{content}</div>
		</div>
	)
}

export default ListSection
