import React, { useState, useEffect } from 'react'
import { Movie } from '../interfaces'
import { Link } from 'react-router-dom'
import Axios from 'axios'

// interface Result {
// 	titulo?: string
// 	año?: string
// 	director?: string
// 	genero?: string
// 	actores?: string
// 	message?: string
// }

const SearchSection = ({ ...props }) => {
	const [stringSearch, setStringSearch] = useState('')
	const [result, setResult] = useState<Movie>({})

	// useEffect(() => {
	// 	if (moviesList.length === 0) {
	// 		Axios.get(process.env.REACT_APP_BASE_URL + '/movies').then((resp) => {
	// 			setMoviesList(resp.data)
	// 		})
	// 	}
	// }, [moviesList])

	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStringSearch(e.target.value)
	}

	let content = null

	const search = () => {
		console.log(stringSearch)
		Axios.get(process.env.REACT_APP_BASE_URL + '/movies/' + stringSearch).then((resp) => {
			setResult(resp.data)
		})
	}

	if (result.titulo) {
		//console.log(moviesList)
		content = (
			<div style={{ border: 'red 1px solid', margin: '20px' }}>
				<p>{result.titulo}</p>
				<p>{result.director}</p>
				<p>{result.genero}</p>
				<p>{result.actores}</p>
			</div>
		)
	} else {
		content = (
			<div style={{ border: 'red 1px solid', margin: '20px' }}>
				<p>{result.message}</p>
			</div>
		)
	}

	return (
		<div
			className='col-md-6 col-12 d-flex align-items-center'
			style={{ border: 'blue 1px solid', margin: '20px', padding: '20px' }}>
			<div className='searchInput'>
				<input
					onChange={inputHandler}
					className='inputInsideInput'
					type='text'
					value={stringSearch}
					placeholder='Encontrá la peli que estás buscando...'></input>
				<button onClick={search} type='button' className='btn btn-primary btn-lg btn-block'>
					Buscar
				</button>
			</div>
			{content}
			<Link to='/list'>
				<button>Ver todas las pelis</button>
			</Link>
			<Link to='/'>
				<button>Subir mis pelis</button>
			</Link>
		</div>
	)
}

export default SearchSection
