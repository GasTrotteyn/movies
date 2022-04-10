import React, { useState } from 'react'
import { Movie } from '../interfaces'
import { Link } from 'react-router-dom'
import Axios from 'axios'

const SearchSection = ({ ...props }) => {
	const [stringSearch, setStringSearch] = useState('')
	const [result, setResult] = useState<Movie>({})

	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStringSearch(e.target.value)
	}

	let content = null

	const search = () => {
		Axios.get(process.env.REACT_APP_BASE_URL + '/movies/' + stringSearch).then((resp) => {
			setResult(resp.data)
		})
	}

	if (result.titulo) {
		content = (
			<div key={result.titulo} style={{ border: 'red 1px solid', margin: '20px' }}>
				<h3>{result.titulo}</h3>
				<p>
					<strong style={{ color: 'gray' }}>Año:</strong> {result.año}
				</p>
				<p>
					<strong style={{ color: 'gray' }}>Director: </strong>
					{result.director}
				</p>
				<p>
					<strong style={{ color: 'gray' }}>Género: </strong>
					{result.genero}
				</p>
				<p>
					<strong style={{ color: 'gray' }}>Actores: </strong> {result.actores}
				</p>
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
		<div style={{ border: 'blue 1px solid', margin: '20px', padding: '20px' }}>
			<div>
				<input
					onChange={inputHandler}
					type='text'
					value={stringSearch}
					placeholder='Encontrá la peli que estás buscando...'></input>
				<button onClick={search} type='button'>
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
