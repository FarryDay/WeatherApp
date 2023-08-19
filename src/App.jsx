import { message } from '@tauri-apps/api/dialog'
import { getClient } from '@tauri-apps/api/http'
import { appWindow } from '@tauri-apps/api/window'
import { useState } from 'react'
import './App.css'
import closeIcon from './assets/close.svg'
const client = await getClient()

function App() {
	const API_KEY = 'API_KEY'
	const [weatherMsg, setWeatherMsg] = useState('')
	const [weather, setWeather] = useState({
		current: {
			temp_c: '',
			feelslike_c: '',
			cloud: '',
			humidity: '',
		},
	})
	const [state, setState] = useState({
		weatherCard: 'none',
	})
	const [requestData, setRequestData] = useState('')

	async function getWeather() {
		if (!requestData) {
			message('Вы не ввели город!', { title: 'Погода', type: 'error' })
		}
		const { data } = await client.get(
			`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${requestData}&aqi=yes`
		)

		setWeather({
			current: {
				temp_c: data.current.temp_c,
				feelslike_c: data.current.feelslike_c,
				cloud: data.current.cloud,
				humidity: data.current.humidity,
			},
		})

		setState({ ...weather, weatherCard: 'flex' })
		console.log(response)

		setWeatherMsg('Температура: ' + data.current.temp_c + '°С')
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
				<button className='sumbit-btn' type='submit'>
					Узнать
				</button>
			</form>

			<div
				className='card'
				style={{ display: state.weatherCard, justifyContent: 'space-around' }}
			>
				<div>
					<p>Температура: {weather.current.temp_c}°С</p>
					<p>Ощущается как: {weather.current.feelslike_c}°С</p>
				</div>
				<div>
					<p>Облачность: {weather.current.cloud}%</p>
					<p>Влажность: {weather.current.humidity}%</p>
					<p></p>
				</div>
			</div>
			<p>{weatherMsg}</p>
		</div>
	)
}

export default App
