/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import UploadService from '../services/fileUploadService'
import fileCombineService from '../services/fileCombineService'
import { Document } from '../interfaces'

//import classes from './UploadSection.module.css'

const UploadSection = ({ ...props }) => {
	const [currentFile, setCurrentFile] = useState<Document | null>(null)
	const [message, setMessage] = useState(['Elija un archivo ', 'antes de presionar "Subir Archivo"'])
	const [status, setStatus] = useState<JSX.Element>(<></>)
	const [loading, setLoading] = useState(false)
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
		setLoading(true)
		UploadService(currentFile)
			.then((response) => {
				setLoading(false)
				setStatus(
					<div className='my-4 d-flex align-items-center'>
						<strong>El archivo ha sido subido con éxito!</strong>
						<i style={{ color: 'green' }}></i>
					</div>,
				)
				setFileName(response.data.name)
			})
			.catch((e) => {
				console.log(e)
				setLoading(false)
				setStatus(
					<div className='my-4 d-flex align-items-center'>
						<strong>{e?.response?.data || 'Servidor deshabilitado'}</strong>
						<i style={{ color: 'red' }}></i>
					</div>,
				)
			})
	}

	const FileData = () => {
		if (currentFile !== null && currentFile !== undefined) {
			let fileRender: Document = currentFile
			//console.log(fileRender)
			return (
				<div className='my-2'>
					<h2 className='my-2'>Detalles:</h2>
					<p className='my-2'>
						Nombre: <i>{fileRender?.name}</i>
					</p>
					<p className='my-2'>
						Tipo: <i>{fileRender?.type}</i>
					</p>
					{fileRender.lastModifiedDate && (
						<p className='my-2'>
							Última modificación: <i>{fileRender.lastModifiedDate?.toDateString()}</i>
						</p>
					)}
				</div>
			)
		} else {
			return (
				<div>
					<p className='mt-3'>
						<strong>
							<i className='fas fa-exclamation mx-1 alert-icon'></i>
							{message[0]}
						</strong>{' '}
						{message[1]}
					</p>
					<h2>{status}</h2>
				</div>
			)
		}
	}

	const combine = () => {
		fileCombineService(fileName)
			.then((resp) => {
				setResult('se agregaron ' + (resp.data.length + 1) + ' ' + ' películas')
			})
			.catch((e) => {
				console.log(e)
				setResult(e)
			})
	}

	return (
		<div
			className='col-md-6 col-12 d-flex align-items-center'
			style={{ border: 'blue 1px solid', margin: '20px', padding: '20px' }}>
			<div>
				<p className='mt-3'>
					Ingrese aquí el archivo <strong>.csv </strong>que desea enviar
				</p>
				<div className='input-group my-2'>
					<div className='custom-file'>
						<input
							onChange={selectFile}
							type='file'
							className='custom-file-input'
							id='inputGroupFile04'
							aria-describedby='inputGroupFileAddon04'
							autoFocus={true}
						/>
					</div>
				</div>
				<FileData />
				<div className='px-4 d-flex justify-content-center my-3'>
					{loading ? (
						<div className='spinner-border text-primary d-flex justify-content-center' role='status'>
							<span className='sr-only'>Cargando...</span>
						</div>
					) : (
						<button onClick={upload} type='button' className='btn btn-primary btn-lg btn-block' disabled={!currentFile}>
							Subir archivo
						</button>
					)}
				</div>
				<h2>{status}</h2>
				<button onClick={combine} type='button' className='btn btn-primary btn-lg btn-block' disabled={!fileName}>
					¡Quiero sumar esas pelis a la lista!
				</button>
				<h2>{result}</h2>
			</div>
		</div>
	)
}

export default UploadSection
