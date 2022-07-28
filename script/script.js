const API = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = '&appid=612298e14122b1b6cf6c6560dfd2348b'

const form = document.querySelector('.search_city')
const input = document.querySelector("#inp")
const output = document.querySelector('.output')
const text_content = document.getElementById('text_content')

const getWeather = async () => {
    const url = API + input.value + key
    const request = await fetch(url)
    const response = await request.json()
    renderWeather(response);
    searchMap(response.coord)

    input.value = ''
}

const renderWeather = (data) => {
    output.innerHTML = ''
    text_content.innerHTML = ''
    console.log(data);
    const card = document.createElement('div')
    card.classList.add('card')
    const titleWeather = document.createElement('h1')
    titleWeather.textContent = "City: " + data.name
    const temp = document.createElement('h2')
    temp.textContent = 'Temp: ' + Math.floor(data.main.temp - 273.15) + ' C'
    const temp2 = document.createElement('h2')
    temp2.textContent = "Temp2: " + (Math.floor(data.main.temp - 273.15) * 9 / 5 + 32) + " F"
    const wind = document.createElement('h2')
    wind.textContent = "Gust: " + `${data.wind.gust} ` + " Wint speed " + `${data.wind.speed}`
    const weather = document.createElement('h2')
    weather.textContent = "Weather: " + data.weather[0].main
    const coord = document.createElement("h2")
    coord.textContent = "Coord: " + " Lat: " + data.coord.lat + " Lon: " + data.coord.lon
    const country = document.createElement('h2')
    country.textContent = "Country: " + data.sys.country
    text_content.append(card, titleWeather, temp, temp2, weather, coord, country, wind)
    output.append(text_content)
}
form.addEventListener('submit', (event) => {
    event.preventDefault()
    getWeather()
})

const searchMap = (coord) => {
    let map = document.createElement('div')
    map.id = "map";
    DG.then(function () {
        map = DG.map('map', {
            center: [coord.lat, coord.lon],
            zoom: 13
        });

        DG.marker([coord.lat, coord.lon]).addTo(map);
    });

    output.append(map)
}
