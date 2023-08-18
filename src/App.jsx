import { message } from '@tauri-apps/api/dialog'
import { getClient } from '@tauri-apps/api/http'
import { appWindow } from '@tauri-apps/api/window'
import { useState } from 'react'
import './App.css'
import closeIcon from './assets/close.svg'
const client = await getClient()

function App() {
	const API_KEY = '04368d9cb769412b85f181507232104'
	const [weatherMsg, setWeatherMsg] = useState('')
	const [requestData, setRequestData] = useState('')

	async function getWeather() {
		if (!requestData) {
			message('Вы не ввели город!', { title: 'Погода', type: 'error' })
		}
		const response = await client.get(
			`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${requestData}&aqi=yes`
		)

		setWeatherMsg('Температура: ' + response.data.current.temp_c + '°С')
	}

	return (
		<div className='container' data-tauri-drag-region>
			<button className='close-btn' onClick={() => appWindow.close()}>
				<img src={closeIcon} alt='close' />
			</button>
			<h1 data-tauri-drag-region>Погода</h1>

			<form
				data-tauri-drag-region
				className='row'
				onSubmit={e => {
					e.preventDefault()
					getWeather()
				}}
			>
				<input
					id='weather-input'
					onChange={e => setRequestData(e.currentTarget.value)}
					placeholder='Введите город...'
				/>
				<button type='submit'>Узнать</button>
			</form>

			<p>{weatherMsg}</p>
		</div>
	)
}

export default App
