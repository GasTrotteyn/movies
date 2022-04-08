import Axios from 'axios'

const fileCombineService = (name: string) => {
	return Axios.post(process.env.REACT_APP_BASE_URL + '/combine', { name })
}

export default fileCombineService
