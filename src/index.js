import './styles/main.scss';

var weather = {
  apiKey: '',
  fetchWeather(city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return this.displayWeather(data);
      });
  },
  displayWeather(data) {
    const name = data.name;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const wind = data.wind.speed;
    document.querySelector('#weather-heading').innerText = 'Weather in ' + name;
    document.querySelector('#weather-input').setAttribute('placeholder', name);
    document.querySelector('#weather-degree').innerText =
      Math.round(temp) + '°C';
    document.querySelector('#weather-icon').src =
      'http://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('#weather-description').innerText = description;
    document.querySelector('#humidity-description').innerText = humidity + ' %';
    document.querySelector('#wind-description').innerText =
      (3.6 * wind).toFixed(2) + ' km/h';
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name.toLowerCase() + "')";
    document.querySelector('#weather-card').classList.remove('loading');
  },
  search: function search() {
    this.fetchWeather(document.querySelector('#weather-input').value);
  },
};
var cities = [
  'berlin',
  'tokyo',
  'barcelona',
  'amsterdam',
  'london',
  'vienna',
  'kyoto',
  'osaka',
];
weather.fetchWeather(cities[Math.floor(Math.random() * cities.length)]);

// ========================= EVENT LISTENER =========================
document
  .querySelector('#weather-input')
  .addEventListener('keyup', function (e) {
    if (e.key == 'Enter') weather.search();
  });
