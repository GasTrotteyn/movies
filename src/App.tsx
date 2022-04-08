import './App.css'
import UploadSection from './components/UploadSection'
import SearchSection from './components/SearchSection'
import ListSection from './components/ListSection'

function App() {
	return (
		<div className='App'>
			<section className='main'>
				<div className='container center-elements d-flex align-items-center justify-content-center'>
					<UploadSection
					// //setFileName={setFileName}
					// //setCurrentStep={setCurrentStep}
					// currentStep={1}
					// nextHtmlId={'validation'}
					/>
					<SearchSection></SearchSection>
					<ListSection></ListSection>
				</div>
			</section>
		</div>
	)
}

export default App
