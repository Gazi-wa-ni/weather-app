const weatherDisplay = document.querySelector('.weather')
const weatherForm = document.querySelector('#weather-form')
const cityInput = document.querySelector('#city-input')

// Fetch weather data from API
const fetchWeather = async (city) => {
  const url = `/api?q=${city}`

  const res = await fetch(url)
  const data = await res.json()

  if (data.cod === '404') {
    alert('City not found')
    return
  }

  if (data.cod === 401) {
    alert('Invalid API Key')
    return
  }

  const displayData = {
    city: data.name,
    temp: kelvinToFahrenheit(data.main.temp),
  }

  addWeatherToDOM(displayData)
}

// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;F</h2>
  `
  cityInput.value = ''
}

// Convert Kelvin to Fahrenheit
const kelvinToFahrenheit = (temp) => {
  return Math.ceil(((temp - 273.15) * 9) / 5 + 32)
}

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (cityInput.value === '') {
    alert('Please enter a city')
  } else {
    fetchWeather(cityInput.value)
  }
})



document.getElementById("getWeatherByloc").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("turn on your location")
  } else {
    let done = false;
    if (!done) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError)
      done = true
    }
  }
})

const onSuccess = async (position) => {
  const url = `/api/getWatherBYlocation?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
  const res = await fetch(url)
  const data = await res.json()
  if (data.cod === '404') {
    alert('City not found')
    return
  }

  if (data.cod === 401) {
    alert('Invalid API Key')
    return
  }

  const displayData = {
    city: data.name,
    temp: kelvinToFahrenheit(data.main.temp),
  }

  addWeatherToDOM(displayData)
}

const onError = (error) => {
  weatherDisplay.innerHTML = error.msg
}

// Initial fetch
// fetchWeather('Pulwama')