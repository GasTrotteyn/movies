/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import UploadService from '../services/fileUploadService'
import fileCombineService from '../services/fileCombineService'
import { Document } from '../interfaces'
import { Link } from 'react-router-dom'

const UploadSection = () => {
	const [currentFile, setCurrentFile] = useState<Document | null>(null)
	const [message, setMessage] = useState(['Elija un archivo ', 'antes de presionar "Subir Archivo"'])
	const [status, setStatus] = useState<JSX.Element>(<></>)
	const [fileName, setFileName] = useState('')
	const [result, setResult] = useState('')

	const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return
		}
		setStatus(<></>)
		const inputFile: Document = event.target.files[0]
		if (validation(inputFile)) {
			setCurrentFile(inputFile)
		} else {
			if (inputFile) {
				setCurrentFile(null)
				setMessage([
					'Solo se permiten archivos .csv. ',
					`El archivo seleccionado es de tipo ${'.' + inputFile.name.split('.').pop()}.`,
				])
			}
		}
	}

	const validation = (file: Document) => {
		if (file) {
			return file.type === 'text/csv'
		}
	}

	const upload = () => {
		UploadService(currentFile)
			.then((response) => {
				setStatus(
					<div>
						<strong>El archivo ha sido subido con éxito!</strong>
						<i style={{ color: 'green' }}></i>
					</div>,
				)
				setFileName(response.data.name)
			})
			.catch((e) => {
				console.log(e)
				setStatus(
					<div>
						<strong>{e?.response?.data || 'Servidor deshabilitado'}</strong>
						<i style={{ color: 'red' }}></i>
					</div>,
				)
			})
	}

	const FileData = () => {
		if (currentFile !== null && currentFile !== undefined) {
			let fileRender: Document = currentFile

			return (
				<div>
					<h2>Detalles:</h2>
					<p>
						Nombre: <i>{fileRender?.name}</i>
					</p>
					<p>
						Tipo: <i>{fileRender?.type}</i>
					</p>
					{fileRender.lastModifiedDate && (
						<p>
							Última modificación: <i>{fileRender.lastModifiedDate?.toDateString()}</i>
						</p>
					)}
				</div>
			)
		} else {
			return (
				<div>
					<p>
						<strong>{message[0]}</strong> {message[1]}
					</p>
					<h2>{status}</h2>
				</div>
			)
		}
	}

	const combine = () => {
		fileCombineService(fileName)
			.then((resp) => {
				setResult('se agregaron ' + resp.data.length + ' ' + ' películas')
				setFileName('')
			})
			.catch((e) => {
				console.log(e)
				setResult(e)
			})
	}

	return (
		<div style={{ border: 'blue 1px solid', margin: '20px', padding: '20px' }}>
			<div>
				<p>
					Ingrese aquí el archivo <strong>.csv </strong>que desea enviar
				</p>
				<div>
					<div>
						<input
							onChange={selectFile}
							type='file'
							id='inputGroupFile04'
							aria-describedby='inputGroupFileAddon04'
							autoFocus={true}
						/>
					</div>
				</div>
				<FileData />
				<div>
					<button onClick={upload} type='button' disabled={!currentFile}>
						Subir archivo
					</button>
				</div>
				<h2>{status}</h2>
				<button onClick={combine} type='button' disabled={!fileName}>
					¡Quiero sumar esas pelis a la lista!
				</button>
				<h2>{result}</h2>
				<Link to='/search'>
					<button>Buscar una peli</button>
				</Link>
				<Link to='/list'>
					<button>Ver todas las pelis</button>
				</Link>
			</div>
		</div>
	)
}

export default UploadSection
