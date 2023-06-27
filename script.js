const locationName = document.querySelector('.location');
const temp = document.querySelector('.temp');
const feels = document.querySelector('.feels .bold');
const humidity = document.querySelector('.humidity .bold');
const wind = document.querySelector('.wind .bold');
const cityInput = document.querySelector('#city-input');
const searchForm = document.querySelector('#search-form');
const celciusBtn = document.querySelector('.celcius')
const fahrenheitBtn = document.querySelector('.fahrenheit');
const body = document.querySelector('body');

// 4 step
let unit = 'imperial'; // Fahrenheit

celciusBtn.addEventListener('click', () => {
  unit = 'metric';
  celciusBtn.classList.add('active');
  fahrenheitBtn.classList.remove('active');
})

fahrenheitBtn.addEventListener('click', () => {
  unit = 'imperial';
  fahrenheitBtn.classList.add('active');
  celciusBtn.classList.remove('active');
})

// 1 step
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent default behavior of form
  fetchWeatherData();
  fetchPhotos();
});

// 2 step
const fetchWeatherData = async() => {
  //const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=warsaw&appid=d030ac84773f6c1da5dcb6a7fe964373`);
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${unit}&appid=d030ac84773f6c1da5dcb6a7fe964373`);
  const data = await res.json();
  displayData(data);  
};

// 6 step
const fetchPhotos = async () => {
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${cityInput.value}&client_id=K1z7daCOfTevvq6JyTpQCEB3wXsdfC4N1d4H4WPWtxM`);
  const data = await res.json();
  const imageUrl = data.results[3].urls.full;
  renderBackground(imageUrl);
}

// 7 step
 const renderBackground = (url) => {
  body.style.backgroundImage = `url(${url})`;
 }

// 3, 5 step
const displayData = (data) => {
  let tempVal = unit === 'imperial' ? 'F' : 'C';
  let windSpeed = unit === 'imperial' ? 'miles/hr' : 'km/hr';
  locationName.innerText = data.name;
  wind.innerText = `${data.wind.speed} ${windSpeed}`
  temp.innerText = `${Math.round(data.main.temp)}° ${tempVal}`;
  feels.innerText = `${data.main.feels_like.toFixed()}°`;
  humidity.innerText = `${data.main.humidity}%`;
  //unit = 'metric' ? wind.innerText = `${data.wind.speed} km/hr` : wind.innerText = `${data.wind.speed} miles/hr`;
  //unit = 'metric' ? temp.innerText = `${Math.round(data.main.temp)}° C` : temp.innerText = `${Math.round(data.main.temp)}° F`;  
}

