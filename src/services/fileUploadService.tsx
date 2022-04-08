import Axios from 'axios'

const upload = (file: any) => {
	let formData = new FormData()

	formData.append('file', file)
	//console.log(process.env.REACT_APP_BASE_URL);

	return Axios.post(process.env.REACT_APP_BASE_URL + '/send', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
}

export default upload
