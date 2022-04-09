import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import UploadSection from './components/UploadSection'
import SearchSection from './components/SearchSection'
import ListSection from './components/ListSection'

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/list' element={<ListSection />} />
					<Route path='/search' element={<SearchSection />} />
					<Route path='/' element={<UploadSection />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
