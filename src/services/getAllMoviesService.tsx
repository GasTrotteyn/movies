import Axios from 'axios'

const getAllMovies = async () => {
	let result = await Axios.get(process.env.REACT_APP_BASE_URL + '/movies').then((res) => {
		return res
	})
}

export default getAllMovies
